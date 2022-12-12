import React, { useState, useEffect } from 'react';
import guardService from '../../services/guards';
import messageService from '../../services/messages';
import userService from '../../services/users';
import commentService from '../../services/comments';
import Guard from '../utils/Guard';
import { render, forceUpdate } from 'react-dom';


const Busqueda = (currentNotif, socket) => {
    const [notification, setNotification] = useState([]);
    const [arrivalNotification, setArrivalNotification] = useState(null);
    const [user, setUser] = useState(null)
    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(false)
    const [sorted, setSorted] = useState(false)
    const [busqueda, setBusqueda] = useState('') 
    const [childs, SetChilds] = useState([]);
    const [cp, setCp] = useState(null) 
    const [filtro, setFiltro] = useState(false) 
    const [tip, setTip] = useState(false);
    const [error, setError] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [errortext, setErrortext] = useState('')
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const loggedGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const usuario = JSON.parse(loggedUserJSON)
    const guard = JSON.parse(loggedGuardJSON)
    


    useEffect(() => {
        userService
            .getUser()
            .then(usuarrio => {
                setUser(usuarrio)
            })
        guardService
          .getAll()
          .then(initialGuards => {
            setGuards(initialGuards)
          })

    }, [])

    useEffect(() => { 
        if(guards.length>0){
            guards.map(guardd => {
                commentService.recieveValRoute(guardd.id)
                .then(point => {
                    guardd.valoracion = point.total
                    
                })
                
            })
            
        }
    }, [])
    
    //toggleFav recojo la id de el usuario que he pinchado,  
    
    const toggleFav = (id) => {
        try{
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
        }catch(e) {
            setError(true)
            
            setTimeout(() => {
                setErrorName('Error Login')
                setErrortext('No estas registrado para usar esa acción')
            }, 2000)
            setTimeout(() => {
                setErrorName('')
                setErrortext('')
                setError(false)
            }, 6000)
            
            
        }
    }
    
    const gothijos = () =>{
        if(usuario){
            if(user){
                if(!(user.hijos.length>0)){
                    setTip(true)
                    setTimeout(() => {
                        setErrorName('Niños no iniciados')
                        setErrortext('No tienes ningún niño registrado en la app')
                    }, 2000)
                    setTimeout(() => {
                        setErrorName('')
                        setErrortext('')
                        setTip(false)
                    }, 6000)
                }
        }
    }
    }

    const handleSearchChange = ({target}) => setBusqueda(target.value)
    const handleCpChange = ({target}) => setCp(target.value)
    var search = guards.filter(guard => guard.name.toLowerCase().includes(busqueda.toLowerCase()))
    function searchcp () {
        if(busqueda=="" && cp==null){
            return guards
        }else{
            if(cp==null){
                return search.filter(guard => (""+guard.cp))
            }else{
                return search.filter(guard => (""+guard.cp).includes(""+cp))
            }
            
        }

    }
   
    var listcp = searchcp()    

    console.log(listcp)
    const guardsToShow = showAll? listcp : listcp.filter(guard => guard.disponible)

    const errorMsg = 
        <div className='errorMsg'>
            <h2 className='errorName'>{errorName}</h2>
            <p className='errortext'>{errortext}</p>
        </div>
    const tipMsg = 
        <div className='tipMsg'>
            <h2 className='errorName'>{errorName}</h2>
            <p className='errortext'>{errortext}</p>
        </div>
    

    return (
      <section className="home busqueda">
        <header className='titulo main'>

            <h2>Listado de cuidadores</h2>

        </header>
        <section className='buscador'>
            <div className='barra'>
                <input type="number" className={window.screen.width>425?'barra col-5':'barra col-7'} onChange={handleCpChange} placeholder='C.P.' />
                <input type="text" className={window.screen.width>425?'barra col-5 ':'barra col-7'} onChange={handleSearchChange} placeholder='Buscar por nombre' />
                <div className='imgbuscar'>
                    <img src="../img/lupa-busqueda.png" alt="" className='lupa'/>
                </div>
                
            </div>
            <div className='filtros flexea column'>
                {
                    filtro?<img src="../img/filtro-abierto.png" alt="" className='filter abierto' onClick={() => setFiltro(!filtro)} />:<img src="../img/filtro-cerrado.png" alt="" className='filter cerrado' onClick={() => setFiltro(!filtro)} />
                }
                    
                {
                    filtro?
                    <div className={filtro?'col-10 sticky abierto':'col-10 sticky cerrado'}>
                        <div className='flexea column'>
                            <div className='flexea'>
                                <input id="disponible" type="checkbox" onClick={() => setShowAll(!showAll)} defaultChecked={showAll} />
                                <label className="filtrosname" htmlFor="disponible">Enseñar cuidadores no disponibles</label>
                            </div>
                           
                            
                        </div>
                    </div>
                    :null
                }
                
            </div>
        </section>
        <section className='flexea column' onLoad={gothijos} >
            <div className={filtro?'col-10 column listado abierto':'col-10 column listado cerrado'}>
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
            {
                error?errorMsg:null
            }
            {
                tip?tipMsg:null
            } 
        </section>

      </section>
    )
  }
  
  export default Busqueda