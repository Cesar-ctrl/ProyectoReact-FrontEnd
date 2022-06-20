import React, { useState, useEffect } from 'react'
import { Routes,  Route,  Link, useLocation  } from "react-router-dom";
import Busqueda from './Busqueda';
import Favoritos from './Favoritos';
import Chat from './Chat';
import Child from './Child';
import Miperfil from './Miperfil';
import ChildRegister from '../LoginRegister/ChildRegister';
import ChildUpdate from '../InfoUpdate/ChildUpdate';
import childService from '../../services/childs';
import userService from '../../services/users';
import PerfilGuard from '../utils/PerfilGuard';
import Ajustes from './Ajustes';
import UserUpdate from '../InfoUpdate/UserUpdate';
import GuardUpdate from '../InfoUpdate/GuardUpdate';
import PerfilUsuario from '../utils/PerfilUsuario';
//Todas las importaciones necesarias


function Home() {
    //Uso el Uselocation para que se pueda cambiar el fondo de la aplicación
    //se envía a través de los Link 
    const location = useLocation();
    const state = location.state;
    // Declaración de variables de estado
    const [user, setUser] = useState(null)
    const [container, setContainer] = useState('container')
    //usamos useEffect para ejecutar tareas secundarias como declarar los token en los services 
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          userService.setToken(user.token)
          childService.setToken(user.token)
        }  
      }, [])

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
                <Route path="/buscar" element={ <Busqueda />} />
                <Route path="/favoritos" element={ <Favoritos /> }  />
                <Route path="/chat" element={ <Chat /> }  />
                <Route path="/child" element={ <Child /> } />
                <Route path="/child/signup" element={ <ChildRegister 
                    modoEdicion={false}
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
                <Link className="nav footer" to="/home/buscar" state={state}>
                    <img src="https://babyguard.vercel.app/img/lupa.svg" alt="" className='icono'/>
                    Buscar
                </Link>
                <Link className="nav footer" to="/home/favoritos" state={state}>
                    <img src="https://babyguard.vercel.app/img/estrella.svg" alt="" className='icono'/>
                    Favoritos
                </Link>
                <Link className="nav footer" to="/home/chat" state={state}>
                    <img src="https://babyguard.vercel.app/img/mensaje.svg" alt="" className='icono'/>
                    Chat
                </Link>
                <Link className="nav footer" to="/home/child" state={state}>
                    <img src="https://babyguard.vercel.app/img/child.svg" alt="" className='icono'/>
                    Niños
                </Link>
                <Link className="nav footer" to="/home/perfil" state={state}>
                    <img src="https://babyguard.vercel.app/img/cuenta.svg" alt="" className='icono'/>
                    Perfil
                </Link>
            </footer>
                

        </div>
        
    );
}

export default Home;