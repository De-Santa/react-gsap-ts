import React, { useRef, useEffect } from 'react';
import { TweenLite } from 'gsap';
// @ts-ignore
import ScrollMagic from 'scrollmagic'
import { IProductData } from '../../../../products'
import './styles.scss';

interface IDetailsSection {
  scrollController: object,
  product: IProductData
}

export const DetailsSection:React.FC<IDetailsSection> = (props) => {
  const { scrollController, product } = props;

  const detailsItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    detailsItemsRef.current.forEach((element:HTMLDivElement) => {
      const scene = new ScrollMagic.Scene({
        reverse: false,
        triggerElement: element,
        triggerHook: .7
      });

      scene.setTween(
        TweenLite
          .from(element, 1, { opacity: 0, y: 20})
          .eventCallback('onComplete', () => scene.destroy())
      )
        .addTo(scrollController);
    });

  }, [scrollController]);

  return (
    <section
      className="product-details-section"
    >
      {product.details.map(({ description, imageUrl, subtitle, title}, i) => (
        <div
          key={i}
          ref={(el) => {el && detailsItemsRef.current.push(el)}}
          className={'product-details-section__detail'}
        >
          <img
            alt={title}
            className="product-details-section__detail-image"
            src={imageUrl}
          />
          <div className="product-details-section__info-wrapper">
            <h2 className="product-details-section__info-title">
              {title}
            </h2>
            <h3 className="product-details-section__info-subtitle">
              {subtitle}
            </h3>
            <p className="product-details-section__info-description">
              {description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
