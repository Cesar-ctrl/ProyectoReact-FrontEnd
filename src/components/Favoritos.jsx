import React, { useState, useEffect } from 'react'
import guardService from '../services/guards';
import Guard from '../components2/Guard'
import Star from './Star'


const Favoritos = () => {

    const [guards, setGuards] = useState([]) 
    const [user, setUser] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const loggUseJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggUseJSON)

    useEffect(() => {
        guardService
          .getAll()
          .then(initialGuards => {
            setGuards(initialGuards)
          })
      }, [])


    //useEffect(() => {
    //    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    //    const user = JSON.parse(loggedUserJSON)
    //    guardService.getFav(user.guards)
    //})

    // TODO: CONSEGUIR QUE ESTO FUNCIONE
    //const toggleFav = (id) => {
    //    const user = user.find(n => n.id === usuario.)
    //    const changedNote = { ...guard, disponible: !guard.disponible }
    //  
    //    guardService
    //      .update(id, changedNote)
    //      .then(returnedGuard => {
    //        setGuards(guards.map(guard => guard.id !== id ? guard : returnedGuard))
    //      })
    //      .catch(error => {
    //        setErrorMessage(
    //          `Note '${guard.content}' was already removed from server`
    //        )
    //        setTimeout(() => {
    //          setErrorMessage(null)
    //        }, 5000)   
    //      })
    //  }
    
    const guardsToShow = showAll
    ? guards
    : guards.filter(guard => guard.disponible)

    return (
        <section className="home">
            <header className='titulo main'>

                <h2>Favoritos</h2>
            </header>
            <section className='buscador'>
                <div className='barra'>
                    
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
                    
                </div>
            </section>
            <section className='flexea column'>
                <div className='col-10 column listado'>
                {guardsToShow.map((guard, i) => 
                    <Guard
                        key={i}
                        guard={guard} 
                        
                    />
                )}

                    <div className='cuidador flexea roww'>
                        <div className='foto'>
                            <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
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
                            <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
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
            </section>
        </section>
    )
}
export default Favoritos