import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Welcome() {
  //Página de bienvenida, acceso a los login, registro y la aplicación

    const [addClass,setAddClass] = useState(false)
    
  //---------------------------------
//Tres botones en escucha de click para esconderse y mostrar información
document.addEventListener('load', function(){
  var slide1 = document.getElementById("slide1")
  var slide2 = document.getElementById("slide2")
  var slide3 = document.getElementById("slide3")
  slide1.addEventListener("click", function(){
      if(slide1.className==="esco"){
          slide1.removeClass('esco')
      }
  })
  slide2.addEventListener("click", function(){
      if(slide1.className===""){
          slide1.addClass('esco')
      }
  })
  slide3.addEventListener("click", function(){
      if(slide1.className===""){
          slide1.addClass('esco')
      }
  })
})

//Función con tiempo para que vaya cambiando el fondo de la página de bienvenida cada 7 segundos
function startTime() {
  switch (document.getElementById("contenedor").classList.value){
    case 'background1':
      document.getElementById("contenedor").classList.value = 'background2'
      break
    case 'background2':
      document.getElementById("contenedor").classList.value = 'background3'
      break
    case 'background3':
      document.getElementById("contenedor").classList.value = 'background1'
      break
  }
  setTimeout(function() {startTime()}, 7000)
}
useEffect(() => {
 startTime() 
}, [])
/*
Incluir Foto Nombre Horario Favorito en la tabla de búsqueda
cambiar nombre Búsqueda por Búsqueda de niñeras (darle enfasis)
Hacer mock-ups de lo que hace la app ej:
Vas a Registro-> registra-> envia a nueva página
*/

return (
  <main className='container'>
    <section className='background1'  id="contenedor">
      <div className="flexea column notcenter">
        <header className="welcome flexea rowreverse">
          <h2 className='inicio-sesion '>
            <Link to="/login" className='flexea atras blanco'>
              Inicio Sesión
            </Link>
          </h2>
        </header>
        <section className='flexea columncenter'>
          <div className='col-10'>
            <div className="flexea supercentertext">
              <img src="https://babyguard.vercel.app/img/Logo.png" alt="" className='reloj sinredondeado' />
              <h1 className='titulo'>BabyGuard</h1>
            </div>
          </div>
        </section>
        <section className='flexea columncenter'>
          <div className='botones'>
            <ul className='slider'>
              <li id="slide1" className={`col-10 ${addClass? 'esco':null}`}   >
                <h3  >¡NUEVA APP PARA EL CUIDADO DE TUS HIJOS!</h3>
                <p>Babyguard es una App nueva para contratar niñeras en cualquier momento. Ofrecemos el mejor cuidado solo a profesionales. Dejanos el cuidado de tus hijos.</p>
              </li>
              <li id="slide2" className="col-10">
                <h3  >Es una app Customizable</h3>
                <p>Puedes ir a Ajustes en el perfil y podrás escojer entre vários fondos para la aplicación</p>
              </li>
              <li id="slide3" className="col-10">
                <h3  >Podrás estar en contacto</h3>
                <p>La app permite que puedas hablar con cualquier niñera pinchando en su nombre y dandole al botón de mensaje. Mantente conectado con los cuidadores.</p>
              </li>
            </ul>
            <ul className="menu">
              <li>
                <a href="#slide1" id="aslide1" onClick={()=> setAddClass(false)}></a>
              </li>
              <li>
                <a href="#slide2" id="aslide2" onClick={()=> setAddClass(true)}></a>
              </li>
              <li>
                <a href="#slide3" id="aslide3" onClick={()=> setAddClass(true)}></a>
              </li>
            </ul>
              
          </div>
        </section>
        <section className='flexea columncenter'>
          <div className='botones flexea column'>

            <Link to="/home/buscar">
              <button className='botonw encuentra'>Encuentra niñeras</button>
            </Link>

            <Link to="/register">
              <button className='botonw registro'>Regístrate</button>
            </Link>
            
          </div>
        </section>
      </div>

    </section>
    <audio autoPlay loop preload="metadata" >
      <source src="../img/welcome-music.mp3" type="audio/mpeg" /> 
      <source src="../img/welcome-music.ogg" type="audio/ogg" /> 
      <source src="../img/welcome-music.opus"  />
    </audio>
    
  </main>
      
);

}

export default Welcome;

