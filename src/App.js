import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Switch, Route,  Navigate } from "react-router-dom";

import './sass/app.scss';
//import Example from './components/Example';
import User from './components/User';
import Welcome from './components/Welcome';
import Login from './components/LoginF';
import Register from './components/Register';
import Notes from "./services/notes";
import App2 from "./App2"
import noteService from './services/notes'
import loginService from './services/login'
import registerService from './services/register'
import Home from './components/Home'
import Busqueda from './components/Busqueda';
import Favoritos from './components/Favoritos';
import Star from './components/Star';
import Chat from './components/Chat';
import guards from './services/guards';

const App = () => {

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
  const [showAll, setShowAll] = useState(true)
  

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


  return ( 
    <Router>
      <Routes>
        <Route path="/welcome" element={ <Welcome />} />
        <Route path="/" element={ <Welcome />} />
        <Route path="/home/*" element={ <Home />} />
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


export default App;