import React, { useState, useEffect } from 'react'
import guardService from '../services/guards'
import userService from '../services/users'
import Star from '../components/Star'
import { useNavigate, Link, useParams } from "react-router-dom";

const PerfilUser = (props) => {
    const params = useParams();
    const usuario = params.userid;

    const [user, setUser] = useState([]) 
    const [Id, setId] = useState("")
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [horariofin, setHorariofin] = useState('')
    const [horarioinicio, setHorarioinicio] = useState('')
    const navigate = useNavigate();
    console.log(usuario)
    useEffect(() => {
        userService
          .getUser(usuario)
          .then(initialGuards => {
            setUser(initialGuards)
          })
      }, [])

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
                            <p>Alergenos: {child.alergenos}</p>
                            {
                                child.necesidadesesp?
                                <p>Necesidades especiales: {child.necesidadesesp}</p>
                                :console.log('Sin necesidades especiales')
                            }
                            
                            <p>Foto: </p>
                            <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+user.imgUrl} className='reloj grande' alt="" />
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