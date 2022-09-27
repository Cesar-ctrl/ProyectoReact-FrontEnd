import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import guardService from '../../services/guards';
import userService from '../../services/users';
import ChatContainer from './ChatContainer';
import Contacts from './Contacts';
import BotonRegistro from '../utils/BotonRegistro';
import Welcome from './WelcomeChat';

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
  const usuario = JSON.parse(loggeUserJSON)
  const loggeGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
  const guard = JSON.parse(loggeGuardJSON)
  
  useEffect(() => { //Comprobamos si el que está logeado es un usuario o una niñera
    if (!(localStorage.getItem("loggedNoteAppUser") || localStorage.getItem("loggedNoteAppGuard"))) {
      navigate("/login");
    } else {
      if(localStorage.getItem("loggedNoteAppUser")){
        setCurrentUser(
           JSON.parse(
            localStorage.getItem("loggedNoteAppUser")
          )
        );
      }else{
        setCurrentUser(
           JSON.parse(
            localStorage.getItem("loggedNoteAppGuard")
          )
        );
      }
      
    }
  }, []);
  useEffect(() => { //utilizamos socket para que los mensajes se envien y reciban de forma dinamica sin tener que recargar la página
    if (currentUser) {
      // cambiar a https://damp-temple-29994.herokuapp.com Si se quiere probar en local 
      // Y en el servidor tambén pondré un comentario de que cambiar para que funcione en local 
      socket.current = io('http://localhost:3001');
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (localStorage.getItem("loggedNoteAppGuard")) {
          guardService  //si es una niñera trae los contactos de la niñera
            .getChatGuard(currentUser.id)
            .then(initialGuards => {
                setContacts(initialGuards.chats)
            })
      } else {
          userService // y si es un usuario pues trae los contactos activos del usuario
            .getChatUser(currentUser.id)
            .then(initialGuards => {
                setContacts(initialGuards.chats)
            })
      }
    }
  }, [currentUser]);
  //control de evento para cembiar de chat y se vean los nuevos mensajes
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      {usuario?
      <section className='home chat'>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {//Al entrar en el chat no estará abierto ninguna conversación así que mostrará una página de bienvenida
          currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </section>
      :guard?
        <section className='home chat'>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </section>
      :<BotonRegistro />
      
      }
    </>
  );
}