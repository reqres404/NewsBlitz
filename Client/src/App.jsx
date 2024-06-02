import { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Filter from './Components/Filter/Filter';
import Cards from './Components/Cards/Cards';
import './App.css';

const App = () => {
  const [category, setCategory] = useState('ALL');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="app-container">
      <Navbar />
      <h1 className="tagline">NEWS AT LIGHTNING <span style={{ color: 'yellow', fontStyle: 'italic' }}>SPEED⚡</span></h1>
      <Filter onCategoryChange={handleCategoryChange} />
      <Cards category={category} />
    </div>
  );
};

export default App;
