import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import guardService from '../../services/guards';
import userService from '../../services/users';
import solicitudesService from '../../services/solicitudes';
import Solicitud from '../utils/Solicitud';

const Solicitudes = ({}) =>{

    const loggGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    const guardian = JSON.parse(loggGuardJSON)

    const [Id, setId] = useState("")
    const [solicitudes, setSolicitudes] = useState([])

    
    useEffect(() => {
        
        solicitudesService
            .getSolicitudes(guardian.id)
            .then(res => {
                setSolicitudes(res)
            })
        setId(guardian.id)
    },[])

    console.log(solicitudes)
    const rechazarSolicitud = async (idSolicitud, userid,) => {
        console.log(solicitudes)
        solicitudesService
            .putSolicitudes(idSolicitud, false, userid, guardian.id)
            .then(res => {
                console.log(res)
            })
        await solicitudesService
            .deleteSolicitudes(userid)
            .then(res => {
                console.log(res)
            })
        solicitudesService
            .getSolicitudes(Id)
            .then(response => {
                console.log(response)
                setSolicitudes(response)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
    }
    const aceptarSolicitud = async (idSolicitud, userid) => {
        solicitudesService
            .putSolicitudes(idSolicitud, true, userid, guardian.id)
            .then(response => {
                setSolicitudes(response)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })

    }
    
    return(
        <section className="home">
            <header className='titulo main'>
                <h2>Solicitudes</h2>
            </header>
            <section className='buscador'>
            </section>
            <section className='flexea column'>
                {
                
                <div className='col-10 column listado'>
                    {
                    
                    solicitudes.map((solicit, i) => 
                        solicit.aprobado? null:
                        <Solicitud
                            key={i}
                            solicitud={solicit}
                            rechazarSolicitud = {()=>rechazarSolicitud(solicit.id, solicit.user.id)}
                            aceptarSolicitud = {()=>aceptarSolicitud(solicit.id, solicit.user.id)}
                        />)
                    }
                </div>
                
                }
            </section>
        </section>
    )
}

export default Solicitudes