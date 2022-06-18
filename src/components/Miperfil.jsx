import React, { useState } from "react";
import { useNavigate,  Link, useLocation } from "react-router-dom";
import userService from '../services/users';

const Miperfil = () => {
    const location = useLocation();
    const state = location.state;
    var loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    var usuario = JSON.parse(loggUserJSON)
    var loggGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    var guard = JSON.parse(loggGuardJSON)

    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(null)
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null)
        userService.setToken(null)
        window.localStorage.removeItem('loggedNoteAppUser')
        window.localStorage.removeItem('loggedNoteAppGuard')
        setLoggedIn(false)
        navigate("/welcome", { replace: true });
      }
    return (
        
        <section className="home busqueda">
        <header className='titulo main'>
            <h2>Perfil</h2>
        </header>
        <section className='buscador'>
            <div className='barra'>
                
            </div>
            <div className='filtros'>

            </div>
        </section>

        <div className='cuidador flexea'>
            
            { usuario? 
            <Link  to="/home/perfil/personal" className="flexea color" state={state}>
                <div className='foto'>
                    <img src="../img/cuenta.svg" className='fotoestandar' alt="" />
                </div>
                <div className='nombreval flexea centertext'>
                    <h3>Información personal</h3>
                </div>
            </Link> :
            guard?
                <Link  to="/home/perfil/guardpersonal" className="flexea color" state={state}>
                    <div className='foto'>
                        <img src="../img/cuenta.svg" className='fotoestandar' alt="" />
                    </div>
                    <div className='nombreval flexea centertext'>
                        <h3>Información personal</h3>
                    </div>
                </Link> 
                :
                alert('No has iniciado sesión')
            } 
        </div>
        <div className='cuidador flexea'>
            <Link to="/home/perfil/ajustes" className="flexea color" state={state}>
                <div className='foto'>
                    <img src="../img/settings.svg" className='fotoestandar' alt="" />
                </div>
                <div className='nombreval flexea centertext'>
                    <h3>Ajustes</h3>
                </div>
            </Link>
        </div>
        <div className='cuidador flexea'>
            <div className='foto'>
                <img src="../img/info.svg" className='fotoestandar' alt="" />
            </div>
            <div className='nombreval flexea centertext'>
                <h3>Terminos y condiciones de uso</h3>
            </div>
        </div>
        <div className='cuidador flexea'>
            <div className='foto'>
                <img src="../img/info.svg" className='fotoestandar' alt="" />
            </div>
            <div className='nombreval flexea centertext'>
                <h3>Acerca de</h3>
            </div>
        </div>

        <div className='cuidador flexea'>
                <div className='foto'>
                    <img src="../img/logout.svg" className='fotoestandar' alt="" />
                </div>
                <div className='nombreval flexea centertext'onClick={handleLogout} >
                    {
                        usuario?
                            <h3>Cerrar sesión</h3>
                            : guard?
                            <h3>Cerrar sesión</h3>
                            :
                            <h3>Volver al Registro</h3>
                    }
                </div>
        </div>


      </section>
    )
}
export default Miperfil