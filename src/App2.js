import React from "react";
import {useState} from "react";
import { BrowserRouter as Router, Routes, Switch, Route,  Link } from "react-router-dom";
import './sass/app.scss';
//import Example from './components/Example';
import User from './components/User';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Notes from "./services/notes";

const App = () => {

  const [page, setPage] = useState('about')

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
    <div className="container ">
      <Router>
      

        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login/*" element={<Login />} />
          
        </Routes>
      </Router>
      

    </div>
  );
}


export default App;