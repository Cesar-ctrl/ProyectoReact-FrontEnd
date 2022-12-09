import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import userService from '../../services/users'
import Hijo from '../utils/Hijo'
import BotonRegistro from '../utils/BotonRegistro'

const Child = () => {
    //Se que debería llamarse children
    const [childs, setChilds] = useState([]) 
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggedUserJSON)

    const location = useLocation();
    const state = location.state;

    //comprueba si el usuario esta logeado y llama a la api para traer los niños iniciados por el usuario
    useEffect(() => {
        if(loggedUserJSON){
        userService
            .getUser(usuario.id)
            .then(initialGuards => {
                setChilds(initialGuards)
            })
        }
    }, [])
    //Si no está logueado mostrará BotonRegistro que es una página con un botón para ir al login

    return (
        
        <section className="home busqueda">
            <header className='titulo main'>
                <h2>Niños</h2>
            </header>
            <section className='buscador'>
                <div className='barra'>      
                </div>
                <div className='filtros'>

                </div>
            </section>
            <section className='flexea column'>
            {
                loggedUserJSON? 
                
                <div className='col-10 column listado'>
                    {childs.hijos? childs.hijos.map((child, i) =>
                        <Hijo
                            key={i}
                            child={child}
                        />
                    ):console.log("Esperando")
                }
                    <Link className='cuidador flexea roww' state={state} to='signup'>
                        <h3>¿Añadir un niño?</h3>
                    </Link>
                    
                </div>
                :<BotonRegistro />
            }
            </section>
      </section>
    )
}
export default Child