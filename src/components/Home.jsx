import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import Busqueda from './Busqueda';


function Home() {
    return(
        <Router>
            <main className='main background1'>

                <Routes>
                    
                    <Route path="/buscar" element={ <Busqueda />} />
                    <Route path="/favoritos"  />
                    <Route path="/mensajes"  />
                    <Route path="/child"  />
                    <Route path="/perfil"  />
                </Routes>
            </main>
            <footer className="footerhome">
            
                <Link className="nav footer" to="/buscar">
                    <img src="../img/lupa.svg" alt="" className='icono'/>
                    Buscar
                </Link>
                <Link className="nav footer" to="/favoritos" >
                <img src="../img/estrella.svg" alt="" className='icono'/>
                    Favoritos
                </Link>
                <Link className="nav footer" to="/mensajes">
                <img src="../img/mensaje.svg" alt="" className='icono'/>
                    Mensajes
                </Link>
                <Link className="nav footer" to="/child">
                <img src="../img/child.svg" alt="" className='icono'/>
                    Niños
                </Link>
                <Link className="nav footer" to="/perfil">
                <img src="../img/cuenta.svg" alt="" className='icono'/>
                    Perfil
                </Link>
            </footer>
                

        </Router>
        
    );
}

export default Home;