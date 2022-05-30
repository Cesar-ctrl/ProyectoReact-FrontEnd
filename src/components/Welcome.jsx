import React from 'react';
import {useRef, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import { withRouter } from "react-router";
import Login from './LoginF';
import Register from './Register';
import noteService from '../services/notes'
import loginService from '../services/login'
import registerService from '../services/register'
import Home from './Home'

function Welcome() {

    const [addClass,setAddClass] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notes, setNotes] = useState([]) 
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [surnames, setSurnames] = useState('')
    const [dni, setDni] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [page, setPage] = useState('about')
    const [loggedIn, setLoggedIn] = useState(null)



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
      setLoggedIn(true)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
    setLoggedIn(false)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        email,
        password
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      
      noteService.setToken(user.token)
      
      
      setUser(user)
      setEmail('')
      setPassword('')
      setLoggedIn(true)
      
    } catch(e) {
      setErrorMessage('Email o contraseña inválidos')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      const user = await registerService.register({
        name,
        surnames,
        dni,
        phone,
        email,
        password
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      setUser(user)
      setEmail('')
      setPassword('')
      setLoggedIn(true)
    } catch(e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


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



    return (

        <Router>

      
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

                    <Link to="/index">
                        <button className='encuentra'>Encuentra niñeras</button>
                    </Link>
                       

                    <Link to="/register">
                       <button className='registro'>Regístrate</button>
                    </Link>
               </div>
            </section>

        </div>
    </section>

        <Routes>
         
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login/*" element={<Login 
              email={email}
              password={password}
              handleEmailChange={
                ({target}) => setEmail(target.value)}
              handlePasswordChange={
                ({target}) => setPassword(target.value)
              }
              handleSubmit={handleLogin}
              errorMessage={errorMessage}
            />} />
            
            
            
          <Route path="/register/*" element={<Register
            name={name}
            surnames={surnames}
            dni={dni}
            phone={phone}
            email={email}
            password={password}
            handleNameChange={
              ({target}) => setName(target.value)}
            handleSurnamesChange={
            ({target}) => setSurnames(target.value)}
            handleDniChange={
              ({target}) => setDni(target.value)
            }
            handlePhoneChange={
              ({target}) => setPhone(target.value)}
            handleEmailChange={
              ({target}) => setEmail(target.value)
            }
            handlePasswordChange={
              ({target}) => setPassword(target.value)
            }
            handleSubmit={handleRegister}
           />} />
        </Routes>
      </Router>


    
    
    );

    }

export default Welcome;

