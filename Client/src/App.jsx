import Navbar from "../src/Components/Navbar/navbar"
import Cards from "./Components/Cards/Cards"
import "./App.css"
function App() {

  const handleReadMore = (url) => {
    window.open(url, '_blank'); // Open the original article in a new tab
  };

  const handleDismiss = () => {
    // Implement logic to dismiss the news card
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="deck">
          <Cards />
        </div>
      </div>
    </>
  )
}

export default App
