import React, { useState, useRef } from "react";
import {  Link, useLocation } from "react-router-dom";

const Ajustes = (props) => {
    const location = useLocation();
    const state = location.state;
    const [backgr, setBackgr] = useState('background1')
    const myContainer = useRef(null);
    const  back1 = useRef(null);
    const  back2 = useRef(null);
    const  back3 = useRef(null);

    
    const changeBack1 = () => {
        setBackgr('background1')
    }
    const changeBack2 = () => {
        setBackgr('background2')
    }
    const changeBack3 = () => {
        setBackgr('background3')
    }


    return (
        
        <section className={'home container '+ backgr} ref={myContainer}>
        <header className='titulo main'>
            <h2>Ajustes</h2>
        </header>
        <section className='buscador'>
            <div className='barra'>
                
            </div>
            <div className='filtros'>

            </div>
        </section>
        <div className='cuidador flexea'>
            <div className='foto'>
                
            </div>
            <div className='nombreval flexea centertext'>
                <h3>Elije un Fondo</h3>
            </div>
        </div>
        <div className='col-12 column listado'>

            <div className='cuidador flexea roww evenly'>
                <div className='superfoto' onClick={changeBack3} ref={back2} id="background2">
                    <img src="../../static/media/backgraund3-tablet.157ff688cc985b7f6c84.jpg" className="superfoto" alt="" />
                </div>
                <div className='superfoto' onClick={changeBack1} ref={back1} id="background1">
                    <img src="../../static/media/backgraund-mobile.8cdae8c82b95024a484f.jpg" className="superfoto" alt="" />
                </div>
                <div className='superfoto' onClick={changeBack2} ref={back3} id="background3">
                    <img src="../../static/media/backgraund2-tablet.83d9d47e0dc5598b8bf9.png" className="superfoto" alt="" />
                </div>
                
            </div>
            <div className='cuidador flexea'>
                <Link to="/home" state={backgr} >
                    Guardar
                </Link>
            </div>
        </div>
        
        


      </section>
    )
}
export default Ajustes