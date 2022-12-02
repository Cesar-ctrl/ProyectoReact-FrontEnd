import React from 'react'
import {  Link, useLocation } from "react-router-dom";

const Hijo = ({ child }) => {

  const location = useLocation();
  const state = location.state;

  return (
    <Link to={'/home/child/change/'+child.id} state={state}>
      <div className= 'cuidador flexea roww' >
          <div className='foto'>
              <img src={"https://babyguard.onrender.com/api/img/public/"+child.imgUrl} className='fotoestandar' alt="" />
          </div>
          
          <div>
              <div className='nombreval flexea column'>
                  <h3>{child.name} {child.surnames}</h3>
                  <div className="flexea roww">
                  </div>
              </div>
          </div>
      </div>
    </Link>
  )
}


export default Hijo