import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import imageService from '../services/images'
import { useNavigate,  Link } from "react-router-dom";

export default function UserUpdate ({handleSubmit, ...props}) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [nombre, setName] = useState('')
    const [apellidos, setSurnames] = useState('')
    const [telef, setPhone] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState(null)
    const [info, setInfo] = useState(null)
    const navigate = useNavigate();

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggUserJSON)

    useEffect(() => {
        userService.setToken(usuario.token)
        userService.getUser(usuario.id)
            .then(initialGuards => {
                setInfo(initialGuards)
            })
     
    }, [])
    
    const handleUpdate = async (event) => {
        event.preventDefault()

        try {
            var name = nombre? nombre: info.name
            var surnames = apellidos? apellidos: info.surnames
            var phone = telef? telef: info.phone
            var file = selectedFile? selectedFile: info.imgUrl
            if(selectedFile !== null){
                imageService.setToken(usuario.token)
                const imgUrl = await imageService.subeImg(usuario.id, {
                    file
                }) 
                await userService.setToken(usuario.token)
                console.log(imgUrl)
                const user = await userService.updateUser(usuario.id, {
                    name,
                    surnames,
                    phone,
                    imgUrl
                })
                
            }else{
                userService.setToken(usuario.token)
                const user = await userService.updateUser(usuario.id, {
                    name,
                    surnames,
                    phone
                })
            }
          setUser(user)
          navigate("/home/buscar", { replace: true });
        } catch(e) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
        
      }

if(info){
  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body'>
                <header>
                    <Link to="/home/perfil" >
                        <img src="http://localhost:3000/img/back-arrow.svg" alt="" className='reloj pequenio'/>
                    </Link>
                    <h2>Información Personal</h2>
                </header>           
                <form action="" className='login' onSubmit={handleUpdate} encType="multipart/form-data">
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label> 
                        <input className="col-10" type="text" name="name" defaultValue={info.name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setName(e.target.value)} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" defaultValue={ info.surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setSurnames(e.target.value)} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="phone" className='col-10'>Télefono</label>
                        <input className="col-10" type="number" name="phone" defaultValue={ info.phone} placeholder="Introduzca su teléfono" pattern="[0-9]{9}" title="Debe introducir su teléfono"  onChange={ e=> setPhone(e.target.value)} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="file" className='col-10'>Foto de perfil (No es obligatorio)</label>
                        <input className="col-10" type="file" name="file" placeholder="¿Quiere subir una imagen?" onChange={(e) => setSelectedFile(e.target.files[0])}  />
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
        
  )}
  else{
    console.log('esperando')
  }
}


