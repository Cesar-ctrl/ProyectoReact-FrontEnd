import React, { useState } from 'react'
import { useNavigate,  Link } from "react-router-dom";
import guardService from '../../services/guards'

export default function GuardsRegister ({handleSubmit, ...props}) {
    const [setErrorMessage] = useState(null)
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [DNI, setDni] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [horariofin, setHorariofin] = useState('')
    const [horarioinicio, setHorarioinicio] = useState('')
    const [password, setPassword] = useState('')
    const [cp, setCp]= useState('')
    const [guard, setGuard] = useState(null)
    const [loggedin, setLoggedIn] = useState(null)
    const [errorp, setErrorp] = useState(false)
    const [error, setError] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [errortext, setErrortext] = useState('')
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
    const handleCpChange = ({target}) => setCp(target.value)
    
    const handleRegister = async (event) => {
        event.preventDefault()
        var pass1 = document.getElementById('pass1');
        var pass2 = document.getElementById('pass2');
        if (pass1.value == pass2.value) {
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
                    password,
                    cp
                })
                
                
                setGuard(guard)
                const logedguard = await guardService.login({
                    email,
                    password
                })
                window.localStorage.setItem(
                    'loggedNoteAppGuard', JSON.stringify(logedguard)
                )
                setLoggedIn(true)
                navigate("/home/buscar", { replace: true });
            } catch(e) {
                setError(true)
            
                setTimeout(() => {
                    setErrorName('Error Register')
                    setErrortext('Datos introducidos invalidos')
                }, 2000)
                setTimeout(() => {
                    setErrorName('')
                    setErrortext('')
                    setError(false)
                }, 6000)
            }
        }else{
            setError(true)
            
            setTimeout(() => {
                setErrorName('Error Register')
                setErrortext('Datos introducidos invalidos')
            }, 2000)
            setTimeout(() => {
                setErrorName('')
                setErrortext('')
                setError(false)
            }, 6000)

            setErrorp(true)
            var contrasenias = document.querySelectorAll('input[type="password"]')
            for (let index = 0; index < contrasenias.length; index++) {
                contrasenias[index].style='border: 2px solid red;';
            }
        }
    
    }

    const errorMsg = 
      <div className='errorMsg'>
          <h2 className='errorName'>{errorName}</h2>
          <p className='errortext'>{errortext}</p>
      </div>
    const errorparagraph = 
      <div className='error'>
          <p className='errortext' style={{ color: "red" }}>Las contraseñas no coinciden</p>
      </div>

  return (
        <section className='pop absolute'>
            <header>
            </header>
            <section className='body background2'>
                <header>
                    <Link to="/" className='flexea atras negro' >
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" />
                        
                    </Link>
                    <h2>Registro de cuidadores</h2>
                </header>
                <form action="" className='login flexea' onSubmit={handleRegister} style={error?{'margin-bottom': '0vh'}:{'margin-bottom': '14vh'}}>
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
                        <label htmlFor="horarioinicio" className='col-10'>Horario de comienzo</label>
                        <input className="col-10" type="time" name="horarioinicio" value={ horarioinicio}  onChange={ handleHorarioinicioChange} required />
                        <label htmlFor="horariofin" className='col-10'>Horario de fin</label>
                        <input className="col-10" type="time" name="horariofin" value={ horariofin}  min={horarioinicio}  onChange={ handleHorariofinChange} required />
                    </fieldset>

                    <fieldset className='col-12'>
                        <label htmlFor="cp" className='col-10'>Código Postal</label>
                        <input className="col-10" type="number" name="cp" defaultValue={cp} pattern="[0-5]{5}"  placeholder="Introduzca código postal"  title="Debe introducir su código postal"  onChange={ handleCpChange} required />
                    </fieldset>


                    <fieldset className='col-12'>
                        <label htmlFor="Password" className='col-10'>Contraseña</label>
                        <input id='pass1' className="col-10" type="password" value={ password} name="Password" placeholder="Introduzca contraseña de al menos 8 caracteres" pattern=".{8,}" title="Debe usar 8 o más caracteres" onChange={ handlePasswordChange} required />
                    </fieldset>
                    {
                        errorp?errorparagraph: null
                    }
                    <fieldset className='col-12'>
                        <label htmlFor="PasswordConfirm" className='col-10'>Confirmación de la contraseña</label>
                        <input id='pass2' className="col-10" type="password" placeholder="Repita la contraseña" name="PasswordConfirm" required />
                    </fieldset>

                    <fieldset className='col-12'>
                        <button className="boton-azul blanco" type="submit" name="enviar" value="Registrarse" id='form-register-button'>Registrarse</button>
                    </fieldset>

                    <div className='col-10'>
                        <Link to="/guardlogin">
                            ¿Ya tienes una cuenta?
                        </Link>
                    </div>
                </form>
                {
                    error?errorMsg:null
                } 
            </section>
        
        </section>
        
  )
}
