import React, { useContext, useRef, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ShowcaseContext } from  '../../context/ShowcaseContext';
import { TimelineLite } from 'gsap';
import { slideSwitch, sliderInit } from './timelines';
import { Slide, SliderControl } from './components';
import { products } from '../../products';
import './styles.scss';
import { Transition } from 'react-transition-group';

interface IShowcaseTransition extends RouteComponentProps {
  currentSlide: number
}

const ShowcaseTransition: React.FC<IShowcaseTransition> = (props) => {
  const { children, currentSlide, match } = props;

  // const { current: tl } = useRef<TimelineLite>(new TimelineLite());
  
  return (
    <Transition
      addEndListener={(node, done) => {
        const activeSlide = node.children[currentSlide];
        const imageFade = activeSlide.getElementsByClassName('slide__image-fade')[0];

        if (match !== null) {
          const tl = new TimelineLite({ delay: .5 });
          tl.call(console.log, ['enter showcase', node])
            .set(imageFade, {
              backgroundColor: '#000000',
              opacity: .9,
            })
            .to(imageFade, .5, {
              backgroundColor: '#150d05',
              opacity: .6
            })
        } else {
          const tl = new TimelineLite();
          tl.call(console.log, ['exit showcase', node])
            .set(node, { zIndex: 1 })
            .set(imageFade, {
              backgroundColor: '#150d05',
              opacity: .6
            })
            .to(imageFade, .5, {
              backgroundColor: '#000000',
              opacity: .9,
            })
            .set(node, { opacity: 0 })
        }
      }}
      in={match !== null}
      mountOnEnter={true}
      timeout={1000}
      unmountOnExit={true}
    >
      {children}
    </Transition>
  )
};

interface IShowCaseComponent {
  currentSlide: number,
  handleSlideChange: (...args: any[]) => void;
}

const ShowcaseComponent: React.FC<IShowCaseComponent> = (props) => {
  const { currentSlide, handleSlideChange } = props;

  const slidesRef = useRef<Array<Element>>([]);

  const sliderControlsRef = useRef<Array<HTMLButtonElement>>([]);

  const sliderStatusRef = useRef<boolean>(false);

  const { current: tl } = useRef<TimelineLite>(new TimelineLite());

  const slideTo = (slideNum: number):void => {
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
      {products.map((productData, index) => {
        return (
          <Slide
            key={productData.id}
            ref={el => { slidesRef.current[index] = el; }}
            productLink={`product/${productData.id}`}
            productData={productData}
          />
        )
      })}
      <div className="showcase__controls" style={{ zIndex: 3 }}>
        {products.map(({ subtitle, id, title }, index) => (
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

export const Showcase: React.FC<RouteComponentProps> = (props) => {
  const { currentSlide, handleSlideChange }  = useContext(ShowcaseContext);
  return (
    <ShowcaseTransition
      {...props}
      currentSlide={currentSlide}
    >
      <ShowcaseComponent
        currentSlide={currentSlide}
        handleSlideChange={handleSlideChange}
      />
    </ShowcaseTransition>
  )
};

