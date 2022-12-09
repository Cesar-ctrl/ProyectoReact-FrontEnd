import React, { useState, useEffect, useRef } from 'react'
import { Routes,  Route,  Link, useLocation  } from "react-router-dom";
import Busqueda from './Busqueda';
import Favoritos from './Favoritos';
import Solicitudes from './Solicitudes';
import Chat from './Chat';
import Child from './Child';
import Contratos from './Contratos';
import Miperfil from './Miperfil';
import ChildRegister from '../LoginRegister/ChildRegister';
import ChildUpdate from '../InfoUpdate/ChildUpdate';
import childService from '../../services/childs';
import userService from '../../services/users';
import guardService from '../../services/guards';
import PerfilGuard from '../utils/PerfilGuard';
import Ajustes from './Ajustes';
import UserUpdate from '../InfoUpdate/UserUpdate';
import GuardUpdate from '../InfoUpdate/GuardUpdate';
import PerfilUsuario from '../utils/PerfilUsuario';
import { io } from 'socket.io-client';
//Todas las importaciones necesarias


function Home() {
    //Uso el Uselocation para que se pueda cambiar el fondo de la aplicación
    //se envía a través de los Link 
    const location = useLocation();
    const state = location.state;
    // Declaración de variables de estado
    const [user, setUser] = useState(null)
    const [guard, setGuard] = useState(null)
    const [container, setContainer] = useState('container')
    const socket = useRef();
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const loggGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const [currentNotif, setCurrentNotif] = useState(undefined);
    //usamos useEffect para ejecutar tareas secundarias como declarar los token en los services 
    useEffect(() => {
        
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          userService.setToken(user.token)
          childService.setToken(user.token)
        }  
        
        if (loggGuardJSON) {
            const guardian = JSON.parse(loggGuardJSON)
            setGuard(guardian)
            guardService.setToken(guardian.token)
          }  
    }, [])
    
    //useEffect(() => { //utilizamos socket para que recibir notificaciones
    //    // cambiar a http://localhost:3001 Si se quiere probar en local 
    //    // Y en el servidor tambén pondré un comentario de que cambiar para que funcione en local 
    //    if(loggGuardJSON || loggedUserJSON){
    //        socket.current = io('https://babyguard.onrender.com');
    //        if (loggGuardJSON) {
    //            socket.current.emit("add-user", loggGuardJSON.id)
    //        }
    //        if(loggedUserJSON){
    //            socket.current.emit("add-user", loggedUserJSON.id)
    //        }
    //    }
    //    //Continuar con las notificaciones
    //    
    //    
    //}, []);
    //console.log(socket)
    //Esto es un Easteregg
    const toggleback = () => {
        setContainer('container backunder')
        window.localStorage.setItem(
            'newmode', true
          )
    }
    
    //El router de la aplicación, aquí declaro todas las rutas de los componentes que estén después del registro y el welcome
    return(
        <div className={container} id="containermain">
            <main className={state?'main '+state:'main background1'}>
            <Routes>
                <Route path="/buscar" element={ <Busqueda currentNotif={currentNotif} socket={socket}  />} />
                <Route path="/favoritos" element={ <Favoritos currentNotif={currentNotif} socket={socket} /> }  />
                <Route path="/solicitudes" element={ <Solicitudes currentNotif={currentNotif} socket={socket} /> }  />
                <Route path="/chat" element={ <Chat /> }  />
                <Route path="/contratos" element={ <Contratos currentNotif={currentNotif} socket={socket} /> } />
                <Route path="/child" element={ <Child currentNotif={currentNotif} socket={socket} /> } />
                <Route path="/child/signup" element={ <ChildRegister 
                    modoEdicion={false}
                    currentNotif={currentNotif} socket={socket}
                /> } />
                <Route path="/child/change/*" element={ <ChildUpdate /> } />
                <Route path="/perfil" element={ <Miperfil /> } />
                <Route path="/perfil/ajustes" element={ <Ajustes /> } />
                <Route path="/perfil/personal" element={ <UserUpdate /> } />
                <Route path="/perfil/guardpersonal" element={ <GuardUpdate /> } />
                <Route path="/buscar/guard/*" element={ <PerfilGuard /> } />
                <Route path="/buscar/user/:userid" element={ <PerfilUsuario /> } />
            </Routes>
            </main>
            
            <footer className="footerhome">
            <hr onDoubleClick ={ () => toggleback() }/>
                <Link className="nav" to="/home/buscar" state={state}>
                    <img src="https://babyguard.vercel.app/img/lupa.svg" alt="" className='icono'/>
                    Buscar
                </Link>
                {guard?
                <Link className="nav" to="/home/solicitudes" state={state}>
                    <img src="https://babyguard.vercel.app/img/Light_green_check.svg" alt="" className='icono'/>
                    Solicitud
                </Link>
                :
                <Link className="nav" to="/home/favoritos" state={state}>
                    <img src="https://babyguard.vercel.app/img/estrella.svg" alt="" className='icono'/>
                    Favoritos
                </Link>

                }
                
                <Link className="nav" to="/home/chat" state={state}>
                    <img src="https://babyguard.vercel.app/img/mensaje.svg" alt="" className='icono'/>
                    Chat
                </Link>
                {guard?
                <Link className="nav" to="/home/contratos" state={state}>
                    <img src="https://babyguard.vercel.app/img/child.svg" alt="" className='icono'/>
                    Contratos
                </Link>
                :
                <Link className="nav" to="/home/child" state={state}>
                    <img src="https://babyguard.vercel.app/img/child.svg" alt="" className='icono'/>
                    Niños
                </Link>
                }
                <Link className="nav" to="/home/perfil" state={state}>
                    <img src="https://babyguard.vercel.app/img/cuenta.svg" alt="" className='icono'/>
                    Perfil
                </Link>
            </footer>
                

        </div>
        
    );
}

export default Home;