import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./Carrousel.css";

const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Nieuw state voor animatie status,
  // om dus de button disabled te zetten

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timeout);
  }, [slide]); // useEffect om isAnimating na 600ms terug op false te zetten

  const prevSlideIndex = (slide - 1 + data.length) % data.length;
  const nextSlideIndex = (slide + 1) % data.length;

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill
        onClick={prevSlide}
        className={`arrow arrow-left ${isAnimating ? "disabled" : ""}`}
      />

      {data.map((d, idx) => {
        let slideClass = "slide-hidden";
        if (idx === slide) {
          slideClass = "slide-current";
        } else if (idx === prevSlideIndex) {
          slideClass = "slide-side slide-left";
        } else if (idx === nextSlideIndex) {
          slideClass = "slide-side slide-right";
        }

        return (
          <div key={idx} className={`slide ${slideClass}`}>
            {/* geef meer slide info mee */}
            <img src={d.photo} alt={d.name} className="slide-img" />
            <div className="slide-info">
              <h2>{d.name}</h2>
              <p>{d.team}</p>
            </div>
          </div>
        );
      })}

      <BsArrowRightCircleFill
        onClick={nextSlide}
        className={`arrow arrow-right ${isAnimating ? "disabled" : ""}`}
      />

      <div className="indicators">
        {data.map((_, idx) => (
          <button
            key={idx}
            disabled={isAnimating}
            className={
              slide === idx ? "indicator" : "indicator indicator-inactive"
            }
            onClick={() => !isAnimating && setSlide(idx)} // zet slide bij klikken en als boolean isAnimating false is
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
