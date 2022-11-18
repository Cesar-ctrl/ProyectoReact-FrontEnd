import React, { useEffect, useState } from 'react';
import {  Link, useLocation } from "react-router-dom";
import userService from '../../services/users';

const SolicitudForm = ({ sendSolicitud, setSolicitar }) => {
    const location = useLocation();
    const state = location.state;
    const newmode = window.localStorage.getItem('newmode')
    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggUserJSON)

    const [childs, SetChilds] = useState([])

    useEffect(() => {
        userService.setToken(usuario.token)
        userService.getchildsUser(usuario.id)
            .then(user => {
                SetChilds(user.hijos)
            })
        
    }, [])
    
    return(
        <section className='flexea column'>
            <header>
            </header>
            <section className='col-10 column listado deperfil'>
                <header>
                    <button className='flexea atras negro' onClick={setSolicitar}>
                        <img src="https://babyguard.vercel.app/img/back-arrow.svg" alt="" className='reloj maspequenio' />
                            
                    </button>
                    <h2>Mandar Solicitud</h2>
                </header>
                <form action="">
                    <fieldset className='col-12'>
                        <label htmlFor="timestamp" className='col-10'>Horario de comienzo</label>
                        <input className="col-10" type="time" name="horarioinicio"  />
                        <label htmlFor="timestamp" className='col-10'>Horario de fin</label>
                        <input className="col-10" type="time" name="horariofin" />
                    </fieldset>
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
                        <button className='boton-azul blanco' onClick={() => sendSolicitud()}>Solicitar</button>
                    </fieldset>
                </form>
                
            </section>
            
        </section>
    )

}
export default SolicitudForm