import { TimelineLite } from 'gsap';
import { darkenIn, darkenOut } from './common';

export const enterDefault = (node:Element) => {
  const delay = 1;
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');

  if (!fadeElement) throw new Error('no fade element found');

  tl.delay(delay);

  tl.add(darkenIn(fadeElement));

  tl.play();
};

export const exitDefault = (node:Element) => {
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');

  if (!fadeElement) throw new Error('no fade element found');

  tl.add(darkenOut(fadeElement))
    .set(node, { display: 'none' });

  tl.play();
};
