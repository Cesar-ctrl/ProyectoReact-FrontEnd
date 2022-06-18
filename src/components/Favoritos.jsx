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
        console.log(guards)
        const guard = guards.guards.find(n => n.id === id)
        console.log(guard)
        var favoritos = usuario.guards
        console.log(id)
        console.log(favoritos)
        var encontrado = false
        for (let index = 0; index < favoritos.length; index++) {
            const element = favoritos[index];
            console.log(element)
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
                console.log(guards)
                var parsedObject = usuario
                console.log(id)
                // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
                parsedObject.guards = parsedObject.guards.filter(item => item !== id)
                console.log(parsedObject)
                const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
                console.log(modifiedndstrigifiedForStorage)
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
            console.log(modifiedndstrigifiedForStorage)
            window.localStorage.setItem("loggedNoteAppUser", modifiedndstrigifiedForStorage);
        }
        
        
    }
    
    const newmode = window.localStorage.getItem('newmode')
      console.log(guards)
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