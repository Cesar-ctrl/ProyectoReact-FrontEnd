import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Switch, Route,  Navigate } from "react-router-dom";

import './sass/app.scss';
import Welcome from './components/Welcome';
import Login from './components/LoginF';
import Register from './components/Register';
import noteService from './services/notes'

import Home from './components/Home'


const App = () => {

  const [user, setUser] = useState(null)
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


  return ( 
    <Router>
      <Routes>
        <Route path="/welcome" element={ <Welcome />} />
        <Route path="/" element={ <Welcome />} />
        <Route path="/home/*" element={ <Home />} />
        <Route path="/login/*" element={<Login />} />  
        
        <Route path="/register/*" element={<Register />} />
        
      </Routes>
      
      
    </Router>
  );
}


export default App;