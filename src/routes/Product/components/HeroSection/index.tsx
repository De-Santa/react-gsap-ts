import React from 'react';
import { Link } from 'react-router-dom';
import { IProductData } from '../../../../products'
import './styles.scss';

interface IHeroSection {
  product: IProductData
}

export const HeroSection:React.FC<IHeroSection> = (props) => {
  const { product } = props;

  return (
    <section className="product-hero-section">
      <div className="product-hero-section__content">
        <p
          className="product-hero-section__description"
          data-animate="product-description"
        >
          {product.description}
        </p>
        <Link className="product-hero-section__home-link" to="/">
          Back home
        </Link>
      </div>
    </section>
  );
};
