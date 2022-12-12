import React, { useEffect, useState } from 'react';
import {  Link, useLocation } from "react-router-dom";
import solicitudesService from '../../services/solicitudes';


const Solicitud = ({ solicitud, rechazarSolicitud, aceptarSolicitud }) => {
    const location = useLocation();
    const state = location.state;
    const newmode = window.localStorage.getItem('newmode')
    
    const [cerrado, setCerrado] = useState(true)

  return (
    
    <div className='cuidador'>
        <div className="flexea roww negro" state={state}>
            <nav>
                <div>
                    <Link to={"/home/buscar/user/"+solicitud.user.id}
                        params={{ userid:solicitud.user.id }}
                        state={state}
                        className="flexea roww negro"
                        >
                        <div className='foto'>
                            {
                            newmode?<img src="../img/pepe-clown.gif" className='fotoestandar' alt="" /> :
                            <img src={"https://babyguard.onrender.com/api/img/public/"+solicitud.user.imgUrl} className='fotoestandar' alt="" />
                            }
                        </div>
                    </Link>
                    <div>
                        <div className='nombreval flexea column'>
        
                            <h3>{solicitud.user.name}</h3>
                            
                        </div>
                    </div>
                
                </div>
            </nav>
        
            <div className='horadisp flexea column pointer'onClick={aceptarSolicitud}>
                <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="reloj pequenio" alt="" />
                <h3>Aceptar</h3>
            </div>
            <div className='horadisp flexea column pointer'onClick={rechazarSolicitud}>
                <img src="https://babyguard.vercel.app/img/Red_x.svg" className="reloj pequenio" alt="" />
                
                <h3>Rechazar</h3>
            </div>
            <span className='sol'>
                {cerrado?<img src="../img/filtro-abierto.png" alt="" className='filter abierto' onClick={() => setCerrado(!cerrado)} />:<img src="../img/filtro-cerrado.png" alt="" className='filter cerrado' onClick={() => setCerrado(!cerrado)} />} 
            </span>
        </div>
        <div className={cerrado?"flexea roww negro nomuestra":"flexea roww negro muestra"}>
            <p>Hora de Inicio: {solicitud.horarioinicio}</p>
            <p>Hora de Fin: {solicitud.horariofin}</p>
            {
                solicitud.colegio?
                <p> <span>Colegio: {solicitud.institucion}</span> <span>Calle: {solicitud.calle}</span> </p>
                
                :
                <p>Casa: {solicitud.calle}</p>
                
            }
            
        
        </div>
    </div>
    
  )
}


export default Solicitud