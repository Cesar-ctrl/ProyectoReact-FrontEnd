import React, { useEffect, useState } from 'react';
import {  Link, useLocation } from "react-router-dom";
import StaticStar from './StaticStar';
import commentService from '../../services/comments';

const Guard = ({ favs, guard, toggleFav }) => {
    const location = useLocation();
    const state = location.state;
    const resultado = favs.find(cuidador=> cuidador == guard.id)
        ? <div className='cursor-pointer'><svg className="w-7 h-7" fill="#3ed400" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></div>
        : <div className='cursor-pointer'><svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></div>
    const newmode = window.localStorage.getItem('newmode')

    const [val, setVal] = useState([])

    useEffect(() => { 
        commentService.recieveValRoute(guard.id)
            .then(point => {
                setVal(point)
            })
    }, [])
    var total = 0
    var lengt = 0
    if(val){
        val.map((comment, i) =>
            total += comment.valoracion
        )
        lengt = val.length
    }

  return (
    
    <div className={guard.disponible ? 'cuidador flexea roww' : 'cuidador flexea roww indispuesto'}>
        <Link to={"/home/buscar/guard/"+guard.id}
                state={state}
                className="flexea roww negro"
                >
            <div className='foto'>
                
                {
                    newmode?<img src="../img/pepe-clown.gif" className='fotoestandar' alt="" /> :
                    <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+guard.imgUrl} className='fotoestandar' alt="" />
                }
                
            </div>
            
            <div>
                <div className='nombreval flexea column'>
                    
                    <h3>{guard.name}</h3>
                    
                    <div className="flexea roww">
                        {<StaticStar value={total?Math.round(total/lengt):'none'} />}

                        <h3>{total?Math.round(total/lengt*10)/10:0}</h3>
                    </div>
                </div>
            </div>
            <div className='horadisp flexea column'>
                <img src="../img/reloj-pequenio.png" className="reloj pequenio" alt="" />
                <h3>{guard.horarioinicio}-{guard.horariofin}</h3>
            </div>
        </Link>
        <div className='box flex' onClick={toggleFav}>{resultado}</div>
    </div>
    
  )
}


export default Guard