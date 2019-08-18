import { TimelineLite } from 'gsap';
import { darkenIn, darkenOut } from './common';

export const enterProduct = (node:Element) => {
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');

  if (!fadeElement) throw new Error('product page no fade element found');

  tl.delay(1);

  tl.add(darkenIn(fadeElement));

  tl.play();
};

export const exitProduct = (node:Element) => {
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');

  if (!fadeElement) throw new Error('product page no fade element found');

  tl.set(node, { overflow: 'hidden' })
    .add(darkenOut(fadeElement))
    .set(node, { display: 'none' });

  tl.play();
};