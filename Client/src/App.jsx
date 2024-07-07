import { useState } from 'react';
import {Route,Routes} from "react-router-dom"
import Navbar from './Components/Navbar/navbar';
import News from './Pages/News/News';
import Feedback from './Pages/Feedback/Feedback';
import About from './Pages/About/About';
import './App.css';

const App = () => {
  const [category, setCategory] = useState('ALL');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<News/>}/>
        <Route path="feedback" element={<Feedback/>}/>
        <Route path="about" element={<About/>}/>
      </Routes>
    </div>
  );
};

export default App;
