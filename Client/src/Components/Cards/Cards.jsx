import  { useRef, useState, useEffect } from "react";
import ReactCardCarousel from "react-card-carousel";
import axios from "axios";
import "./Cards.css";

const fetchNewsData = async (props) => {
  const url = "http://localhost:4000/api/news";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return [];
  }
};

const Cards = () => {
  const [news, setNews] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const getNewsData = async () => {
      const data = await fetchNewsData();
      setNews(data);
    };
    getNewsData();
  }, []);

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  return (
    <div className="container_style">
      <button
        className="button_style left_button_style"
        onClick={() => carouselRef.current.prev()}
      >
        ‹
      </button>
      <ReactCardCarousel ref={carouselRef} autoplay={false}>
        {news.map((item, index) => (
          <div
            key={index}
            className={`card_style ${selectedCard === index ? 'selected_card_style' : ''}`}
            style={{ backgroundImage: `url(${item.imgURL})` }}
            onClick={() => handleCardClick(index)}
          >
            <div className="card_content_style">
              <p>{item.news_number}</p>
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
      <button
        className="button_style right_button_style"
        onClick={() => carouselRef.current.next()}
      >
        ›
      </button>
    </div>
  );
};

export default Cards;
