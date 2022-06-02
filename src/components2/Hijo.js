import React from 'react'

const Hijo = ({ child }) => {

  return (

    <div className= 'cuidador flexea roww' >
        <div className='foto'>
            <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
        </div>
        
        <div>
            <div className='nombreval flexea column'>
                <h3>{child.name}{child.surnames}</h3>
                <div className="flexea roww">
                </div>
            </div>
        </div>
    
    </div>
  )
}


export default Hijo