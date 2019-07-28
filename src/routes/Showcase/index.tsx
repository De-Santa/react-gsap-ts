import React, { useContext, useRef, useEffect } from 'react';
import { ShowcaseContext } from  '../../context/ShowcaseContext';
import { TimelineLite } from 'gsap';
import { slideSwitch, sliderInit } from './timelines';
import { Slide, SliderControl } from './components';
import { slidesData } from "./slidesData";
import './styles.scss';
import { Transition } from 'react-transition-group';

interface IShowcaseTransition {
  match: any
}

const ShowcaseTransition: React.FC<IShowcaseTransition> = (props) => {
  const { children, match } = props;

  const { current: tl } = useRef(new TimelineLite());
  
  return (
    <Transition
      addEndListener={(node, done) => {
        if (match !== null) {
          tl.from(node, .6, {
            opacity: 0,
            onComplete: done
          });
        } else {
          tl.to(node, .6, {
            opacity: 0,
            onComplete: done
          });
        }
      }}
      in={match !== null}
      mountOnEnter={true}
      timeout={6000}
      unmountOnExit={true}
    >
      {children}
    </Transition>
  )
};

const ShowcaseComponent: React.FC = () => {
  const {
    currentSlide,
    handleSlideChange
  }: any = useContext(ShowcaseContext);

  const slidesRef = useRef<Array<Element>>([]);

  const sliderControlsRef = useRef<Array<HTMLButtonElement>>([]);

  const sliderStatusRef = useRef<boolean>(false);

  const { current: tl } = useRef(new TimelineLite());

  const slideTo = (slideNum: number) => {
    if (slideNum === currentSlide) return;

    if (tl.isActive()) tl.clear();

    const slides = slidesRef.current;
    const fromSlide = slides[currentSlide];
    const toSlide = slides[slideNum];

    tl.call(handleSlideChange, [slideNum])
      .add(slideSwitch(slides, fromSlide, toSlide));
  };

  useEffect(() => {
    const sliderActive = sliderStatusRef.current;
    if (sliderActive) return;
    sliderStatusRef.current = true;
    const sliderControls = sliderControlsRef.current;
    const slides = slidesRef.current;
    const startSlide = slides[currentSlide];

    tl.add(sliderInit(sliderControls, slides, startSlide));
  }, [currentSlide, tl]);

  return (
    <div className="showcase page">
      {slidesData.map((slideData, index) => {
        console.log('slideData.id', slideData.id);
        return (
          <Slide
            key={slideData.id}
            ref={el => { slidesRef.current[index] = el; }}
            productLink={`product/${slideData.id}`}
            slideData={slideData}
          />
        )
      })}
      <div className="showcase__controls" style={{ zIndex: 3 }}>
        {slidesData.map(({ subtitle, id, title }, index) => (
          <SliderControl
            key={id}
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
};


interface IShowcase {
  initialSlide?: number,
  match: any
}

export const Showcase: React.FC<IShowcase> = (props) => {
  const { match } = props;
  return (
    <ShowcaseTransition match={match}>
      <ShowcaseComponent />
    </ShowcaseTransition>
  )
};

