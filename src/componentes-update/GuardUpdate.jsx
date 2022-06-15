import React, { useState, useEffect } from 'react'
import guardService from '../services/guards'
import { useNavigate,  Link } from "react-router-dom";

export default function GuardsRegister ({handleSubmit, ...props}) {
    const [errorMessage, setErrorMessage] = useState(null)
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [DNI, setDni] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [horariofin, setHorariofin] = useState('')
    const [horarioinicio, setHorarioinicio] = useState('')
    const [password, setPassword] = useState('')
    const [guard, setGuard] = useState(null)
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


    const handleNameChange = ({target}) => setName(target.value)
    const handleSurnamesChange = ({target}) => setSurnames(target.value)
    const handleDniChange = ({target}) => setDni(target.value)
    const handlePhoneChange = ({target}) => setPhone(target.value)
    const handleEmailChange = ({target}) => setEmail(target.value)
    const handleHorarioinicioChange = ({target}) => setHorarioinicio(target.value)
    const handleHorariofinChange = ({target}) => setHorariofin(target.value)
    const handlePasswordChange = ({target}) => setPassword(target.value)

    
    const handleRegister = async (event) => {
        event.preventDefault()

        try {
            
            
            const guard = await guardService.register({
                name,
                surnames,
                DNI,
                email,
                phone,
                dias,
                horarioinicio,
                horariofin,
                password
            })
            console.log(guard)
            
            
            setGuard(guard)
            setEmail('')
            setPassword('')
            setLoggedIn(true)
            const logedguard = await guardService.login({
                email,
                password
              })
              console.log(logedguard)
              window.localStorage.setItem(
                'loggedNoteAppGuard', JSON.stringify(logedguard)
              )
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
                    <h2>Registrarse como cuidador</h2>
                </header>
                <form action="" className='login' onSubmit={handleRegister}>
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
                        <input className="col-10" type="text" name="dni" value={ DNI} placeholder="Introduzca su DNI" pattern="[0-9]{8}[A-Za-z]{1}" title="Debe poner 8 números y una letra"  onChange={ handleDniChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="phone" className='col-10'>Télefono</label>
                        <input className="col-10" type="number" name="phone" value={ phone} placeholder="Introduzca su teléfono" pattern="[0-9]{9}" title="Debe introducir su teléfono"  onChange={ handlePhoneChange} />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="email" className='col-10'>Correo electrónico</label>
                        <input className="col-10" type="email" name="email" value={ email} placeholder="Introduzca su correo electrónico" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  onChange={ handleEmailChange} />
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
                                        value={id}
                                        checked={dias[index]}
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
                        <input className="col-10" type="time" name="horarioinicio" value={ horarioinicio}  onChange={ handleHorarioinicioChange} />
                        <label htmlFor="timestamp" className='col-10'>Horario de fin</label>
                        <input className="col-10" type="time" name="horariofin" value={ horariofin}  min={horarioinicio}  onChange={ handleHorariofinChange} />
                    </fieldset>


                    <fieldset className='col-12'>
                        <label htmlFor="Password" className='col-10'>Contraseña</label>
                        <input className="col-10" type="password" value={ password} name="Password" placeholder="Introduzca contraseña de al menos 8 caracteres" pattern=".{8,}" title="Debe usar 8 o más caracteres" onChange={ handlePasswordChange} />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="PasswordConfirm" className='col-10'>Confirmación de la contraseña</label>
                        <input className="col-10" type="password" placeholder="Repita la contraseña" name="PasswordConfirm"  />
                    </fieldset>
                    <fieldset className='col-12'>
                        <label htmlFor="enviar" className='col-10'>Iniciar Sesion</label>
                        <button className="col-2 col-10" type="submit" name="enviar" value="Registrarse" id='form-register-button'> Iniciar Sesion</button>
                    </fieldset>
                </form>
                <div >
                    <Link to="/guardlogin">
                        ¿Ya tienes una cuenta?
                    </Link>
                </div>
            </section>
        
        </section>
        
  )
}
