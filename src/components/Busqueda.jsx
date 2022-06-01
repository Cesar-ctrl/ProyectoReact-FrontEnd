import React, { useState, useEffect } from 'react'
import Star from './Star'
import guardService from '../services/guards'
import Guard from '../components2/Guard'

const Busqueda = () => {

    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        guardService
          .getAll()
          .then(initialGuards => {
            setGuards(initialGuards)
          })
      }, [])
    
    const toggleDisponible = (id) => {
        const guard = guards.find(n => n.id === id)
        const changedNote = { ...guard, disponible: !guard.disponible }
      
        guardService
          .update(id, changedNote)
          .then(returnedGuard => {
            setGuards(guards.map(guard => guard.id !== id ? guard : returnedGuard))
          })
          .catch(error => {
            setErrorMessage(
              `Note '${guard.content}' was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)   
          })
      }


    const guardsToShow = showAll
    ? guards
    : guards.filter(guard => guard.disponible)


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
            {guardsToShow.map((guard, i) => 
                <Guard
                    key={i}
                    guard={guard} 
                    toggleDisponible={() => toggleDisponible(guard.id)}
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
            </div>
        </section>

      </section>
    )
  }
  
  export default Busqueda