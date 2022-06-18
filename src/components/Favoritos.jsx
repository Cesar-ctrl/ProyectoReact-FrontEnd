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

    useEffect(() => {
        if(loggUserJSON){
            const usuario = JSON.parse(loggUserJSON)
            userService
            .getFavUser(usuario.id)
            .then(initialGuards => {
                setGuards(initialGuards)
            })
        }
    }, [])

    
    const toggleFav = (id) => {
        const guard = guards.guards.find(n => n.id === id)
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
            // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
            parsedObject.guards.push(guard.id)
            const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
            window.localStorage.setItem("loggedNoteAppUser", modifiedndstrigifiedForStorage);
        }
        
        
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
                    {guardsToShow?
                    usuario?
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
                        />)
                    : console.log('esperando')
                    }
                </div>
                :<BotonRegistro />
                }
            </section>
        </section>
    )
}
export default Favoritos