import React, { useState, useEffect } from 'react'
import StarIcon from './Staricon'
import RatingIcon from './Rating'
 

const Busqueda = () => {
    const [rating, setRating] = React.useState(0);
    const [hoverRating, setHoverRating] = React.useState(0);
    const onMouseEnter = (index) => {
        setHoverRating(index);
    };
    const onMouseLeave = () => {
        setHoverRating(0);
    };
    const onSaveRating = (index) => {
        setRating(index);
    };
    return (
      <section className="busqueda ">
        <header className='titulo main'>

            <h2>Búsqueda</h2>

        </header>
        <section className='buscador'>
            <div className='barra'>
                
                <input type="text" className='barra col-8' />
                <div className='imgbuscar'>
                    <img src="../img/lupa-busqueda.png" alt="" className='lupa'/>
                </div>
                
            </div>
            <div className='filtros'>

            </div>
        </section>
        <section className='flexea column'>
            <div className='col-10 column listado'>
                <div className='cuidador flexea'>
                    <div className='foto'>
                        <img src="../img/Prueba2.jpg" className='fotoestandar' alt="" />
                    </div>
                    <div className='nombreval flexea'>
                        <h3></h3>
                        <div className="box flex">
                            {[1, 2, 3, 4, 5].map((index) => {
                                return (
                                <RatingIcon 
                                    index={index} 
                                    rating={rating} 
                                    hoverRating={hoverRating} 
                                    onMouseEnter={onMouseEnter} 
                                    onMouseLeave={onMouseLeave} 
                                    onSaveRating={onSaveRating} />
                                )
                            })}
                        </div>
                    </div>
                    <div className='horadisp'></div>
                </div>
            </div>
        </section>

      </section>
    )
  }
  
  export default Busqueda