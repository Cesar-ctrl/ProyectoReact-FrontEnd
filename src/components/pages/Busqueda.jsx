import React, { useState, useEffect } from 'react';
import guardService from '../../services/guards';
import messageService from '../../services/messages';
import userService from '../../services/users';
import Guard from '../utils/Guard';


const Busqueda = (currentNotif, socket) => {
    console.log(socket)
    const [notification, setNotification] = useState([]);
    const [arrivalNotification, setArrivalNotification] = useState(null);
    const [user, setUser] = useState(null)
    const [guards, setGuards] = useState([]) 
    const [showAll, setShowAll] = useState(true)
    const [busqueda, setBusqueda] = useState('') 
    const [childs, SetChilds] = useState([]);
    const [cp, setCp] = useState(null) 
    const [tip, setTip] = useState(false);
    const [error, setError] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [errortext, setErrortext] = useState('')
    const loggeUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const loggedGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const usuario = JSON.parse(loggeUserJSON)
    const guard = JSON.parse(loggedGuardJSON)
    


    useEffect(() => {
        guardService
          .getAll()
          .then(initialGuards => {
            setGuards(initialGuards)
          })
    }, [])

    //useEffect(() => {
    //    if(usuario){  // distingue si es un usuario o una niñera para ver que mensajes son recibidos o enviados
    //        const response = messageService.recieveLastMessageRoute({
    //            to: usuario.id
    //        })
    //        response.then(chats => {
    //            setNotification(chats);
    //        })
    //    }else{
    //        messageService
    //            .recieveLastMessageRoute({
    //                to:guard.id,
    //            })
    //            .then(chats => {
    //                setNotification(chats);
    //            })
    //    }
    //}, []);

    useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalNotification({ fromSelf: false, message: msg });
          });
        }
    }, []);

    useEffect(() => {
        console.log(arrivalNotification)    
        arrivalNotification && setNotification((prev) => [...prev, arrivalNotification]);
    }, [arrivalNotification]);
    
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
        if(!(usuario.hijos.length>0)){
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

    const handleSearchChange = ({target}) => setBusqueda(target.value)
    const handleCpChange = ({target}) => setCp(target.value)
    var search = guards.filter(guard => guard.name.toLowerCase().includes(busqueda.toLowerCase()))
    function searchcp () {
        if(busqueda=="" && cp==null){
            return guards
        }else{
            return search.filter(guard => (""+guard.cp).includes(""+cp))
        }

    }
    var listcp = searchcp()

    const guardsToShow = showAll? listcp : listcp.filter(guard => guard.disponible)

    const errorMsg = 
        <div className='errorMsg'>
            <h2 className='errorName'>{errorName}</h2>
            <p className='errortext'>{errortext}</p>
        </div>
    const tipMsg = 
        <div className='errorMsg blue'>
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
                <input type="checkbox" onClick={() => setShowAll(!showAll)} />
                <input type="number" className='barra col-4' onChange={handleCpChange} placeholder='C.P.' />
                <input type="text" className='barra col-4' onChange={handleSearchChange} placeholder='Buscar por nombre' />
                <div className='imgbuscar'>
                    <img src="../img/lupa-busqueda.png" alt="" className='lupa'/>
                </div>
                
            </div>
            <div className='filtros'>
            <div>
                
            </div>
            </div>
        </section>
        <section className='flexea column' onLoad={gothijos} >
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