import React, { useState, useEffect } from 'react'
import Togglable from './Togglable.js'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import Notification from '../components2/Notification'

export default function LoginF ({handleSubmit, ...props}) {
    
  return (
    
        <section className='pop'>
            <header>
                <p>Flecha Atrás</p><h1 className='atras'>Iniciar sesión</h1>
            </header>
            <section className='body'>
                <header>
                    <Link to="/" >
                        Inicio Sesión
                    </Link>
                    <h2>Iniciar sesión en BabyGuard</h2>
                </header>
                <span className=''>
                    <Notification  message={props.errorMessage} />
                </span>
                <form action="" className='login' onSubmit={handleSubmit}>
                    <fieldset className='col-12'>
                        <label htmlFor="Email" className='col-10'>Correo electrónico</label>
                        <input className="col-10" type="text" name="Email" value={props.email}  onChange={props.handleEmailChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="Password" className='col-10'>Contraseña</label>
                        <input className="col-10" type="password" value={props.password} name="Password" onChange={props.handlePasswordChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="enviar" className='col-10'>Iniciar Sesion</label>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Iniciar sesión" id='form-login-button'> Iniciar Sesion</button>
                    </fieldset>
                </form>
                <div >
                    <a href="">¿Has olvidado tu contraseña?</a>
                    <Link to="/register">
                        ¿Aún no tienes cuenta?
                    </Link>
                </div>
            </section>
            
        
        </section>
  )
}

LoginF.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    email: PropTypes.string,
  
  }

