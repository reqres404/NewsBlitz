import React, { useState } from 'react';
import Navbar from './Components/Navbar/navbar';
import Cards from './Components/Cards/Cards';
import './App.css'; // Import the CSS file for styling

const App = () => {
  return (
    <div className="app-container">
      
      <Navbar/>
      <h1 className="tagline">NEWS AT LIGHTING <span style={{color:'yellow',fontStyle:'italic'
      }}>SPEED⚡</span></h1>
      
      <Cards/>
    </div>
  );
};

export default App;
