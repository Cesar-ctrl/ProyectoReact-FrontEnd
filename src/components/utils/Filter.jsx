import React from 'react'
import { Link } from "react-router-dom";

const Filter = () => {

  return (

    <div className='cuidador flexea roww' >
        <hr/>
        <section className='titulo'>
            <p className='cabezera'>
                Inicia sesión para añadir o ver a tus cuidadores favoritos o para ver la información de los niños/as
            </p>
            <Link to='/login'>
                <button className='col-12 redirect encuentra'>Iniciar Sesión</button>
            </Link>
            <p className='pie'>
                ¿Aún no tienes cuenta? <Link to='/register'>Regístrate</Link>
            </p>
        </section>

    </div>
  )
}

export default Filter