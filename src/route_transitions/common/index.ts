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