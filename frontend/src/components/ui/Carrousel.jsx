import { useState } from "react";
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
    setTimeout(() => setIsAnimating(false), 500); // bijgevoegd voor css transition tijd, is hier nu 0.5s
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

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
          <img
            src={d.photo}
            alt={d.name}
            key={idx}
            className={`slide ${slideClass}`}
          />
        );
      })}
      <BsArrowRightCircleFill
        onClick={nextSlide}
        className={`arrow arrow-right ${isAnimating ? "disabled" : ""}`}
      />
      <span className="indicators">
        {data.map((_, idx) => (
          <button
            key={idx}
            disabled={isAnimating}
            className={
              slide === idx ? "indicator" : "indicator indicator-inactive"
            }
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default Carousel;
