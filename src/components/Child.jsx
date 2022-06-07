import React, { useState, useEffect } from "react";
import userService from '../services/users'
import Hijo from '../components2/Hijo'
import { useNavigate,  Link } from "react-router-dom";
import BotonRegistro from './BotonRegistro'

const Child = () => {
    //Se que debería llamarse children
    const [childs, setChilds] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggUserJSON)


    useEffect(() => {
        if(loggUserJSON){
        userService
            .getUser(usuario.id)
            .then(initialGuards => {
                setChilds(initialGuards)
            })
        }
    }, [])



    const childsToShow = showAll
    ? childs.hijos
    : childs.hijos.filter(guard => guard.disponible)
    return (
        
        <section className="home busqueda">
        <header className='titulo main'>
            <h2>Niños</h2>
        </header>
        <section className='buscador'>
            <div className='barra'>
            {
                loggUserJSON? 
                <div>
                    <input type="text" className='barra col-8' />
                    <div className='imgbuscar'>
                        <img src="../img/lupa-busqueda.png" alt="" className='lupa'/>
                    </div>
                </div>

                : console.log("esperando")
            }
                
            </div>
            <div className='filtros'>

            </div>
        </section>
        <section className='flexea column'>
        {
            loggUserJSON? 
            
            <div className='col-10 column listado'>
                {childsToShow? childsToShow.map((child, i) =>
                    <Hijo
                        key={i}
                        child={child}
                    />
                ):console.log("Esperando")
            }
                <Link className='cuidador flexea roww' to='signup'>
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