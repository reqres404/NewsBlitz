import React, { useRef, useState } from "react";
import ReactCardCarousel from "react-card-carousel";
import data from "./data";

const Cards = () => {
  const carouselRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);

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
    cursor: "pointer", // Add cursor pointer to indicate clickability
    overflow: "hidden", // Hide overflow content initially
  };

  const SELECTED_CARD_STYLE = {
    ...CARD_STYLE,
    transform: "scale(1.2)",
  };

  const CARD_CONTENT_STYLE = {
    maxHeight: "100%", // Allow content to expand vertically
    overflowY: "auto", // Enable vertical scrolling if content overflows
    padding: "10px", // Add padding to prevent text from touching edges
  };

  const BUTTON_STYLE = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "5rem",
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
      <button style={leftButtonStyle} onClick={() => carouselRef.current.prev()}>‹</button>
      <ReactCardCarousel ref={carouselRef} autoplay={false}>
        {data.map((item, index) => (
          <div 
            key={index} 
            style={{
              ...(selectedCard === index ? SELECTED_CARD_STYLE : CARD_STYLE),
              backgroundImage: `url(${item.imgURL})`
            }}
            onClick={() => handleCardClick(index)}
          >
            <div style={CARD_CONTENT_STYLE}>
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              {/* Display image URL with scrolling if selected */}
              {selectedCard === index && (
                <p>{item.summary}</p>
              )}
            </div>
          </div>
        ))}
      </ReactCardCarousel>
      <button style={rightButtonStyle} onClick={() => carouselRef.current.next()}>›</button>
    </div>
  );
};

export default Cards;
