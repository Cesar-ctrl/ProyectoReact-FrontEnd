import React, { useState, useEffect } from 'react'
import {  Link, useNavigate } from "react-router-dom";
import Notification from '../components2/Notification'
import guardService from '../services/guards'
import noteService from '../services/notes'

export default function LoginF ({...props}) {
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loggedIn, setLoggedIn] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const navigate = useNavigate();

    const handleEmailChange = ({target}) => setEmail(target.value)
    const handlePasswordChange = ({target}) => setPassword(target.value)

    
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
          const user = await guardService.login({
            email,
            password
          })
          console.log(user)
          window.localStorage.setItem(
            'loggedNoteAppGuard', JSON.stringify(user)
          )
    
          
          noteService.setToken(user.token)
        
          
          setUser(user)
          setEmail('')
          setPassword('')
          setLoggedIn(true)
          navigate("/home/buscar", { replace: true });
          
        } catch(e) {
          setErrorMessage('Email o contraseña inválidos')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    
      }
      
      
    
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
                    <h2>Iniciar sesión como cuidador</h2>
                </header>
                <span className=''>
                    <Notification  message={errorMessage} />
                </span>
                <form action="" className='login' onSubmit={handleLogin}>
                    <fieldset className='col-12'>
                        <label htmlFor="Email" className='col-10'>Correo electrónico</label>
                        <input className="col-10" type="text" name="Email" value={email}  onChange={handleEmailChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="Password" className='col-10'>Contraseña</label>
                        <input className="col-10" type="password" value={password} name="Password" onChange={handlePasswordChange} />
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

