import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import Home from './components/Home';


const Apphome = () => {
    return(
        <div className="container 1234567890">
            <Router>
                <header>
                    <p>Flecha Atrás</p><h1 className='atras'>Iniciar sesión</h1>
                </header>
                    <Link to="/" >
                         Inicio Sesión
                    </Link>
                <Routes>
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </div>
    )
}

export default Apphome;