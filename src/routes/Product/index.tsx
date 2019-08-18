import React, { useMemo, useRef, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
// @ts-ignore
import ScrollMagic from 'scrollmagic';
import 'animation.gsap';
import 'debug.addIndicators';
import { IProductData, products } from '../../products';
import { DetailsSection } from './components/DetailsSection';
import { HeroSection } from './components/HeroSection';
import './styles.scss';

type TMatchParams = { id:string }

export const Product:React.FC<RouteComponentProps<TMatchParams>> = (props) => {
  const { match } = props;

  const { current: productId } = useRef<string>(match.params.id);

  const scrollMagicController = useRef(new ScrollMagic.Controller());

  const product = useMemo<IProductData>(
    () => products.find((product) => product.id === productId) || products[0],
    [productId]
  );

  useEffect(() => {
    const controller = scrollMagicController.current;
    return () => controller.destroy()
  }, []);

  return (
    <div className="product page">
      <div className="product__image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="product__image"
        />
        <div
          className="product__image-fade"
          data-animate="fade-element"
        />
      </div>
      <div
        className="product__content"
        data-animate="content"
      >
        <HeroSection
          product={product}
        />
        <DetailsSection
          scrollController={scrollMagicController.current}
          product={product}
        />
      </div>
    </div>
  );
};
