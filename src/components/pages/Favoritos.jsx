import React, { useState, useEffect } from 'react';
import userService from '../../services/users';
import Guard from '../utils/Guard';
import BotonRegistro from '../utils/BotonRegistro';

const Favoritos = () => {
    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)

    //Comprueba que el usuario está logeado
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

    //toggleFav recojo la id de el usuario que he pinchado,  
    const toggleFav = (id) => {
        const guard = guards.guards.find(n => n.id === id)//busco y declaro la niñera que he pinchado
        var favoritos = usuario.guards//traigo la lista completa de favoritos
        var encontrado = false
        for (let index = 0; index < favoritos.length; index++) {//hago un bucle para recorrer la lista favoritos
            const element = favoritos[index];
            if (element == id) {// Si encuentra la misma id de la niñera que he pinchado
                userService     //llama a los services para eliminarlo de la lista
                .putfav(usuario.id, guard.id)
                .then(returnedGuard => {    //actualiza la lista
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
                //actualizamos el elemento del localstorage
                const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
                window.localStorage.setItem("loggedNoteAppUser", modifiedndstrigifiedForStorage);
                encontrado = true
                break
            }
            
        }

        if (!(encontrado)) {    //si no encuentra la niñera en la lista de favoritos
            userService         //llama a los services para haver una peticion post a la api para añadir la niñera a favoritos
            .postfav(usuario.id, guard.id)
            .then(returnedGuard => {//actualiza la lista
                setGuards(guards.map(guardd => guardd.id !== id ? guardd : guard))
            })
            const parsedObject = usuario
            // Modifies the object, converts it to a string and replaces the existing `ship` in LocalStorage
            parsedObject.guards.push(guard.id)
            //actualizamos el elemento del localstorage
            const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
            window.localStorage.setItem("loggedNoteAppUser", modifiedndstrigifiedForStorage);
        }
        
        
    }
    
    const newmode = window.localStorage.getItem('newmode')

    //Filtro para ocultar las niñeras que no están disponibles en este momento
    const guardsToShow = showAll? guards.guards : guards.guards.filter(guard => guard.disponible)
    
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