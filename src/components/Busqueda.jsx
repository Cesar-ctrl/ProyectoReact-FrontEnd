import React, { useState, useEffect } from 'react'
import Star from './Star'
import guardService from '../services/guards'
import userService from '../services/users'
import Guard from '../components2/Guard'

const Busqueda = () => {

    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [onlyguard, setOnlyguard] = useState(null)
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
        var favoritos = usuario.guards
        var encontrado = false
        for (let index = 0; index < favoritos.length; index++) {
            const element = favoritos[index];
            if (element == id) {
                userService
                .putfav(usuario.id, guard.id)
                .then(returnedGuard => {
                    setGuards(guards.map(guardd => guardd.id !== id ? guardd : guard))
                })
                .catch(error => {
                    setErrorMessage(
                    `Note '${guard.content}' was already removed from server`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)   
                })
                var parsedObject = usuario
                // Modificar el objeto para ahora guardarlo en el localStorage
                parsedObject.guards = parsedObject.guards.filter(item => item !== id)
                const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
                window.localStorage.setItem("loggedNoteAppUser", modifiedndstrigifiedForStorage);
                encontrado = true
                break
            }
            
        }

        if (!(encontrado)) {
            userService
            .postfav(usuario.id, guard.id)
            .then(returnedGuard => {
                setGuards(guards.map(guardd => guardd.id !== id ? guardd : guard))
            })
            .catch(error => {
            setErrorMessage(
                `Note '${guard.content}' was already removed from server`
            )
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)   
            })
            const parsedObject = usuario
            // Modificar el objeto para ahora guardarlo en el localStorage
            parsedObject.guards.push(guard.id)
            const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
            window.localStorage.setItem("loggedNoteAppUser", modifiedndstrigifiedForStorage);
        }
        
        
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
            {usuario?
            guardsToShow.map((guard, i) => 
                <Guard
                    key={i}
                    favs={usuario.guards}
                    guard={guard}
                    toggleFav={() => toggleFav(guard.id)}
                />
            )
            :guardsToShow.map((guard, i) => 
            <Guard
                key={i}
                favs={[]}
                guard={guard}
                toggleFav={() => toggleFav(guard.id)}
            />
            )

            }
                
            </div>
        </section>

      </section>
    )
  }
  
  export default Busqueda