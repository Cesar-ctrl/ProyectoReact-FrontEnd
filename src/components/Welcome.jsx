import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Welcome() {

    const [addClass,setAddClass] = useState(false)
    
  //---------------------------------

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


return (
  <main className='container'>
    <section className='background1'  id="contenedor">
      <div className="flexea column notcenter">
        <header className="header welcome">
          <div className="floatright"> 
            <h2 className='inicio-sesion '>
              <Link to="/login" className='flexea atras blanco'>
                Inicio Sesión
              </Link>
            </h2>
          </div>
        </header>
        <section className='flexea columncenter'>
          <div className='col-10'>
            <div className="col-3">
              <img src="" alt="" className='welcomeimg'/>
            </div>
            <div className="flexea">
              <img src="https://damp-temple-29994.herokuapp.com/api/img/public/Logo.png" alt="" />
              <h1 className='titulo'>BabyGuard</h1>
            </div>
          </div>
        </section>
        <section className='flexea columncenter'>
          <div className='col-10'>
            <ul className='slider'>
              <li id="slide1" className={`col-10 ${addClass? 'esco':null}`}   >
                <h3  >¡NUEVA APP PARA EL CUIDADO DE TUS HIJOS!</h3>
                <p>Babyguard es una App nueva para contratar niñeras en cualquier momento. Ofrecemos el mejor cuidado solo a profesionales. Dejanos el cuidado de tus hijos.</p>
              </li>
              <li id="slide2" className="col-10">
                <h3  >¡NUEVA APP PARA EL CUIDADO DE TUS HIJOS! 22222</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute </p>
              </li>
              <li id="slide3" className="col-10">
                <h3  >¡NUEVA APP PARA EL CUIDADO DE TUS HIJOS! 3333</h3>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
          <div className='col-11 flexea column'>

            <Link to="/home">
              <button className='encuentra'>Encuentra niñeras</button>
            </Link>

            <Link to="/register">
              <button className='registro'>Regístrate</button>
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

