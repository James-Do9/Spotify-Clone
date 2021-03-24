import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login'
import Dashboard from './Dashboard'
import React from 'react';

const code = new URLSearchParams(window.location.search).get('code'); 
//Grabs the authorization code from the URL and passes it through the dashboard as code
function App() {
  return code ? <Dashboard code={code}/> : <Login/>
}

export default App;
