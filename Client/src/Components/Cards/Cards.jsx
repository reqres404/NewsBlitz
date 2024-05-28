import React, { useRef, useState, useEffect } from "react";
import ReactCardCarousel from "react-card-carousel";
import axios from "axios";
import "./Cards.css";

const newsData = async () => {
  const url = "http://localhost:4000/api/news";
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const Cards = () => {
  const [news, setNews] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      const news = await newsData();
      setNews(news);
    };
    fetchNewsData();
  }, []);

  const CONTAINER_STYLE = {
    position: "relative",
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const CARD_STYLE = {
    height: "45vh",
    width: "45vw",
    paddingTop: "80px",
    textAlign: "center",
    background: "#52C0F5",
    color: "#FFF",
    fontFamily: "sans-serif",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "10px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.3s ease-in-out",
    cursor: "pointer",
    overflow: "hidden",
  };

  const SELECTED_CARD_STYLE = {
    ...CARD_STYLE,
    transform: "scale(1.2)",
  };

  const CARD_CONTENT_STYLE = {
    maxHeight: "100%",
    overflowY: "auto",
    padding: "10px",
  };

  const BUTTON_STYLE = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "5vw",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#ddb411",
  };
  


  const leftButtonStyle = { ...BUTTON_STYLE, left: "10px" };
  const rightButtonStyle = { ...BUTTON_STYLE, right: "10px" };

  const handleCardClick = (index) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  return (
    <div style={CONTAINER_STYLE}>
      <button
        style={leftButtonStyle}
        onClick={() => carouselRef.current.prev()}
      >
        ‹
      </button>
      <ReactCardCarousel ref={carouselRef} autoplay={false}>
        {news.map((item, index) => (
          <div
            key={index}
            style={{
              ...(selectedCard === index ? SELECTED_CARD_STYLE : CARD_STYLE),
              backgroundImage: `url(${item.imgURL})`,
            }}
            onClick={() => handleCardClick(index)}
          >
            <div style={CARD_CONTENT_STYLE}>
              {<p>{item.news_number}</p>}
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
        style={rightButtonStyle}
        onClick={() => carouselRef.current.next()}
      >
        ›
      </button>
    </div>
  );
};

export default Cards;

// import React, { useRef, useState, useEffect } from "react";
// import ReactCardCarousel from "react-card-carousel";
// import axios from 'axios';
// import './Cards.css';

// const newsData = async () => {
//     const url = "http://localhost:4000/api/news";
//     try {
//         const response = await axios.get(url);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return [];
//     }
// };

// const Cards = () => {
//     const [news, setNews] = useState([]);
//     const [selectedCard, setSelectedCard] = useState(null);
//     const carouselRef = useRef(null);

//     useEffect(() => {
//         const fetchNewsData = async () => {
//             const news = await newsData();
//             setNews(news.articles);
//         };
//         fetchNewsData();
//     }, []);

//     const CONTAINER_STYLE = {
//         position: "relative",
//         height: "100vh",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//     };

//     const CARD_STYLE = {
//         height: "45vh",
//         width: "45vw",
//         paddingTop: "80px",
//         textAlign: "center",
//         background: "#52C0F5",
//         color: "#FFF",
//         fontFamily: "sans-serif",
//         fontSize: "12px",
//         textTransform: "uppercase",
//         borderRadius: "10px",
//         boxSizing: "border-box",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         transition: "transform 0.3s ease-in-out",
//         cursor: "pointer",
//         overflow: "hidden",
//     };

//     const SELECTED_CARD_STYLE = {
//         ...CARD_STYLE,
//         transform: "scale(1.2)",
//     };

//     const CARD_CONTENT_STYLE = {
//         maxHeight: "100%",
//         overflowY: "auto",
//         padding: "10px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//     };

//     const BUTTON_STYLE = {
//         position: "absolute",
//         top: "50%",
//         transform: "translateY(-50%)",
//         fontSize: "5vw",
//         background: "none",
//         border: "none",
//         cursor: "pointer",
//         color: "#ddb411",
//     };

//     const leftButtonStyle = { ...BUTTON_STYLE, left: "10px" };
//     const rightButtonStyle = { ...BUTTON_STYLE, right: "10px" };

//     const READ_MORE_BUTTON_STYLE = {
//         padding: "10px 20px",
//         width: "5vw",
//         color: "black",
//         backgroundColor: "#ddb411",
//         textDecoration: "none",
//         borderRadius: "5px",
//         textAlign: "left",
//         fontWeight: "bold",
//     };

//     const handleCardClick = (index) => {
//         setSelectedCard(index === selectedCard ? null : index);
//     };

//     return (
//         <div style={CONTAINER_STYLE}>
//             <button style={leftButtonStyle} onClick={() => carouselRef.current.prev()}>‹</button>
//             <ReactCardCarousel ref={carouselRef} autoplay={false}>
//                 {news.map((item, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             ...(selectedCard === index ? SELECTED_CARD_STYLE : CARD_STYLE),
//                             backgroundImage: `url(${item.urlToImage})`
//                         }}
//                         onClick={() => handleCardClick(index)}
//                     >
//                         <div style={CARD_CONTENT_STYLE}>
//                             <h3 className="title">{item.title}</h3>
//                             {selectedCard === index && (
//                                 <>
//                                     <p className="summary">{item.description}</p>
//                                     <a href={item.url} style={READ_MORE_BUTTON_STYLE} target="_blank" rel="noopener noreferrer">
//                                         Read More
//                                     </a>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </ReactCardCarousel>
//             <button style={rightButtonStyle} onClick={() => carouselRef.current.next()}>›</button>
//         </div>
//     );
// };

// export default Cards;
