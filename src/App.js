import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import './sass/app.scss';
//import Example from './components/Example';
import User from './components/User';
import Welcome from './components/Welcome';
import Login from './components/LoginF';
import Register from './components/Register';
import Notes from "./services/notes";
import App2 from "./App2"
import loginService from './services/login'
import registerService from './services/register'
const App = () => {

  

  return ( 
    <div className="container ">
      <Welcome />
      

    </div>
  );
}


export default App;