import React, { useState } from 'react';
import { useNavigate,  Link } from "react-router-dom";
import childService from '../../services/childs';
import imageService from '../../services/images';


export default function RegisterF ({handleSubmit, ...props}) {
    
    const [Id, setId] = useState("")

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const user = JSON.parse(loggUserJSON)
    
    const [name, setName] = useState('')// (modoEdicion? childs.name:'')
    const [surnames, setSurnames] = useState('')
    const [edad, setEdad] = useState('')
    const [DNI, setDni] = useState('')
    const [necesidadesesp, setNecesidadesesp] = useState('')
    const [file, setImgUrl] = useState(null)
    const navigate = useNavigate();

    const handleDniChange = ({target}) => setDni(target.value)
    const listaalergenos = [
        {
            name:"Gluten",
            id:1
        },
        {
            name:"Crustáceos",
            id:2
        },
        {
            name:"Huevos",
            id:3
        },
        {
            name:"Pescado",
            id:4
        },
        {
            name:"Cacahuetes",
            id:5
        },
        {
            name:"Soja",
            id:6
        },
        {
            name:"Lacteos",
            id:7
        },
        {
            name:"Frutos con cáscara",
            id:8
        },
        {
            name:"Apio",
            id:9
        },
        {
            name:"Mostaza",
            id:10
        },
        {
            name:"Sésamo",
            id:11
        },
        {
            name:"Sulfitos",
            id:12
        },
        {
            name:"Altramuces",
            id:13
        },
        {
            name:"Moluscos",
            id:14
        }
    ]
    const [alergenos, setAlergenos] = useState(
        new Array(listaalergenos.length).fill(false)
      );

      const handleOnChange = (position) => {
        const updatedAlergenos = alergenos.map((item, index) =>
          index === position ? !item : item
        );
    
        setAlergenos(updatedAlergenos);
    
      };
    
    const handleRegisterChild = async (event) => {
        event.preventDefault()
        try {
            const imgUrl = await imageService.subeImg(user.id, {
                file
            })
            console.log(imgUrl)
            const child = await childService.child({
                name,
                surnames,
                edad,
                DNI,
                alergenos,
                necesidadesesp,
                user:user.id,
                imgUrl
                })
            
            setEdad('')
            setDni('')
            setAlergenos('')
            setNecesidadesesp('')
            navigate("/home/child", { replace: true });
        } catch(e) {}
      }


  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body background2'>
                <header>
                    <Link to="/home/child" className='flexea atras negro'>
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" className='reloj maspequenio' />
                        
                    </Link>
                    <h2>Dar de alta a tu niño/a</h2>
                </header>
                
                <form action="" className='login' onSubmit={handleRegisterChild}>
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label>
                        <input className="col-10" type="text" name="name" value={name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setName(e.target.value)} required />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" value={surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ e=> setSurnames(e.target.value)} required />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="dni" className='col-10'>DNI</label>
                        <input className="col-10" type="text" name="dni" value={DNI} placeholder="Introduzca su DNI" pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra"  onChange={ handleDniChange} required />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="edad" className='col-10'>Edad</label>
                        <input className="col-10" type="number" name="edad" value={edad} placeholder="Introduzca su edad" pattern="[0-9]{2}" title="Debe introducir su edad 2 cifras"  onChange={ e=> setEdad(e.target.value)} required />
                    </fieldset>
                    <fieldset className='col-12' id='alergenos'>
                        {listaalergenos.map(({ name, id }, index) => {
                            return (
                                <li key={index}>
                                  <div className="flexea">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={name}
                                        defaultChecked={alergenos[index]}
                                        onChange={() => handleOnChange(index)}
                                      />
                                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                  </div>
                                </li>
                              );
                            })}
                    </fieldset>


                    <fieldset className='col-12'>
                        <label htmlFor="necesidadesesp" className='col-10'>Necesidades Especiales</label>
                        <input className="col-10" type="text" value={ necesidadesesp} name="necesidadesesp" placeholder="Escriba el niño/a tiene alguna necesidad especial" pattern="[^0-9\x22]+" onChange={ e=> setNecesidadesesp(e.target.value)} />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="file" className='col-10'>Foto del niño</label>
                        <input className="col-10" type="file" accept="image/png, image/gif, image/jpeg" name="file" placeholder="¿Quiere subir una imagen?" onChange={(e) => setImgUrl(e.target.files[0])} required  />
                    </fieldset>

                    <fieldset className='col-12 end'>
                        <label htmlFor="enviar" className='col-10'>Dar de alta</label>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Registrarse" id='form-register-button'>Enviar</button>
                    </fieldset>
                </form>
            </section>
        
        </section>
        
  )
}



