import Navbar from './Components/Navbar/navbar';
import Filter from './Components/Filter/Filter';
import Cards from './Components/Cards/Cards';
import './App.css'; // Import the CSS file for styling


const App = () => {
  return (
    <div className="app-container">
      
      <Navbar/>
      <h1 className="tagline">NEWS AT LIGHTING <span style={{color:'yellow',fontStyle:'italic'
      }}>SPEED⚡</span></h1>
      <Filter/>
      
      <Cards/>
    </div>
  );
};

export default App;
