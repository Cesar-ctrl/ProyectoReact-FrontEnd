import React, { useState, useEffect } from 'react';
import commentService from '../../services/comments';
import {  Link, useLocation } from "react-router-dom";
import Star from './Star';
import {StaticStar, StarIcon}  from './StaticStar';



const Puntuacion = ({ comments, lengt }) => {
    const location = useLocation();
    const state = location.state;
    const newmode = window.localStorage.getItem('newmode')

    var un = 0;
    var dos = 0;
    var tre = 0;
    var cua = 0;
    var cin = 0;
    var total = 0;
    

    comments.map((comment, i) => {//Buscar en comments
        total += comment.valoracion
        switch (comment.valoracion) {
            case 1:
                un+=1
            break
            case 2:
                dos+=1
            break
            case 3:
                tre+=1
            break
            case 4:
                cua+=1
            break
            case 5:
                cin+=1
            break
        }
    })


  return (

    <div className='flexea roww evenly'>
        <div>
            <h5 className='media'>{total?Math.round(total/lengt*10)/10:0}</h5>
            {<StaticStar value={Math.round(total?total/lengt:'none')} />}
        </div>
        <div className='col-12'>
            <div className='flexea perfil'>
                <h3>5</h3>
                <div className="progress">
                    <div className="progress-bar" 
                        style={{
                            width: (cin*100/lengt)+"%"
                        }} 
                    >
                    </div>

                </div>
            </div>
            <div className='flexea perfil'>
                <h3>4</h3>
                <div className="progress">
                    <div className="progress-bar" 
                        style={{
                            width: (cua*100/lengt)+"%"
                        }} 
                    >
                    </div>

                </div>
            </div><div className='flexea perfil'>
                <h3>3</h3>
                <div className="progress">
                    <div className="progress-bar" 
                        style={{
                            width: (tre*100/lengt)+"%"
                        }} 
                    >
                    </div>

                </div>
            </div><div className='flexea perfil'>
                <h3>2</h3>
                <div className="progress">
                    <div className="progress-bar" 
                        style={{
                            width: (dos*100/lengt)+"%"
                        }} 
                    >
                    </div>
                </div>
            </div><div className='flexea perfil'>
                <h3>1</h3>
                <div className="progress">
                    <div className="progress-bar" 
                        style={{
                            width: (un*100/lengt)+"%"
                        }} 
                    >
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
  )
}


export default Puntuacion