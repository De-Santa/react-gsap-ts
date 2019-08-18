import { TimelineLite } from 'gsap';
import { darkenIn, darkenOut } from './common';

const showcaseTl = (
  direction:'in'|'out',
  node:Element,
  currentSlide:number
) => {
  const tl = new TimelineLite();

  const sliderControls = node.getElementsByClassName('showcase__controls')[0];
  const slides = node.querySelectorAll('.slide');
  const activeSlide = slides[currentSlide];
  const activeSlideContent = activeSlide.getElementsByClassName('slide__content')[0];

  switch (direction) {
    case 'in':
      tl.staggerFromTo(
        activeSlideContent.children,
        0.6,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        0.2
      )
        .staggerFromTo(
          sliderControls.children,
          0.6,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0 },
          0.2
        );
      break;

    case "out":
      tl.to(activeSlideContent, 1, { opacity: 0, y: -60 })
        .to(sliderControls, 1, { opacity: 0, y: -60 }, '-=.8');
      break;

    default: throw new Error('invalid transition direction')
  }

  return tl;
};

export const enterShowcase = (
  currentSlide:number,
  isAppearing:boolean,
  node:Element,
) => {
  const delay = isAppearing ? 0 : 1;
  const tl = new TimelineLite({ paused: true });

  if (isAppearing) {
    tl.add(showcaseTl("in", node, currentSlide));
  } else {
    const activeSlide = node.querySelectorAll('.slide')[currentSlide];
    const fadeElement = activeSlide.getElementsByClassName('slide__image-fade')[0];

    tl.delay(delay);

    tl.add(darkenIn(fadeElement))
      .add(showcaseTl('in', node, currentSlide), 0)
  }

  tl.play();
};

export const exitShowcase = (
  currentSlide:number,
  node:Element,
) => {
  const tl = new TimelineLite({ paused: true });
  const activeSlide = node.querySelectorAll('.slide')[currentSlide];
  const fadeElement = activeSlide.getElementsByClassName('slide__image-fade')[0];

  tl.add(darkenOut(fadeElement))
    .add(showcaseTl('out', node, currentSlide), '-=1')
    .set(node, { display: 'none' });

  tl.duration(1);

  tl.play();
};