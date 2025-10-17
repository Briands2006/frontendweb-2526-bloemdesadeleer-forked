import { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./Carrousel.css";

const Carousel = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  const prevSlideIndex = (slide - 1 + data.length) % data.length;
  const nextSlideIndex = (slide + 1) % data.length;

  return (
    <div className="carousel">
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
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
        className="arrow arrow-right"
      />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;