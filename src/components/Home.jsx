import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import Busqueda from './Busqueda';
import Favoritos from './Favoritos';
import Chat from './Chat';

function Home() {
    return(
        <div className="container ">
            <main className='main background1'>


            <Routes>
               
                <Route path="/buscar" element={ <Busqueda />} />
                <Route path="/favoritos" element={ <Favoritos /> }  />
                <Route path="/chat" element={ <Chat /> }  />
                <Route path="/child"  />
                <Route path="/perfil"  />
            </Routes>
            </main>
            <footer className="footerhome">
            
                <Link className="nav footer" to="/home/buscar">
                    <img src="../img/lupa.svg" alt="" className='icono'/>
                    Buscar
                </Link>
                <Link className="nav footer" to="/home/favoritos" >
                <img src="../img/estrella.svg" alt="" className='icono'/>
                    Favoritos
                </Link>
                <Link className="nav footer" to="/home/chat">
                <img src="../img/mensaje.svg" alt="" className='icono'/>
                    Chat
                </Link>
                <Link className="nav footer" to="/home/child">
                <img src="../img/child.svg" alt="" className='icono'/>
                    Niños
                </Link>
                <Link className="nav footer" to="/home/perfil">
                <img src="../img/cuenta.svg" alt="" className='icono'/>
                    Perfil
                </Link>
            </footer>
                

        </div>
        
    );
}

export default Home;