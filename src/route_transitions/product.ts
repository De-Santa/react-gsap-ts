import { TimelineLite } from 'gsap';
import { darkenIn, darkenOut } from './common';

export const enterProduct = (node:Element) => {
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');
  const productDescription = node.querySelector('[data-animate="product-description"]');

  if (!fadeElement) throw new Error('product page no fade element found');
  if (!productDescription) throw new Error('product page no product-description element found');

  tl.delay(1);

  tl.add(darkenIn(fadeElement))
    .fromTo(
      productDescription,
      1,
      {clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)'},
      {clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'},
      0
    );

  tl.play();
};

export const exitProduct = (node:Element) => {
  const tl = new TimelineLite({ paused: true });
  const fadeElement = node.querySelector('[data-animate="fade-element"]');
  const content = node.querySelector('[data-animate="content"]');

  if (!fadeElement) throw new Error('product page no fade element found');
  if (!content) throw new Error('product page no content element found');

  tl.set(content, { overflowY: 'hidden' })
    .add(darkenOut(fadeElement))
    .to(content, 1, { opacity: 0, y: -60}, '-=1')
    .set(node, { display: 'none' });

  tl.play();
};