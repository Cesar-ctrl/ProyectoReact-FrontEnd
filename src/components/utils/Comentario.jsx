import React, { useState, useEffect } from 'react';
import commentService from '../../services/comments';
import {  Link, useLocation } from "react-router-dom";
import Star from './Star';
import StaticStar  from './StaticStar';



const Comentario = ({ comments }) => {
    const location = useLocation();
    const state = location.state;
    const newmode = window.localStorage.getItem('newmode')

    console.log(comments.valoracion)

  return (
    <section>
        <header className='flexea perfil comentario'>
            <div className='flexea perfil'>
                <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+comments.autor.imgUrl} alt="" className='fotocomentario '/>
                <h3>{comments.autor.name} {comments.autor.surnames}</h3>
            </div>
            <div className='flexea perfil'>
                {
                    <StaticStar 
                        value={comments.valoracion}
                    />
                }
            </div>
        </header>
        <article>
            {comments.contenido}
        </article>
    </section>
    
  )
}


export default Comentario