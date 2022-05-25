import React from 'react';
import {useRef, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Login from './Login';
import {useState} from 'react';

function Welcome() {

    const [addClass,setAddClass] = useState(false)

    return (

    <section className={`background1 `}>
        <div className="row">
            <header className="header welcome">
                <div className=""> 
                    <h2 className='inicio-sesion '>
                        <Link to="/login" >
                            Inicio Sesión
                        </Link>
                    </h2>
                </div>
            </header>
            <section>
                <div className='col-10'>
                    <div className="col-3">
                        <img src="" alt="" className='welcomeimg'/>
                    </div>
                    <div className="flexea">
                        <h1 className='titulo'>BabyGuard</h1>
                    </div>
                </div>
            </section>
            <section>
                <div className='col-10'>
                    <ul className='slider'>
                        <li id="slide1" className={`col-10 ${addClass? 'esco':null}`}   >
                            <h3  >¡NUEVA APP PARA EL CUIDADO DE TUS HIJOS!</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
            <section>
               <div className='col-11 flexea column'>
                   <a href="" >
                       <button className='encuentra'>Encuentra niñeras</button>
                   </a>
                   <a href="" > 
                       <button className='registro'>Regístrate</button>
                   </a>
               </div>
            </section>

        </div>
    </section>
    
    );

    }

export default Welcome;

