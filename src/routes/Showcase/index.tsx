import React, { useRef, useState, useEffect } from 'react';
import { TimelineLite } from "gsap";
import { slideSwitch, sliderInit } from "./timelines";
import { Slide, SliderControl } from "./components";
import { slidesData } from "./slidesData";
import "./styles.scss";

interface IShowcaseProps {
  initialSlide?: number
}

export const Showcase: React.FC<IShowcaseProps> = ({ initialSlide = 0 }) => {
  const slidesRef = useRef<Array<Element>>([]);

  const sliderControlsRef = useRef<Array<HTMLButtonElement>>([]);

  const timelineInstance = useRef(new TimelineLite());

  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const slideTo = (slideNum: number) => {
    if (slideNum === currentSlide) return;
    const tl = timelineInstance.current;

    if (tl.isActive()) tl.clear();

    const slides = slidesRef.current;
    const fromSlide = slides[currentSlide];
    const toSlide = slides[slideNum];

    tl.call(setCurrentSlide, [slideNum]).add(
      slideSwitch(slides, fromSlide, toSlide)
    );
  };

  useEffect(() => {
    const sliderControls = sliderControlsRef.current;
    const slides = slidesRef.current;
    const startSlide = slides[initialSlide];
    const tl = timelineInstance.current;

    tl.add(sliderInit(sliderControls, slides, startSlide));
  }, [initialSlide]);

  return (
    <div className="slider">
      {slidesData.map((slideData, index) => (
        <Slide
          key={slideData.title}
          ref={el => { slidesRef.current[index] = el; }}
          slideData={slideData}
        />
      ))}
      <div className="slider__controls" style={{ zIndex: 3 }}>
        {slidesData.map(({ subtitle, title }, index) => (
          <SliderControl
            key={title}
            ref={el => { sliderControlsRef.current[index] = el; }}
            onClick={() => slideTo(index)}
            isActive={currentSlide === index}
            subtitle={subtitle}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}
