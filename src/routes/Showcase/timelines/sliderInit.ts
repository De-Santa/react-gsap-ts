import { TimelineLite, Power4 } from "gsap";

export const sliderInit = (sliderControls: Array<HTMLButtonElement>, slides: Array<Element>, startSlide: Element) => {
  const startSlideContent = startSlide.getElementsByClassName("slide__content")[0];

  const tl = new TimelineLite();

  tl.set(startSlide, {
      opacity: 0,
      scaleX: 1.1,
      scaleY: 1.1,
      zIndex: 1
    })
    .to(startSlide, 1, {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      ease: Power4.easeOut
    })
    .staggerFromTo(
      startSlideContent.children,
      0.6,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0 },
      0.2,
      "-=0.5"
    )
    .staggerFromTo(
      sliderControls,
      0.6,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0 },
      0.2
    );

  return tl;
};
