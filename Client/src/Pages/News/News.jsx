import { useState } from 'react';
import Filter from '../../Components/Filter/Filter';
import Cards from '../../Components/Cards/Cards';
import './News.css';

const News = () => {
  const [category, setCategory] = useState('ALL');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="app-container">
      <h1 className="tagline">
      Stay <span className="highlight">Informed</span>, Stay <span className="highlight">Engage</span> With
      <br />Instant News <span className="highlight">Summaries</span>
      {/* News at Lightning <span className="highlight">Speed⚡</span> */}
      </h1>
      <Filter onCategoryChange={handleCategoryChange} />
      <Cards category={category} />
    </div>
  );
};

export default News;
