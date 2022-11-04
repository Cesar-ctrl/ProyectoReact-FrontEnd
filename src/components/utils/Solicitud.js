import React, { useEffect, useState } from 'react';
import {  Link, useLocation } from "react-router-dom";
import solicitudesService from '../../services/solicitudes';


const Solicitud = ({ solicitud, rechazarSolicitud, aceptarSolicitud }) => {
    const location = useLocation();
    const state = location.state;
    const newmode = window.localStorage.getItem('newmode')
    

  return (
    
    <div className='cuidador'>
        <div className="flexea roww negro" state={state}>
            <div className='foto'>

                {
                    newmode?<img src="../img/pepe-clown.gif" className='fotoestandar' alt="" /> :
                    <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+solicitud.user.imgUrl} className='fotoestandar' alt="" />
                }
                
            </div>
            
            <div>
                <div className='nombreval flexea column'>
   
                    <h3>{solicitud.user.name}</h3>
                    
                </div>
            </div>
            <div className='horadisp flexea column'onClick={aceptarSolicitud}>
                <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="reloj pequenio" alt="" />
                <h3>Aceptar</h3>
            </div>
            <div className='horadisp flexea column'onClick={rechazarSolicitud}>
                <img src="https://babyguard.vercel.app/img/Red_x.svg" className="reloj pequenio" alt="" />
                
                <h3>Rechazar</h3>
            </div>
        </div>
    </div>
    
  )
}


export default Solicitud