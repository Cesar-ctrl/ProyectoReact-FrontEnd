import React from "react";
import Star from './Star'
import {  Notification } from './Staricon'

const Chat = () => {
    const newmode = window.localStorage.getItem('newmode')
    return (
        <section className="home">
            <header className='titulo main'>

                <h2>Mensajes</h2>
            </header>
            <section className='buscador'>
                <div className='barra'>
                    
                    <input type="text" className='barra col-8' />
                    <div className='imgbuscar'>
                        <img src="../img/lupa-busqueda.png" alt="" className='lupa'/>
                    </div>
                    
                </div>
                <div className='filtros'>

                </div>
            </section>
            <section className='flexea column'>
                <div className='col-10 column listado'>
                    <div className='cuidador flexea roww'>
                        <div className='foto'>
                            {
                            newmode?<img src="../img/pepe-clown.gif" className='fotoestandar' alt="" /> :
                            <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
                            }
                        </div>
                        <div>
                            <div className='nombreval flexea column'>
                                <h3>NOMBRE APELLIDO</h3>
                            </div>
                        </div>
                        <div className='flexea column'>
                            {<Notification />}
                            <h3>18:00</h3>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
export default Chat