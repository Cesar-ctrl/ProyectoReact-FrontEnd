import React, { useState, useEffect } from "react";
import styled from "styled-components";


export default function Welcome() {

    //Página de bienvenida al chat
    const [name, setName] = useState("");
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)
    const loggeGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guard = JSON.parse(loggeGuardJSON)
    const mode = window.localStorage.getItem('newmode')
    const newmode = JSON.parse(mode)

  useEffect( () => {
    if(usuario){
        setName(
            usuario.name
         );
    }else{
        setName(
            guard.name
         );
    }
    
  }, []);
  return (
    <Container>
        {
            newmode?
            <img src="https://babyguard.vercel.app/img/pepe-clown.gif" alt="" />
            :<br />
        }
      
      <h1>
        Welcome, <span>{name}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
