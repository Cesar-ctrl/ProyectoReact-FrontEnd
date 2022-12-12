import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import guardService from '../../services/guards'
import solicitudService from '../../services/solicitudes'
import Contrato from '../utils/Contrato'

const Contratos = () => {
    //Se que debería llamarse children
    const [contratos, setContratos] = useState([]) 
    const [guard, setGuard] = useState([]) 
    const loggGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guardd = JSON.parse(loggGuardJSON)

    const location = useLocation();
    const state = location.state;

    //comprueba si el usuario esta logeado y llama a la api para traer los niños iniciados por el usuario
    useEffect(() => {
        if(loggGuardJSON){
            guardService
                .getGuard(guardd.id)
                .then(initialGuards => {
                    setGuard(initialGuards)
                })
            solicitudService
                .getHistoryContratos(guardd.id)
                .then(initialGuards => {
                    console.log(initialGuards.acabado)
                    setContratos(initialGuards.sort(function(a,b){return a.acabado-b.acabado}))
                })
        }
            
    }, [])

    //Si no está logueado mostrará BotonRegistro que es una página con un botón para ir al login

    return (
        
        <section className="home busqueda">
            <header className='titulo main'>
                <h2>Contratos</h2>
            </header>
            <section className='buscador'>
                <div className='barra'>      
                </div>
                <div className='filtros'>

                </div>
            </section>
            <section className='flexea column'>
                <div className='col-10 column listado contrato'>
                    {contratos.map((contrato, i) =>
                        <Contrato
                            key={i}
                            ouser={contrato.user}
                            aprobado={contrato.aprobado}
                            acabado={contrato.acabado}
                            ninios={contrato.ninios}
                            contrato={contrato.id}
                            guard={guardd.id}
                        />
                    )
                }   
                </div>
            </section>
      </section>
    )
}
export default Contratos