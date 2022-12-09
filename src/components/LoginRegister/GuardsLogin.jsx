import React, { useState } from 'react';
import {  Link, useNavigate } from "react-router-dom";
import Notification from '../utils/Notification';
import guardService from '../../services/guards';

export default function LoginF () {
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [LoggedIn, setLoggedIn] = useState(null)
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
          window.localStorage.setItem(
            'loggedNoteAppGuard', JSON.stringify(user)
          )
    
          
          guardService.setToken(user.token)

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
    
        <section className=' pop absolute'>
            <header>
            </header>
            <section className='body background2 formlogin'>
                <header>
                    <Link to="/"  className='flexea atras negro'>
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" className='reloj maspequenio'/>
                        
                    </Link>
                    <h2>Inicio sesión de cuidador</h2>
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
                        <button className="boton-azul blanco" type="submit" name="enviar" value="Iniciar sesión" id='form-login-button'> Iniciar Sesion</button>
                    </fieldset>
                    <div className='col-10'>
                        <a href="">¿Has olvidado tu contraseña?</a>
                        <Link to="/register">
                            ¿Aún no tienes cuenta?
                        </Link>
                    </div>
                </form>
                
            </section>
            
        
        </section>
  )
}


