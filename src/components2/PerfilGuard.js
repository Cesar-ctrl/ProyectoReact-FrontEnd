import React, { useState, useEffect } from 'react'
import guardService from '../services/guards'
import Star from '../components/Star'


const PerfilGuard = ({ ...props }) => {

    const loggUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    const user = JSON.parse(loggUserJSON)
    const [guard, setGuards] = useState([]) 
    const [Id, setId] = useState("")
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')

    useEffect(() => {

        setId(props.guardid)
        guardService.setToken(user.token)
        guardService.getGuard(props.guardid)
            .then(initialGuards => {
                setGuards(initialGuards)
            })
        setName(guard.name)
        setSurnames(guard.surnames)
        
    }, [])

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
        <button ></button>
    </div>
  )
}

export default PerfilGuard