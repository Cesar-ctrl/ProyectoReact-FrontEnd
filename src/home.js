import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import App2 from './App2.js';
import Apphome from './App-home.js';
import reportWebVitals from './reportWebVitals';

const roothome = ReactDOM.createRoot(document.getElementById('root'));
roothome.render(
  <React.StrictMode>
    <Apphome />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();