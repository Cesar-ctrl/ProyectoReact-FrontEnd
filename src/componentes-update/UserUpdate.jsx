import React, { useState, useEffect } from 'react'
import registerService from '../services/register'
import { useNavigate,  Link } from "react-router-dom";

export default function RegisterF ({handleSubmit, ...props}) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [phone, setPhone] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const handleNameChange = ({target}) => setName(target.value)
    const handleSurnamesChange = ({target}) => setSurnames(target.value)
    const handleDniChange = ({target}) => setDni(target.value)
    const handlePhoneChange = ({target}) => setPhone(target.value)
    const handleEmailChange = ({target}) => setEmail(target.value)
    const handlePasswordChange = ({target}) => setPassword(target.value)

    
    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            
            if(selectedFile !== null){
                console.log(name)
                console.log(surnames)
                console.log(DNI)
                console.log(phone)
                console.log(email)

                const user = await registerService.register({
                    name,
                    surnames,
                    DNI,
                    phone,
                    email,
                    password,
                    selectedFile
                })
                console.log(user)
                window.localStorage.setItem(
                    'loggedNoteAppUser', JSON.stringify(user)
                )
            }else{
                console.log(name)
                console.log(surnames)
                console.log(DNI)
                console.log(phone)
                console.log(email)
                const user = await registerService.register({
                    name,
                    surnames,
                    DNI,
                    phone,
                    email,
                    password
                })
                console.log(user)
                window.localStorage.setItem(
                    'loggedNoteAppUser', JSON.stringify(user)
                )
            }
            
          
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
    
      }

  return (
        <section className='pop absolute'>
            <header>
                <p>Flecha Atrás</p><h1 className='atras'>Iniciar sesión</h1>
            </header>
            <section className='body'>
                <header>
                    <Link to="/" >
                        Inicio Sesión
                    </Link>
                    <h2>Registrarse en BabyGuard</h2>
                </header>           
                <form action="" className='login' onSubmit={handleRegister}>
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label>
                        <input className="col-10" type="text" name="name" defaultValue={name} value={ name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleNameChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" value={ surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleSurnamesChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="phone" className='col-10'>Télefono</label>
                        <input className="col-10" type="number" name="phone" value={ phone} placeholder="Introduzca su teléfono" pattern="[0-9]{9}" title="Debe introducir su teléfono"  onChange={ handlePhoneChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="imgUrl" className='col-10'>Foto de perfil (No es obligatorio)</label>
                        <input className="col-10" type="file" name="imgUrl" placeholder="¿Quiere subir una imagen?" onChange={(e) => setSelectedFile(e.target.files[0])}  />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="enviar" className='col-10'>Iniciar Sesion</label>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Registrarse" id='form-register-button'> Iniciar Sesion</button>
                    </fieldset>
                </form>
                <div >
                    <Link to="/login">
                        ¿Ya tienes una cuenta?
                    </Link>
                    <Link to="/guardregister">
                        ¿Registrarse como cuidador?
                    </Link>
                </div>
            </section>
        
        </section>
        
  )
}


