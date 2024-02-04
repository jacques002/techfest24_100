import './App.scss';
import Router from './router.js';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/nav_bar/NavBar.js';
import ContextMenu from './components/context_menu/ContextMenu.js';
import { useState } from 'react';
// eslint-disable-next-line

function App() {


  return (
    <div className="App">
      
        <BrowserRouter>
          
          <Router />
        </BrowserRouter>
        
    </div>
  );
}

export default App;
