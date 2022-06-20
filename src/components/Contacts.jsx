import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Notification } from './Staricon';
import guardService from '../services/guards';
import userService from '../services/users';

export default function Contacts({ contacts, changeChat }) {
    const [currentName, setCurrentName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)
    const loggeGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guard = JSON.parse(loggeGuardJSON)

    useEffect(() => {
        if(usuario){
            userService
            .getFavUser(usuario.id)
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
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

  return (
        <Container>
          <div className="brand">
            <img src='https://babyguard.vercel.app/img/Logo.png' alt="logo" />
            <h3>Babyguard</h3>
          </div>
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
          <div className="current-user">
            <div className="avatar">
              <img
                src={`https://damp-temple-29994.herokuapp.com/api/img/public/${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="name">
              <h2>{currentName}</h2>
            </div>
          </div>
        </Container>
    )
}
    

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: rgb(23 99 96);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: rgb(56 179 195);
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .name {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: rgb(121 191 200);
    }
  }
  .current-user {
    background-color: rgb(13 135 131);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .name {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 300px) and (max-width: 720px) {
      gap: 0.5rem;
      .name {
        h2 {
          font-size: 1rem;
        }
      }
    }
    
  }
`;