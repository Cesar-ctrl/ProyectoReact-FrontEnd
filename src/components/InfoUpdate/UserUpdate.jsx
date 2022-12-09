import React, { useState, useEffect } from 'react';
import { useNavigate,  Link, useLocation } from "react-router-dom";
import userService from '../../services/users';
import imageService from '../../services/images';


export default function UserUpdate ({handleSubmit, ...props}) {
    const location = useLocation();
    const state = location.state;
    const [nombre, setName] = useState('')
    const [apellidos, setSurnames] = useState('')
    const [telef, setPhone] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [user, setUser] = useState(null)
    const [info, setInfo] = useState(null)
    const [error, setError] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [errortext, setErrortext] = useState('')
    const navigate = useNavigate();

    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggedUserJSON)

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
            setError(true)
            
            setTimeout(() => {
                setErrorName('Error Update')
                setErrortext('Datos introducidos invalidos')
            }, 2000)
            setTimeout(() => {
                setErrorName('')
                setErrortext('')
                setError(false)
            }, 6000)
        }
        
    }
    const errorMsg = 
      <div className='errorMsg'>
          <h2 className='errorName'>{errorName}</h2>
          <p className='errortext'>{errortext}</p>
      </div>

if(info){
  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body background2'>
                <header>
                    <Link to="/home/perfil" state={state} className='flexea atras negro'>
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" className='reloj pequenio'/>
                        
                    </Link>
                    <h2>Información Personal</h2>
                </header>           
                <form action="" className='login' onSubmit={handleUpdate} encType="multipart/form-data" style={error?{ marginBottom: '0vh'}:{marginBottom: '14vh'}}>
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
                        <label htmlFor="imagen" className='col-10'>Foto actual</label>
                        <img src={"https://babyguard.onrender.com/api/img/public/"+info.imgUrl} alt="" name="image" className='reloj grande' />
                        <label htmlFor="file" className='col-10'>Foto de perfil (Es recomendable)</label>
                        <input className="col-10" type="file" accept="image/png, image/gif, image/jpeg" name="file" placeholder="¿Quiere subir una imagen?" onChange={(e) => setSelectedFile(e.target.files[0])}  />
                    </fieldset>
                    <fieldset className='col-12'>
                        <button className="boton-azul blanco" type="submit" name="enviar" value="Registrarse" id='form-register-button'>Guardar Información</button>
                    </fieldset>
                </form>
                {
                    error?errorMsg:null
                } 
            </section>
        </section>
        
  )}
  else{
    console.log('esperando')
  }
}


