import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import guardService from '../services/guards';
import userService from '../services/users';
import ChatContainer from './ChatContainer';
import Contacts from './Contacts';
import BotonRegistro from './BotonRegistro';
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
  
  useEffect(() => {
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
  useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:3000');
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (localStorage.getItem("loggedNoteAppGuard")) {
          guardService 
            .getChatGuard(currentUser.id)
            .then(initialGuards => {
                setContacts(initialGuards.chats)
            })
      } else {
          userService
            .getChatUser(currentUser.id)
            .then(initialGuards => {
                setContacts(initialGuards.chats)
            })
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      {usuario?
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
      :guard?
        <Container>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </Container>
      :<BotonRegistro />
      
      }
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(19 19 36 / 0%);
  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgb(111 186 164 / 82%);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;