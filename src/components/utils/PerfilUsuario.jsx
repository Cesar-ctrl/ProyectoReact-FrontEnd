import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import userService from '../../services/users';

const PerfilUser = (props) => {
    const params = useParams();
    const usuario = params.userid;

    const [user, setUser] = useState([]) 

    console.log(usuario)
    useEffect(() => {
        userService
          .getUser(usuario)
          .then(initialGuards => {
            setUser(initialGuards)
          })
      }, [])
    
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
    console.log(user)
  return (
    <section className="home">
        <header className='titulo main flexea perfil'>
            <div className='foto'>
                <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+user.imgUrl} className='reloj' alt="" />
            </div>
            <h2>{user.name} {user.surnames}</h2>
        </header>
        <section className='flexea column'>
            <div className='col-10 column listado deperfil'>
                <h3>Ficha:</h3>
                <div className='cuidador flexea column notcenter'>
                    <p>Nombre: {user.name}</p>
                    <p>Apellidos: {user.surnames}</p>
                    <p>Teléfono: {user.phone}</p>
                    <p>Correo: {user.email}</p>
                    <p>Foto: </p>
                    <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+user.imgUrl} className='reloj grande' alt="" />
                </div>
                <br />
                <h3>Hijos:</h3>
                <div className='cuidador flexea column notcenter'>
                    {
                        user.hijos?
                        user.hijos.map((child, i) =>
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
                            <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+child.imgUrl} className='reloj grande' alt="" />
                        </div>
                        )
                        :
                        <div className='cuidador flexea column notcenter'>
                            <p>No tiene hijos dados de alta</p>
                        </div>
                    }
                </div>
            
            </div>
        </section>
        
    </section>
  )
}

export default PerfilUser