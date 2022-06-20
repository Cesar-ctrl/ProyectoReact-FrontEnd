import React, { useState, useEffect } from 'react';
import { useNavigate,  Link } from "react-router-dom";
import guardService from '../../services/guards';
import imageService from '../../services/images';


export default function GuardsUpdate ({handleSubmit, ...props}) {

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const usuario = JSON.parse(loggUserJSON)

    const [errorMessage, setErrorMessage] = useState(null)
    const [nombre, setName] = useState('')
    const [apellidos, setSurnames] = useState('')
    const [telef, setPhone] = useState('')
    const [horariofinal, setHorariofin] = useState('')
    const [horarioinic, setHorarioinicio] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [guard, setGuard] = useState(null)
    const [info, setInfo] = useState(null)
    const [loggedIn, setLoggedIn] = useState(null)
    const navigate = useNavigate();

    const listadias = [
        {
            name:"Lunes",
            simple: "L",
            id:1
        },
        {
            name:"Martes",
            simple: "M",
            id:2
        },
        {
            name:"Miercoles",
            simple: "X",
            id:3
        },
        {
            name:"Jueves",
            simple: "J",
            id:4
        },
        {
            name:"Viernes",
            simple: "V",
            id:5
        },
        {
            name:"Sabado",
            simple: "S",
            id:6
        },
        {
            name:"Domingo",
            simple: "D",
            id:7
        }
    ]
    const [dias, setDias] = useState(
        new Array(listadias.length).fill(false)
      );
    const handleOnChange = (position) => {
        const updatedDias = dias.map((item, index) =>
            index === position ? !item : item
        );
        setDias(updatedDias);
    };
    
    useEffect(() => {
        guardService.setToken(usuario.token)
        guardService.getGuard(usuario.id)
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
            var horarioinicio = horarioinic? horarioinic: info.horarioinicio
            var horariofin = horariofinal? horariofinal: info.horariofin
            var file = selectedFile? selectedFile: info.imgUrl
            if(selectedFile !== null){
                imageService.setToken(usuario.token)
                const imgUrl = await imageService.subeImg(usuario.id, {
                    file
                })
                const guard = await guardService.update(usuario.id, {
                    name,
                    surnames,
                    phone,
                    dias,
                    horarioinicio,
                    horariofin,
                    imgUrl
                })
            }else{
                const guard = await guardService.update(usuario.id, {
                name,
                surnames,
                phone,
                dias,
                horarioinicio,
                horariofin,
            })
            }
            setGuard(guard)
            navigate("/home/buscar", { replace: true });
        } catch(e) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
      useEffect(()=> {
        if(info){
            setDias(info.dias);
        }
      }, info)
if(info){                          
  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body background2'>
                <header>
                <Link to="/home/perfil" className='flexea atras negro'>
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" className='reloj pequenio'/>
                        Atrás
                </Link>
                </header>
                <form action="" className='login' onSubmit={handleUpdate}>
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label>
                        <input className="col-10" type="text" name="name" defaultValue={info.name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setName(e.target.value)} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" defaultValue={info.surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setSurnames(e.target.value)} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="phone" className='col-10'>Télefono</label>
                        <input className="col-10" type="number" name="phone" defaultValue={info.phone} placeholder="Introduzca su teléfono" pattern="[0-9]{9}" title="Debe introducir su teléfono"  onChange={e=> setPhone(e.target.value)} />
                    </fieldset>

                    <fieldset className='col-12'>
                        {listadias.map(({ name, simple, id }, index) => {
                            return (
                                <li key={index}>
                                  <div className="flexea">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        defaultChecked={info.dias[index]}
                                        onChange={() => handleOnChange(index)}
                                      />
                                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                  </div>
                                </li>
                              );
                            })}
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="timestamp" className='col-10'>Horario de comienzo</label>
                        <input className="col-10" type="time" name="horarioinicio" defaultValue={info.horarioinicio}  onChange={ e=> setHorariofin(e.target.value) } />
                        <label htmlFor="timestamp" className='col-10'>Horario de fin</label>
                        <input className="col-10" type="time" name="horariofin" defaultValue={info.horariofin}  onChange={ e=> setHorarioinicio(e.target.value) } />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="imagen" className='col-10'>Foto actual</label>
                        <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+info.imgUrl} alt="" name="image" className='reloj grande'/>
                        <label htmlFor="file" className='col-10'>Foto de perfil (No es obligatorio)</label>
                        <input className="col-10" type="file" name="file" placeholder="¿Quiere subir una imagen?" onChange={(e) => setSelectedFile(e.target.files[0])}  />
                    </fieldset>

                    <fieldset className='col-12'>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Registrarse" id='form-register-button'>Guardar información</button>
                    </fieldset>
                </form>
            </section>
        
        </section>
        
  )}
  else{
    console.log('esperando')
  }

}
