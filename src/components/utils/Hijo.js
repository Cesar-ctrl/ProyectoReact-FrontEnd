import React from 'react'
import { useNavigate,  Link } from "react-router-dom";

const Hijo = ({ child }) => {
  return (
    <Link to={'/home/child/change/'+child.id}>
      <div className= 'cuidador flexea roww' >
          <div className='foto'>
              <img src={"https://damp-temple-29994.herokuapp.com/api/img/public/"+child.imgUrl} className='fotoestandar' alt="" />
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