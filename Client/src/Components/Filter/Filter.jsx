import { useState } from 'react';
import './Filter.css';

const Filter = ({ onCategoryChange }) => {
  const [category, setCategory] = useState('ALL');

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    onCategoryChange(selectedCategory === 'ALL' ? 'ALL' : selectedCategory);
  };

  const buttons = [
    { label: 'All', value: 'ALL' },
    { label: 'AI', value: 'AI' },
    { label: 'Health', value: 'Health' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Politics', value: 'Geopolitical' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Crypto', value: 'Crypto' },
  ];

  return (
    <div className="filter-container">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`filter-button ${category === button.value ? 'active' : ''}`}
          onClick={() => handleCategoryClick(button.value)}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
