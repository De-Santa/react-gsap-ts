import React, { useMemo, useRef } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IProductData, products } from '../../products'
import './styles.scss';

type TMatchParams = {
  id:string
}

export const Product:React.FC<RouteComponentProps<TMatchParams>> = (props) => {
  const { match } = props;

  const { current: productId } = useRef<string>(match.params.id);

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
        Product test, { product.id }
        product.description<br />
        <Link to="/">Back home</Link>
      </div>
    </div>
  );
};
