import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import messageService from '../services/messages'
import { Link } from "react-router-dom";

export default function ChatContainer({ currentChat, socket }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)
    const loggeGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guard = JSON.parse(loggeGuardJSON)

    useEffect(() => {
        if(usuario){
            const response = messageService.recieveMessageRoute({
                from: usuario.id,
                to: currentChat.id,
            })
            response.then(chats => {
                setMessages(chats);
            })
            
        }else{
            messageService
                .recieveMessageRoute({
                    from: guard.id,
                    to: currentChat.id,
                })
                .then(chats => {
                    setMessages(chats);
                })
        }
        
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (usuario) {
        await JSON.parse(
          localStorage.getItem('loggedNoteAppUser')
        ).id;
      }else{
        await JSON.parse(
            localStorage.getItem('loggedNoteAppGuard')
          ).id;
      }
    };
    if (usuario) {
        getCurrentChat();
    }else{
        getCurrentChat();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    if(usuario){
        socket.current.emit("send-msg", {
        to: currentChat.id,
        from: usuario.id,
        msg,
        });
        const sendmessage = await messageService.sendMessageRoute({
            from: usuario.id,
            to: currentChat.id,
            message: msg,
        })

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    }else{
        socket.current.emit("send-msg", {
            to: currentChat.id,
            from: guard.id,
            msg,
            });
            const sendmessage = await messageService.sendMessageRoute({
                from: guard.id,
                to: currentChat.id,
                message: msg,
            })
    
            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  var userid = currentChat
  console.log(userid)
  return (
    <Container>
      <div className="chat-header">
        <Link to={"/home/buscar/user/"+currentChat.id} params={{ userid:userid }}>
          <div className="user-details">
            <div className="avatar">
              <img
                src={`https://damp-temple-29994.herokuapp.com/api/img/public/${currentChat.imgUrl}`} alt=""/>
            </div>
            <div className="username">
              <h3>{currentChat.name}</h3>
            </div>
          </div>
        </Link>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 100%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: rgb(26 78 159);
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: rgb(26 159 115);
      }
    }
  }
`;