import React, { useState } from 'react';
import Navbar from './Components/Navbar/navbar';
import Cards from './Components/Cards/Cards';
import data from './Components/Cards/data';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [cards, setCards] = useState(data);
  console.log(cards)
  const handleSwipe = (isRight) => {
    console.log(isRight ? "Swiped right!" : "Swiped left!");
    setCards((prevCards) => prevCards.slice(0));
  };

  return (
    <div className="app-container">
      <Navbar />
      <Cards/>
    </div>
  );
};

export default App;
