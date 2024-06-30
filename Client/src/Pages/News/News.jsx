import { useState } from 'react';
import Filter from "../../Components/Filter/Filter";
import Cards from '../../Components/Cards/Cards';
import './News.css';

const News = () => {
  const [category, setCategory] = useState('ALL');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="app-container">
      <div className="separator-line"></div>
      <h1 className="tagline">NEWS AT LIGHTNING <span style={{ color: 'yellow' }}>SPEED⚡</span></h1>
      <Filter onCategoryChange={handleCategoryChange} />
      <Cards category={category} />
    </div>
  );
};

export default News;
