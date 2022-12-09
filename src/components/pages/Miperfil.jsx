import React, { useState } from "react";
import { useNavigate,  Link, useLocation } from "react-router-dom";
import userService from '../../services/users';

const Miperfil = () => {
    const location = useLocation();
    const state = location.state;
    var loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    var usuario = JSON.parse(loggedUserJSON)
    var loggGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    var guard = JSON.parse(loggGuardJSON)

    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(null)
    const navigate = useNavigate();
    //Evento para cerrar la sesión y borrar todo lo guardado en el localstorage
    const handleLogout = () => {
        setUser(null)
        userService.setToken(null)
        window.localStorage.removeItem('loggedNoteAppUser')
        window.localStorage.removeItem('loggedNoteAppGuard')
        setLoggedIn(false)
        navigate("/welcome", { replace: true });
      }
    //if(!(loggedUserJSON)&&!(loggGuardJSON)){
    //    alert('No has iniciado sesión')
    //}
    return (
        <section className="home busqueda">
            <header className='titulo main'>
                <h2>Perfil</h2>
            </header>

            <section className="perfil">
                    
                { usuario? 
                <Link  to="/home/perfil/personal" className="flexea color centertext" state={state}>
                    <img src="../img/cuenta.svg" className='fotoestandar' alt="" />
                    <h3>Información personal</h3>
                </Link> : null
                }
                {
                guard?
                    <Link  to="/home/perfil/guardpersonal" className="flexea color centertext" state={state}>
                        <img src="../img/cuenta.svg" className='fotoestandar' alt="" />
                        <h3>Información personal</h3>
                    </Link> 
                    : null
                } 
                
                <Link to="/home/perfil/ajustes" className="flexea color centertext" state={state}>                     
                    <img src="../img/settings.svg" className='fotoestandar' alt="" /> 
                    <h3>Ajustes</h3>                   
                </Link>

                <a className='flexea color centertext'>                  
                    <img src="../img/info.svg" className='fotoestandar' alt="" />
                    <h3>Terminos y condiciones de uso</h3>              
                </a>

                <a className='flexea color centertext'>
                    <img src="../img/info.svg" className='fotoestandar' alt="" />               
                    <h3>Acerca de</h3>                  
                </a>

                <div className='flexea color centertext salir' onClick={handleLogout} >                       
                    <img src="../img/logout.svg" className='fotoestandar' alt="" />
                    {
                    usuario?
                        <h3>Cerrar sesión</h3>
                        : guard?
                        <h3>Cerrar sesión</h3>
                        :
                        <h3>Volver al Registro</h3>
                    }
                        
                </div>
            </section>

        </section>
    )
}
export default Miperfil