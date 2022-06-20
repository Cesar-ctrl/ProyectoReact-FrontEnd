import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Switch, Route,  Navigate } from "react-router-dom";

import './sass/app.scss';
import Welcome from './components/pages/Welcome';
import Login from './components/LoginRegister/LoginF';
import Register from './components/LoginRegister/Register';
import GuardsRegister from './components/LoginRegister/GuardsRegister';
import GuardsLogin from './components/LoginRegister/GuardsLogin';
import guardService from './services/guards'
import userService from './services/users'
import Home from './components/pages/Home'


const App = () => {

  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userService.setToken(user.token)
      setLoggedIn(true)
    }
  }, [])
  useEffect(() => {
    const loggedGuardJSON = window.localStorage.getItem('loggedNoteAppGuard')
    if (loggedGuardJSON) {
      const guard = JSON.parse(loggedGuardJSON)
      setUser(guard)
      guardService.setToken(guard.token)
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
        <Route path="/guardregister/*" element={<GuardsRegister />} />
        <Route path="/guardlogin/*" element={<GuardsLogin />} />
        
      </Routes>
      
      
    </Router>
  );
}


export default App;