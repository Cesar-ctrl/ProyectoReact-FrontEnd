import React, { useState, useEffect } from "react";


export default function Welcome({ changeChatwidth }) {

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
    <div className="welcomechat">
        {
            newmode?
            <img src="https://babyguard.vercel.app/img/pepe-clown.gif" alt="" />
            :<br />
        }
      <nav className="topnav">
        <div onClick={()=>changeChatwidth('contacto')}>
          <svg width="30" height="30" id="icoOpen">
              <path d="M0,5 30,5" stroke="#000" strokeWidth="5"/>
              <path d="M0,14 30,14" stroke="#000" strokeWidth="5"/>
              <path d="M0,23 30,23" stroke="#000" strokeWidth="5"/>
          </svg>
        </div>
      </nav>
      <h1>
        Bienvenido, <span>{name}!</span>
      </h1>
      <h3>Picha en la hamburguesa y selecciona un contacto.</h3>
    </div>
  );
}

