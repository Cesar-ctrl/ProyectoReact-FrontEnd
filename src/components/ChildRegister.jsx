import React, { useState, useEffect } from 'react'
import childService from '../services/childs'
import { useNavigate,  Link } from "react-router-dom";

export default function RegisterF ({handleSubmit, ...props}) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [edad, setEdad] = useState(0)
    const [dni, setDni] = useState('')
    const [necesidadesesp, setNecesidadesesp] = useState('')
    const [child, setChild] = useState(null)
    const navigate = useNavigate();

    const handleNameChange = ({target}) => setName(target.value)
    const handleSurnamesChange = ({target}) => setSurnames(target.value)
    const handleDniChange = ({target}) => setDni(target.value)
    const handleEdadChange = ({target}) => setEdad(target.valueAsNumber)
    const handleNecesidadesespChange = ({target}) => setNecesidadesesp(target.value)

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

    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const user = JSON.parse(loggedUserJSON)

    const handleRegisterChild = async (event) => {
        event.preventDefault()
        try {
            console.log(name)
            console.log(surnames)
            console.log(dni)
            console.log(edad)
            console.log(alergenos)
            console.log(necesidadesesp)
            console.log(user.id)
          if(necesidadesesp != ''){
            console.log('pasa por necesidadesespe != "" ')
            const child = await childService.child({
                name,
                surnames,
                edad,
                dni,
                alergenos,
                necesidadesesp,
                user:user.id
              })
          }else{
            console.log(' NO pasa por necesidadesespe != "" ')
            const child = await childService.child({
                name,
                surnames,
                edad,
                dni,
                alergenos,
                user:user.id
                
              })
          }
          
          setChild(child)
          setEdad('')
          setDni('')
          setAlergenos('')
          setNecesidadesesp('')
          navigate("/home/child", { replace: true });
        } catch(e) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    
      }

      const [alergenos, setAlergenos] = useState(
        new Array(listaalergenos.length).fill(false)
      );
      const [total, setTotal] = useState(0);

      const handleOnChange = (position) => {
        const updatedAlergenos = alergenos.map((item, index) =>
          index === position ? !item : item
        );
    
        setAlergenos(updatedAlergenos);
    
      };

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
                    <h2>Dar de alta a tu niño/a</h2>
                </header>
                <form action="" className='login' onSubmit={handleRegisterChild}>
                    <fieldset className='col-12'>
                        <label htmlFor="name" className='col-10'>Nombre</label>
                        <input className="col-10" type="text" name="name" value={ name} placeholder="Introduzca su Nombre"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleNameChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="surnames" className='col-10'>Apellidos</label>
                        <input className="col-10" type="text" name="surnames" value={ surnames} placeholder="Introduzca sus Apellidos"  pattern="[^0-9\x22]+"  title="Solo se aceptan letras"  onChange={ handleSurnamesChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="dni" className='col-10'>DNI</label>
                        <input className="col-10" type="text" name="dni" value={ dni} placeholder="Introduzca su DNI" pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra"  onChange={ handleDniChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="edad" className='col-10'>Edad</label>
                        <input className="col-10" type="number" name="edad" value={ edad} placeholder="Introduzca su edad" pattern="[0-9]{2}" title="Debe introducir su edad 2 cifras"  onChange={ handleEdadChange} />
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
                                        value={id}
                                        checked={alergenos[index]}
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
                        <input className="col-10" type="text" value={ necesidadesesp} name="necesidadesesp" placeholder="Escriba el niño/a tiene alguna necesidad especial" pattern="[^0-9\x22]+" onChange={ handleNecesidadesespChange} />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="enviar" className='col-10'>Dar de alta</label>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Registrarse" id='form-register-button'> Iniciar Sesion</button>
                    </fieldset>
                </form>
                <div >
                    <Link to="/login">
                        ¿Ya tienes una cuenta?
                    </Link>
                </div>
            </section>
        
        </section>
        
  )
}


