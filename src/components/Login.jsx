import React from 'react'
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import {useState} from 'react';
const Login = () => {
  return (
        <section className='loginpop'>
            <header>
                <Link to="/" >
                    Inicio Sesión
                </Link>
                <p>Flecha Atrás</p><h1 className='atras'>Iniciar sesión</h1>
            </header>
            <section className='body'>
                <header>
                    <h2>Iniciar sesión en BabyGuard</h2>
                </header>
                <form action="" className='login'>
                    <fieldset className='col-12'>
                        <label htmlFor="email" className='col-10'>Email</label>
                        <input className="col-10" type="text" name="email" id="" />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="password" className='col-10'>Contraseña</label>
                        <input className="col-10" type="text" name="password" id="" />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="enviar" className='col-10'>Contraseña</label>
                        <input className="col-2 col-10" type="submit" name="enviar" value="Iniciar sesión" />
                    </fieldset>
                </form>
                <div className='flexea column'>
                    <a href="">¿Has olvidado tu contraseña?</a>
                    <a href="">¿Aún no tienes cuenta?</a>
                </div>
            </section>
        
        </section>
  )
}

export default Login