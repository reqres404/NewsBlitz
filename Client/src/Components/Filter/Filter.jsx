import { useState } from 'react';
import './Filter.css';

const Filter = () => {
    const [category, setCategory] = useState('ALL');

    const handleCategoryClick = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    return (
        <div className='filter-container'>
            <button 
                className={category === 'ALL' ? 'active' : ''} 
                onClick={() => handleCategoryClick('ALL')}
            >
                ALL
            </button>
            <button 
                className={category === 'Health' ? 'active' : ''} 
                onClick={() => handleCategoryClick('Health')}
            >
                Health
            </button>
            <button 
                className={category === 'Sports' ? 'active' : ''} 
                onClick={() => handleCategoryClick('Sports')}
            >
                Sports
            </button>
            <button 
                className={category === 'Politics' ? 'active' : ''} 
                onClick={() => handleCategoryClick('Politics')}
            >
                Politics
            </button>
            <button 
                className={category === 'Finance' ? 'active' : ''} 
                onClick={() => handleCategoryClick('Finance')}
            >
                Finance
            </button>
        </div>
    );
};

export default Filter;
