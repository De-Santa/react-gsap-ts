import React, { useContext, useRef } from 'react';
import { ShowcaseContext } from  '../../context/ShowcaseContext';
import { TimelineLite } from 'gsap';
import { slideSwitch } from './timelines';
import { products } from '../../products';
import { Slide, SliderControl } from './components';
import './styles.scss';

export const Showcase: React.FC = () => {
  const { currentSlide, handleSlideChange } = useContext(ShowcaseContext);

  const { current: tl} = useRef<TimelineLite>(new TimelineLite({
    autoRemoveChildren: true
  }));

  const { current: slides} = useRef<Array<Element>>([]);

  const sliderControlsRef = useRef<Array<HTMLButtonElement>>([]);

  const slideTo = (slideNum: number):void => {
    if (slideNum === currentSlide) return;

    if (tl.isActive()) tl.clear();

    const fromSlide = slides[currentSlide];
    const toSlide = slides[slideNum];

    tl.call(handleSlideChange, [slideNum])
      .add(slideSwitch(slides, fromSlide, toSlide));
  };

  return (
    <div className="showcase page">
      {products.map((productData, index) => {
        return (
          <Slide
            key={productData.id}
            ref={el => { slides[index] = el; }}
            isCurrent={currentSlide === index}
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
