import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import ChatInput from "./ChatInput";
import messageService from '../../services/messages';


export default function ChatContainer({ currentChat, socket, changeChatwidth }) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)
    const loggeGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guard = JSON.parse(loggeGuardJSON)
    const location = useLocation();
    const state = location.state;

    //Aquí es donde se van a ver los mensajes, tambien donde va a actuar el socket
    useEffect(() => {
        if(usuario){  // distingue si es un usuario o una niñera para ver que mensajes son recibidos o enviados
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

  useEffect(() => {//Trae los mensajes del chat actual
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

  const handleSendMsg = async (msg) => {  //Llama el socket para recibir los mensajes de manera dinamica
    if(usuario){
        socket.current.emit("send-msg", {
        to: currentChat.id,
        from: usuario.id,
        msg,
        });//Lo mismo para enviarlos
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
  return (
    <section className="chatcontainer">
      <div className="chat-header">
        {
          guard?
          <>
            <div className='foto' onClick={()=>changeChatwidth('contacto')}>
                  <img src="https://babyguard.vercel.app/img/back-arrow.svg" className='fotoestandar' alt="" />
            </div>
            
              <div className="user-header">
                <Link to={"/home/buscar/user/"+currentChat.id} params={{ userid:userid }} state={state} className="user-details">
                  <div className="avatar">
                    <img
                      src={`https://damp-temple-29994.herokuapp.com/api/img/public/${currentChat.imgUrl}`} alt=""/>
                  </div>
                  <div className="username">
                    <h3>{currentChat.name}</h3>
                  </div>
                  <img src="../img/info.svg" className='fotoestandar' alt="" />
                </Link>
              </div>
           
          </>
          :
          <>
            <div className='foto'onClick={()=>changeChatwidth('contacto')}>
                <img src="https://babyguard.vercel.app/img/back-arrow.svg" className='fotoestandar' alt="" />
            </div>
            
              <div className="user-header">
              <Link to={"/home/buscar/guard/"+currentChat.id} className="user-details" state={state}>
                <div className="avatar">
                  <img
                    src={`https://damp-temple-29994.herokuapp.com/api/img/public/${currentChat.imgUrl}`} alt=""/>
                </div>
                <div className="username">
                  <h3>{currentChat.name}</h3>
                </div>
                <img src="../img/info.svg" className='fotoestandar' alt="" />
              </Link>
              </div>
            
          </>
        }
        
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
    </section>
  );
}

