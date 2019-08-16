import { TimelineLite } from 'gsap';

export const darkenIn = (
  fadeElement:Element,
):TimelineLite => {
  const tl = new TimelineLite();

  tl.set(fadeElement, {
      backgroundColor: '#000000',
      opacity: .9,
    })
    .to(fadeElement, 1, {
      backgroundColor: '#150d05',
      opacity: .6
    });

  return tl;
};

export const darkenOut = (
  fadeElement:Element
):TimelineLite => {
  const tl = new TimelineLite();

  tl.set(fadeElement, {
      backgroundColor: '#150d05',
      opacity: .6
    })
    .to(fadeElement, 1, {
      backgroundColor: '#000000',
      opacity: .9
    });

  return tl
};

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

export const enterDefault = (node:Element) => {
  const delay = 1;
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');

  if (!fadeElement) throw new Error('no fade element found');

  tl.delay(delay);

  tl.set(node, { zIndex: 2})
    .add(darkenIn(fadeElement))
    .set(node, { zIndex: 1});

  tl.play();
};

export const exitDefault = (node:Element) => {
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');

  if (!fadeElement) throw new Error('no fade element found');

  tl.add(darkenOut(fadeElement))
    .set(node, { opacity: 0 });

  tl.play();
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

    tl.set(node,{zIndex: 2})
      .add(darkenIn(fadeElement))
      .add(showcaseTl('in', node, currentSlide), 0)
      .set(node,{zIndex: 1});
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
    .set(node, { opacity: 0 });

  tl.duration(1);

  tl.play();
};