import { useRef, useState, useEffect } from "react";
import ReactCardCarousel from "react-card-carousel";
import axios from "axios";
import "./Cards.css";

// Fetch news data from the API
const fetchNewsData = async () => {
  const url = "http://localhost:4000/api/news"; 
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return {};
  }
};

const Cards = ({ category }) => {
  const [news, setNews] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const getNewsData = async () => {
      const data = await fetchNewsData();
      setNews(data);
    };
    getNewsData();
  }, []);

  useEffect(() => {
    // Reset the selected card and carousel index when category changes
    setSelectedCard(null);
    setCarouselIndex(0);
    if (carouselRef.current) {
      carouselRef.current.goTo(0);
    }
  }, [category]);

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  // Filter news based on selected category
  const filteredNews = category === 'ALL' 
    ? Object.values(news).flat() 
    : news[category.toLowerCase()] || [];

  const totalNews = filteredNews.length;

  return (
    <div className="container_style">

      <button
        className="button_style left_button_style"
        onClick={() => {
          const newIndex = carouselIndex - 1;
          if (newIndex >= 0) {
            setCarouselIndex(newIndex);
            carouselRef.current.prev();
          }
        }}
      >
        ‹
      </button>
      <ReactCardCarousel ref={carouselRef} autoplay={false}>
        {filteredNews.map((item, index) => (
          <div
            key={index}
            className={`card_style ${selectedCard === index ? 'selected_card_style' : ''}`}
            style={{ backgroundImage: `url(${item.imgURL})` }}
            onClick={() => handleCardClick(index)}
          >
            <div className="card_content_style">
              <h3 className="title">{item.title}</h3>
              {selectedCard === index && (
                <>
                  <p className="summary">{item.summary}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more-button"
                  >
                    Read More
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </ReactCardCarousel>
      <div className="news_number_display">
        {totalNews > 0 ? `${carouselIndex + 1} / ${totalNews}` : "No news available"}
      </div>
      <button
        className="button_style right_button_style"
        onClick={() => {
          const newIndex = carouselIndex + 1;
          if (newIndex < totalNews) {
            setCarouselIndex(newIndex);
            carouselRef.current.next();
          }
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Cards;
