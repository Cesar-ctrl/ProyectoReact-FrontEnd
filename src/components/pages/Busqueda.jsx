import React, { useState, useEffect } from 'react';
import guardService from '../../services/guards';
import userService from '../../services/users';
import Guard from '../utils/Guard';

const Busqueda = () => {

    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [busqueda, setBusqueda] = useState('') 
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const usuario = JSON.parse(loggeUserJSON)


    useEffect(() => {
        guardService
          .getAll()
          .then(initialGuards => {
            setGuards(initialGuards)
          })
    }, [])
    
    //toggleFav recojo la id de el usuario que he pinchado,  
    const toggleFav = (id) => {
        const guard = guards.find(n => n.id === id)//busco y declaro la niñera que he pinchado
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
            // Modificar el objeto para ahora guardarlo en el localStorage
            parsedObject.guards.push(guard.id)
            //actualizamos el elemento del localstorage
            const modifiedndstrigifiedForStorage = JSON.stringify(parsedObject);
            window.localStorage.setItem("loggedNoteAppUser", modifiedndstrigifiedForStorage);
        }
        

    }

    const handleSearchChange = ({target}) => setBusqueda(target.value)
    var search = guards.filter(guard => guard.name.includes(busqueda))
    const guardsToShow = search

    return (
      <section className="home busqueda">
        <header className='titulo main'>

            <h2>Listado de cuidadores</h2>

        </header>
        <section className='buscador'>
            <div className='barra'>
                
                <input type="text" className='barra col-8' onChange={handleSearchChange} />
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