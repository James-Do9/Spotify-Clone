import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navbar from './Navbar';
import "../src/css/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Navbar></Navbar>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
