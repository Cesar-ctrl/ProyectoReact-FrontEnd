import React from 'react'
import Star from '../components/Star'
import { useNavigate,  Link, useLocation } from "react-router-dom";

const Guard = ({ guard, toggleFav }) => {
    const location = useLocation();
    const state = location.state;
    const label = guard.disponible
    ? 'Guardar Favorito'
    : '';
    const newmode = window.localStorage.getItem('newmode')

  return (
    
    <div className={guard.disponible ? 'cuidador flexea roww' : 'cuidador flexea roww indispuesto'}>
        <div className='foto'>
            {
                newmode?<img src="../img/pepe-clown.gif" className='fotoestandar' alt="" /> :
                <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+guard.imgUrl} className='fotoestandar' alt="" />
            }
            
        </div>
        
        <div>
            <div className='nombreval flexea column'>
            <Link to={"/home/buscar/guard/"+guard.id}
            guardid={guard.id}
            state={state}
            >
                <h3>{guard.name} {guard.surnames}</h3>
            </Link>
                <div className="flexea roww">
                    {<Star />}

                    <h3>4.8</h3>
                </div>
            </div>
        </div>
        <div className='horadisp flexea column'>
            <img src="../img/reloj-pequenio.png" className="reloj pequenio" alt="" />
            <h3>{guard.horarioinicio}-{guard.horariofin}</h3>
        </div>
        <button onClick={toggleFav}>{label}</button>
    </div>
    
  )
}


export default Guard