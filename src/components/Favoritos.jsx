import React, { useState, useEffect } from 'react'
import userService from '../services/users';
import Guard from '../components2/Guard'
import Star from './Star'
import BotonRegistro from './BotonRegistro'

const Favoritos = () => {

    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)
    //useEffect(() => {
    //    guardService
    //      .getAll()
    //      .then(initialGuards => {
    //        setGuards(initialGuards)
    //      })
    //  }, [])
    useEffect(() => {
        const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if(loggUserJSON){
            const usuario = JSON.parse(loggUserJSON)
            userService
            .getFavUser(usuario.id)
            .then(initialGuards => {
                setGuards(initialGuards)
            })
        }
      }, [])


    //useEffect(() => {
    //    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    //    const user = JSON.parse(loggedUserJSON)
    //    guardService.getFav(user.guards)
    //})

    // TODO: CONSEGUIR QUE ESTO FUNCIONE
    const toggleFav = (id) => {
        const user = user.find(n => n.id === usuario.id)
        
        userService
          .getFavUser(id)
          .then(returnedGuard => {
            setGuards(guards.map(guard => guard.id !== id ? guard : returnedGuard))
          })
          .catch(error => {
            setErrorMessage(
              `Note  was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)   
          })
      }
    
    const newmode = window.localStorage.getItem('newmode')
    const guardsToShow = showAll
    ? guards.guards
    : guards.guards.filter(guard => guard.disponible)
    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    return (
        <section className="home">
            <header className='titulo main'>

                <h2>Favoritos</h2>
            </header>
            <section className='buscador'>
                <div className='barra'>
                {
                loggUserJSON? 
                    <button onClick={() => setShowAll(!showAll)}>
                        Ver niñeras  {showAll ? 'disponibles' : 'todas' }
                    </button>
                : console.log("esperando")
                } 
                </div>
            </section>
            <section className='flexea column'>
                {
                loggUserJSON? 
                
                <div className='col-10 column listado'>

                {
                guardsToShow? guardsToShow.map((guard, i) => 
                <Guard
                    key={i}
                    guard={guard} 
                    toggleDisponible={() => toggleFav(guard.id)}
                    
                />)
                :console.log("esperando")
                }

                    <div className='cuidador flexea roww'>
                        <div className='foto'>
                        {
                        newmode?<img src="../img/pepe-clown.gif" className='fotoestandar' alt="" /> :
                        <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
                        }
                        </div>
                        <div>
                            <div className='nombreval flexea column'>
                                <h3>NOMBRE APELLIDO</h3>
                                <div className="flexea roww">
                                    {<Star />}

                                    <h3>4.8</h3>
                                </div>
                            </div>
                        </div>
                        <div className='horadisp flexea column'>
                            <img src="../img/reloj-pequenio.png" className="reloj pequenio" alt="" />
                            <h3>12:00-18:00</h3>
                        </div>
                    </div>
                    
                    <div className='cuidador flexea roww indispuesto'>
                        <div className='foto'>
                            {
                                newmode?<img src="../img/pepe-clown.gif" className='fotoestandar' alt="" /> :
                                <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
                            }
                        </div>
                        <div>
                            <div className='nombreval flexea column'>
                                <h3>NOMBRE APELLIDO</h3>
                                <div className="flexea roww">
                                    {<Star />}

                                    <h3>4.8</h3>
                                </div>
                            </div>
                        </div>
                        <div className='horadisp flexea column'>
                            <img src="../img/reloj-pequenio.png" className="reloj pequenio" alt="" />
                            <h3>12:00-18:00</h3>
                        </div>
                    </div>
                </div>
                :<BotonRegistro />
                }
            </section>
        </section>
    )
}
export default Favoritos