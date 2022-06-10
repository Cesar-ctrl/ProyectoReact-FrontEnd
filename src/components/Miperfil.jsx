import React, { useState, useEffect } from "react";
import userService from '../services/users'
import Hijo from '../components2/Hijo'
import { useNavigate,  Link } from "react-router-dom";
import noteService from '../services/notes'

const Miperfil = () => {

    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(null)
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null)
        noteService.setToken(null)
        window.localStorage.removeItem('loggedNoteAppUser')
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
            <div className='foto'>
                <img src="../img/cuenta.svg" className='fotoestandar' alt="" />
            </div>
            <div className='nombreval flexea centertext'>
                <h3>Información personal</h3>
            </div>
        </div>
        <div className='cuidador flexea'>
            <Link to="/home/perfil/ajustes" className="flexea color">
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
                    <h3>Cerrar sesión</h3>
                </div>
        </div>


      </section>
    )
}
export default Miperfil