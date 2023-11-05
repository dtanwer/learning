import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  const user = window.localStorage.getItem("user")
  return (
    <div className="App">
      {
        user ? <Home /> : <Auth />
      }
    </div>
  );
}

export default App;
