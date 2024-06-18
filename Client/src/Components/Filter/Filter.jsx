import { useState } from 'react';
import './Filter.css';

const Filter = ({ onCategoryChange }) => {
  const [category, setCategory] = useState('ALL');

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="filter-container">
      <button 
        className={`filter-button ${category === 'India' ? 'active' : ''}`} 
        onClick={() => handleCategoryClick('India')}
      >
        International
      </button>
      <button 
        className={`filter-button ${category === 'Health' ? 'active' : ''}`} 
        onClick={() => handleCategoryClick('Health')}
      >
        Health
      </button>
      <button 
        className={`filter-button ${category === 'Sports' ? 'active' : ''}`} 
        onClick={() => handleCategoryClick('Sports')}
      >
        Sports
      </button>
      <button 
        className={`filter-button ${category === 'Politics' ? 'active' : ''}`} 
        onClick={() => handleCategoryClick('Politics')}
      >
        Politics
      </button>
      <button 
        className={`filter-button ${category === 'Finance' ? 'active' : ''}`} 
        onClick={() => handleCategoryClick('Finance')}
      >
        Finance
      </button>
    </div>
  );
};

export default Filter;
