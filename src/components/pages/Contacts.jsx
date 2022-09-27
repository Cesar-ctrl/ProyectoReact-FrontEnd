import React, { useState, useEffect } from "react";
import guardService from '../../services/guards';
import userService from '../../services/users';

export default function Contacts({ contacts, changeChat }) {
    const [currentName, setCurrentName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)
    const loggeGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guard = JSON.parse(loggeGuardJSON)

    //Comprueba quien está logeado 
    useEffect(() => {
        if(usuario){
            userService
            .getUser(usuario.id)
            .then(initialGuards => {
                setCurrentName(initialGuards.name);
                setCurrentUserImage(initialGuards.imgUrl);
            })
            
        }else{
            guardService
            .getGuard(guard.id)
            .then(initialGuards => {
                setCurrentName(initialGuards.name);
                setCurrentUserImage(initialGuards.imgUrl);
            })
        }
    
    }, []);

    //Cambiar el chat
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

  return (
        <div className="contactos">
          <header className="brand">
            <img src='https://babyguard.vercel.app/img/Logo.png' alt="logo" />
            <h3>Babyguard</h3>
          </header>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact.id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`https://damp-temple-29994.herokuapp.com/api/img/public/${contact.imgUrl}`}
                      alt=""
                    />
                  </div>
                  <div className="name">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <footer className="current-user">
            <div className="avatar">
              <img
                src={`https://damp-temple-29994.herokuapp.com/api/img/public/${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="name">
              <h2>{currentName}</h2>
            </div>
          </footer>
        </div>
    )
}
    