import React, { useState } from 'react';
import { useNavigate,  Link } from "react-router-dom";
import loginService from '../../services/login';
import registerService from '../../services/register';

export default function RegisterF ({handleSubmit, ...props}) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [DNI, setDni] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(null)
    const [error, setError] = useState(true)
    const navigate = useNavigate();

    const handleNameChange = ({target}) => setName(target.value)
    const handleSurnamesChange = ({target}) => setSurnames(target.value)
    const handleDniChange = ({target}) => setDni(target.value)
    const handlePhoneChange = ({target}) => setPhone(target.value)
    const handleEmailChange = ({target}) => setEmail(target.value)
    const handlePasswordChange = ({target}) => setPassword(target.value)

    
    const handleRegister = async (event) => {
        event.preventDefault()
        var pass1 = document.getElementById('pass1');
        var pass2 = document.getElementById('pass2');
        if (pass1.value == pass2.value) {
            console.log(pass1.value)
            console.log(pass2.value)
            try {
                const user = await registerService.register({
                    name,
                    surnames,
                    DNI,
                    phone,
                    email,
                    password
                })
                const userlogin = await loginService.login({
                    email,
                    password
                })
                window.localStorage.setItem(
                    'loggedNoteAppUser', JSON.stringify(userlogin)
                )
    
              setUser(user)         
              setEmail('')
              setPassword('')
              setLoggedIn(true)
              navigate("/home/buscar", { replace: true });
            } catch(e) {
              setErrorMessage('Wrong credentials')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
        }else{
            setError(true)
            document.getElementById("error").style='color:red'
            var contrasenias = document.querySelectorAll('input[type="password"]')
            for (let index = 0; index < contrasenias.length; index++) {
                contrasenias[index].style='border: 2px solid red;';
            }
        }
        
    
      }

  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body background2'>
                <header>
                
                    <Link to="/" className='flexea atras negro'>
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" className='reloj maspequenio'/>
                        
                    </Link>
                    <h2>Registrarse en BabyGuard</h2>
                </header>           
                <form action="" className='login flexea' onSubmit={handleRegister}>
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label>
                        <input className="col-10" type="text" name="name" value={ name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleNameChange} required />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" value={ surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleSurnamesChange} required />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="dni" className='col-10'>DNI</label>
                        <input className="col-10" type="text" name="dni" value={ DNI} placeholder="Introduzca su DNI" pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra"  onChange={ handleDniChange} required />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="phone" className='col-10'>Télefono</label>
                        <input className="col-10" type="number" name="phone" value={ phone} placeholder="Introduzca su teléfono" pattern="[0-9]{9}" title="Debe introducir su teléfono"  onChange={ handlePhoneChange} required />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="email" className='col-10'>Correo electrónico</label>
                        <input className="col-10" type="email" name="email" value={ email} placeholder="Introduzca su correo electrónico" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  onChange={ handleEmailChange} required />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="Password" className='col-10'>Contraseña</label>
                        <input id='pass1' className="col-10" type="password" value={ password} name="Password" placeholder="Introduzca contraseña de al menos 8 caracteres" pattern=".{8,}" title="Debe usar 8 o más caracteres" onChange={ handlePasswordChange}  required/>
                    </fieldset>
                    {
                        error?
                        <p id="error">Las contraseñas no coinciden</p>: null
                    }
                    <fieldset className='col-12'>
                        <label htmlFor="PasswordConfirm" className='col-10'>Confirmación de la contraseña</label>
                        <input id='pass2' className="col-10" type="password" placeholder="Repita la contraseña" name="PasswordConfirm"  required />
                    </fieldset>
                    
                    <fieldset className='col-12'>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Registrarse" id='form-register-button'>Registrarse</button>
                    </fieldset>
                    <div className='col-10'>
                        <Link to="/login">
                            ¿Ya tienes una cuenta?
                        </Link>
                        <Link to="/guardregister">
                            ¿Registrarse como cuidador?
                        </Link>
                    </div>
                </form>
            </section>
        
        </section>
        
  )
}


