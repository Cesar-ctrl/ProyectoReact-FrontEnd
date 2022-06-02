import React from 'react'
import Star from '../components/Star'

const Guard = ({ guard, toggleDisponible }) => {
    const label = guard.disponible
    ? 'make not disponible'
    : 'make disponible';

  return (

    <div className={guard.disponible ? 'cuidador flexea roww' : 'cuidador flexea roww indispuesto'}>
        <div className='foto'>
            <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
        </div>
        
        <div>
            <div className='nombreval flexea column'>
                <h3>{guard.name}{guard.surnames}</h3>
                <div className="flexea roww">
                    {<Star />}

                    <h3>4.8</h3>
                </div>
            </div>
        </div>
        <div className='horadisp flexea column'>
            <img src="../img/reloj-pequenio.png" className="reloj pequenio" alt="" />
            <h3>12:00-18:00</h3>
        </div>
        <button onClick={toggleDisponible}>{label}</button>
    </div>
  )
}

const FavGuard = ({ guard, toggleDisponible }) => {
    const label = guard.disponible
    ? 'make not disponible'
    : 'make disponible';

  return (

    <div className={guard.disponible ? 'cuidador flexea roww' : 'cuidador flexea roww indispuesto'}>
        <div className='foto'>
            <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
        </div>
        
        <div>
            <div className='nombreval flexea column'>
                <h3>{guard.name}{guard.surnames}</h3>
                <div className="flexea roww">
                    {<Star />}

                    <h3>4.8</h3>
                </div>
            </div>
        </div>
        <div className='horadisp flexea column'>
            <img src="../img/reloj-pequenio.png" className="reloj pequenio" alt="" />
            <h3>12:00-18:00</h3>
        </div>
        <button onClick={toggleDisponible}>{label}</button>
    </div>
  )
}


export default Guard