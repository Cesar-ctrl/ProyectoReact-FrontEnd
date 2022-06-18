import React, { useState, useEffect } from 'react'
import Star from './Star'
import guardService from '../services/guards'
import userService from '../services/users'
import Guard from '../components2/Guard'

const Busqueda = () => {

    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)

    useEffect(() => {
        guardService
          .getAll()
          .then(initialGuards => {
            setGuards(initialGuards)
          })
      }, [])
      
    const toggleFav = (id) => {
        const guard = guards.find(n => n.id === id)
        console.log(guard)
        var favoritos = usuario.guards
        console.log(id)
        console.log(favoritos)
        var encontrado = false
        for (let index = 0; index < favoritos.length; index++) {
            const element = favoritos[index];
            if (element == id) {
                userService
                .putfav(usuario.id, guard.id)
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

                encontrado = true
                break
            }
            
        }

        if (!(encontrado)) {
            userService
            .postfav(usuario.id, guard.id)
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
        
        
    }
    console.log(guards)

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
                    toggleFav={() => toggleFav(guard.id)}
                />
            )}
                
            </div>
        </section>

      </section>
    )
  }
  
  export default Busqueda