import { TimelineLite, Power4 } from "gsap";

export const slideSwitch = (slides: Array<Element>, fromSlide: Element, toSlide: Element) => {
  const fromSlideContent = fromSlide.getElementsByClassName("slide__content")[0];
  const toSlideContent = toSlide.getElementsByClassName("slide__content")[0];

  const tl = new TimelineLite();

  tl.set(slides, { opacity: 0 })
    .set(fromSlide, { zIndex: 1, opacity: 1 })
    .set(toSlide, { zIndex: 2, opacity: 0, scaleX: 1.1, scaleY: 1.1})
    .set(toSlideContent, { opacity: 1 })
    .to(fromSlideContent, 0.2, { opacity: 0 })
    .to(
      toSlide,
      1,
      {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        ease: Power4.easeOut
      },
      "-=0.2"
    )
    .staggerFromTo(
      toSlideContent.children,
      0.6,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0 },
      0.2,
      "-=0.5"
    )
    .set(fromSlide, { opacity: 0 });

  return tl;
};
