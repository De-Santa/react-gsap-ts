import React, { useMemo, useRef, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  TweenMax,
  TimelineMax,
  TimelineLite
} from 'gsap';
// @ts-ignore
import ScrollMagic from '../../../node_modules/scrollmagic'
import '../../../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'
import { IProductData, products } from '../../products'
import { HeroSection } from './components/HeroSection'
import './simplebar.css';
import './styles.scss';

type TMatchParams = {
  id:string
}

export const Product:React.FC<RouteComponentProps<TMatchParams>> = (props) => {
  const { match } = props;

  const { current: productId } = useRef<string>(match.params.id);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
      triggerElement: heroRef.current
    })
      .setTween(heroContentRef.current, 0.5, {backgroundColor: "green", scale: 2.5}) // trigger a TweenMax.to tween
      // .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
      .addTo(controller);
  }, []);

  const product = useMemo<IProductData>(
    () => products.find((product) => product.id === productId) || products[0],
    [productId]
  );

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
      <div className="product__content">
        <HeroSection product={product} />
        <div ref={heroRef} style={{ height: '100vh', position: 'relative'}}>
          <div ref={heroContentRef} style={{fontSize: '40px', color: 'white'}}>
            sup
          </div>
        </div>
      </div>
    </div>
  );
};
