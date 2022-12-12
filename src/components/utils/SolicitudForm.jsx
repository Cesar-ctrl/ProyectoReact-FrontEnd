import React, { useEffect, useState } from 'react';
import {  Link, useLocation } from "react-router-dom";
import userService from '../../services/users';

const SolicitudForm = ({ sendSolicitud, setSolicitar, horariofin, horarioinicio }) => {
    const location = useLocation();
    const state = location.state;
    const newmode = window.localStorage.getItem('newmode');
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    const usuario = JSON.parse(loggedUserJSON);
    const date = new Date();

    const [thorariofin, setTHorariofin] = useState('')
    const [thorarioinicio, setTHorarioinicio] = useState('')
    const [childs, SetChilds] = useState([]);
    const [calle, SetCalle] = useState('');
    const [institucion, SetInstitucion] = useState('');
    const [colegio, SetColegio] = useState('');
    const [casa, SetCasa] = useState('');
    const [error, setError] = useState(false);
    const [errorName, setErrorName] = useState('');
    const [errortext, setErrortext] = useState('');

    useEffect(() => {
        userService.setToken(usuario.token)
        userService.getchildsUser(usuario.id)
            .then(user => {
                SetChilds(user.hijos)
            })
        
    }, [])

    console.log(institucion)

    const comprueba = (e) =>{
        if(document.querySelectorAll('input[type="checkbox"]:checked').length==0){
            e.preventDefault();
            document.querySelectorAll('li').forEach(element => {
                element.style ='border: 1px solid red;'
            });
            setError(true)
            
            setTimeout(() => {
                setErrorName('Formulario inválido')
                setErrortext('No ha elegido a el niño que se desea cuidar')
            }, 2000)
            setTimeout(() => {
                setErrorName('')
                setErrortext('')
                setError(false)
            }, 6000)
        }else{
            var ninios = []
            var inpuuts = document.querySelectorAll('input[type="checkbox"]:checked')
            inpuuts.forEach(element => {
                ninios.push(element.value)
            });
            sendSolicitud(thorarioinicio, thorariofin, colegio, calle, institucion, ninios)
        }
    }

    const handleHorarioinicioChange = ({target}) => setTHorarioinicio(target.value)
    const handleHorariofinChange = ({target}) => setTHorariofin(target.value)
    const handleCasaChange = ({target}) => target.checked?SetColegio(false):SetCasa(false)
    const handleColegioChange = ({target}) => target.checked?SetColegio(true):SetColegio(false)
    const handleCalleChange = ({target}) => SetCalle(target.value)
    const handleInstitucionChange = ({target}) => SetInstitucion(target.value)
    
    const errorMsg = 
        <div className='errorMsg'>
            <h2 className='errorName'>{errorName}</h2>
            <p className='errortext'>{errortext}</p>
        </div>
    
    
    return(
        <section className='flexea column'>
            <header>
            </header>
            <section className='col-10 column listado deperfil'>
                <header className='grid'>
                    <a className='flexea atras negro' onClick={setSolicitar}>
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" /> 
                    </a>
                    <h2>Mandar Solicitud</h2>
                </header>
                <form action="" onSubmit={comprueba} id='my-form'>
                    <fieldset className='col-12'>
                        <label htmlFor="horarioinicio" className='col-10' >Horario de comienzo</label>
                        {
                            (date.getHours()+':'+date.getMinutes())>horarioinicio?
                            <input className="col-10" type="time" name="horarioinicio" defaultValue={date.getHours()+':'+date.getMinutes()} value={ thorarioinicio} onChange={handleHorarioinicioChange} />
                            :<input className="col-10" type="time" name="horarioinicio" defaultValue={horarioinicio}  value={ thorarioinicio} onChange={handleHorarioinicioChange} />
                        }
                        
                        <label htmlFor="horariofin" className='col-10'>Horario de fin</label>
                        <input className="col-10" type="time" name="horariofin" value={ thorariofin}  min={thorarioinicio} defaultValue={horariofin} onChange={handleHorariofinChange} />
                    </fieldset>

                    <fieldset className='col-12'>
                        <div>
                            <div className='flexea'>
                                
                                <input type="radio" id='colegio' name='tipo' value={colegio} onChange={handleColegioChange} required />
                                <label htmlFor='colegio'>Colegio</label>
                            </div>
                        </div>
                        <div>
                            <div className='flexea'>
                                
                                <input type="radio" id='casa' name='tipo' value={casa} onChange={handleCasaChange} required />
                                <label htmlFor='casa'>Casa</label>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <label htmlFor='calle'>Calle</label>
                        <input type="text" id='calle' name='calle' value={calle} onChange={handleCalleChange} required />
                    </fieldset>

                    {
                        colegio?
                        <fieldset>
                            <label htmlFor='institucion'>Nombre de institución</label>
                            <input type="text" id='institucion' name='institucion' value={institucion} onChange={handleInstitucionChange} required />
                        </fieldset>
                        :null
                    }
                    
                    <fieldset className='col-12'>
                        {childs.map(({ id, name, surnames, edad, DNI, alergenos, necesidadesesp }, index) => {
                            return (
                                <li key={index}>
                                  <div className="flexea">
                                      <input
                                        type="checkbox"
                                        id={`custom-checkbox-${id}`}
                                        name={name}
                                        value={id}
                                      />
                                      <label htmlFor={`custom-checkbox-${id}`}>{name}</label>
                                  </div>
                                </li>
                              );
                            })}
                    </fieldset>
                    <fieldset className='col-12'>
                        {
                            childs.length>0?
                            <button type="submit" className='boton-azul blanco' >Solicitar</button>
                            :
                            <Link className='cuidador flexea roww' state={state} to='../child'>
                                <h3>Aún no has registrado ningún niño</h3>
                            </Link>
                        }
                        
                    </fieldset>
                </form>
                {
                    error?errorMsg:null
                }   
            </section>
            
        </section>
    )

}
export default SolicitudForm