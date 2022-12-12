import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import userService from '../../services/users';
import solicitudesService from '../../services/solicitudes';

const Contrato = (props) => {
    const { ouser, aprobado, acabado, ninios, contrato, guard } = props

    const [user, setUser] = useState([]) 
    const [contratado, setContratado] = useState(acabado)
    const [cerrado, setCerrado] = useState(true)
    
    useEffect(() => {
        userService
            .getUser(ouser)
            .then(initialGuards => {
                setUser(initialGuards)
            })
    }, [])

    const cerrarSolicitud = async () => {
        solicitudesService
            .putEndSolicitud(contrato, true, guard)
            .then(response => {
                setContratado(true)
            })
            .catch(error => {
            setTimeout(() => {
            }, 5000)   
            })
    }
    
    const listaalergenos = [
        {
            name:"Gluten",
            id:1
        },
        {
            name:"Crustáceos",
            id:2
        },
        {
            name:"Huevos",
            id:3
        },
        {
            name:"Pescado",
            id:4
        },
        {
            name:"Cacahuetes",
            id:5
        },
        {
            name:"Soja",
            id:6
        },
        {
            name:"Lacteos",
            id:7
        },
        {
            name:"Frutos con cáscara",
            id:8
        },
        {
            name:"Apio",
            id:9
        },
        {
            name:"Mostaza",
            id:10
        },
        {
            name:"Sésamo",
            id:11
        },
        {
            name:"Sulfitos",
            id:12
        },
        {
            name:"Altramuces",
            id:13
        },
        {
            name:"Moluscos",
            id:14
        }
    ]

    var arr = []

    if(user.hijos){
        
        user.hijos.map((child, i) =>{
            if(ninios.includes(child.id)){
                arr.push(child)
            }
        })
    }
    
  return (
    <section className="">
        <header className='titulo main flexea perfil'>
            <div className='foto'>
                <img src={"https://babyguard.onrender.com/api/img/public/"+user.imgUrl} className='reloj' alt="" />
            </div>
            <h2>{user.name} {user.surnames}</h2>
        </header>
        <section className={cerrado?'flexea column noacabado':'flexea column acabado'}>
            <span>
                
            <h3>{acabado?'Contrato Finalizado':'Contrato Actual'}</h3>
            {cerrado?<img src="../img/filtro-abierto.png" alt="" className='filter abierto' onClick={() => setCerrado(!cerrado)} />:<img src="../img/filtro-cerrado.png" alt="" className='filter cerrado' onClick={() => setCerrado(!cerrado)} />} 
            </span>
            <div className='col-10 column listado deperfil contratos'>
                <div className='cuidador flexea column notcenter'>
                    <p>Nombre: {user.name}</p>
                    <p>Apellidos: {user.surnames}</p>
                    <p>Teléfono: {user.phone}</p>
                    <p>Correo: {user.email}</p>
                    <p>Foto: </p>
                    <img src={"https://babyguard.onrender.com/api/img/public/"+user.imgUrl} className='reloj grande' alt="" />
                </div>
                <h3 className='br'>Hijos que cuidar:</h3>
                <div className='cuidador flexea column notcenter'>
                    {
                        user.hijos?
                        arr.map((child, i) =>
                            <div className='cuidador flexea column notcenter'>
                                <p>Nombre: {child.name}</p>
                                <p>Apellidos: {child.surnames}</p>
                                <p>Edad: {child.edad}</p>
                                <p>DNI: {child.DNI}</p>
                                <p>Alergenos:</p>
                                {child.alergenos.map(({ name, id }, index) => {
                                return (
                                    <li key={index}>
                                    <div className="flexea centertext">
                                        {child.alergenos[index]?
                                            <img src="https://babyguard.vercel.app/img/Light_green_check.svg" className="dias" alt="" />
                                            :<img src="https://babyguard.vercel.app/img/Red_x.svg" className="dias" alt="" />
                                        }

                                        <label htmlFor={`custom-checkbox-${index}`}>{listaalergenos[index].name}</label>
                                    </div>
                                    </li>
                                );
                                })}
                                {
                                    child.necesidadesesp?
                                    <p>Necesidades especiales: {child.necesidadesesp}</p>
                                    :console.log('Sin necesidades especiales')
                                }
                                
                                <p>Foto: </p>
                                <img src={"https://babyguard.onrender.com/api/img/public/"+child.imgUrl} className='reloj grande' alt="" />
                            </div>
                           
                        
                        )
                        :
                        <div className='cuidador flexea column notcenter'>
                            <p>No tiene historial de contratos</p>
                        </div>
                    }
                    {
                        contratado? null:
                        <button onClick={() => cerrarSolicitud()} className={'boton-azul blanco'} >Cerrar contrato</button>
                    }
                </div>
            
            </div>
        </section>
        
    </section>
  )
}

export default Contrato