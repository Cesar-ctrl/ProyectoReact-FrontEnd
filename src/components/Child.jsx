import React, { useState, useEffect } from "react";
import Star from './Star'
import {  Notification } from './Staricon'
import childService from '../services/childs'
import Hijo from '../components2/Hijo'
import { useNavigate,  Link } from "react-router-dom";
import ChildRegister from './ChildRegister'

const Child = () => {
    //Se que debería llamarse children
    const [childs, setChilds] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        childService
          .getAll()
          .then(initialGuards => {
            setChilds(initialGuards)
          })
      }, [])
    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggUserJSON)

    const childsToShow = childs.filter(n => n.user.id === usuario.id)
    console.log(childsToShow)
    return (
        
        <section className="home busqueda">
        <header className='titulo main'>
            <h2>Búsqueda</h2>
        </header>
        <section className='buscador'>
            <div className='barra'>
                
                <input type="text" className='barra col-8' />
                <div className='imgbuscar'>
                    <img src="../img/lupa-busqueda.png" alt="" className='lupa'/>
                </div>
                
            </div>
            <div className='filtros'>

            </div>
        </section>
        <section className='flexea column'>
            <div className='col-10 column listado'>
                {childsToShow.map((child, i) => 
                    <Hijo
                        key={i}
                        child={child}
                    />
                )}
                <Link className='cuidador flexea roww' to='signup'>
                    <h3>¿Añadir un niño?</h3>
                </Link>
                
            </div>
        </section>

      </section>
    )
}
export default Child