import React, { useRef, useMemo } from 'react';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IProduct, products } from '../../products'
import './styles.scss';

type TMatchParams = {
  id: string
}

const ProductTransition:React.FC<RouteComponentProps> = (props) => {
  const { children, match } = props;

  // const { current: tl } = useRef<TimelineLite>(new TimelineLite());

  return (
    <Transition
      addEndListener={(node, done) => {
        const imageFade = node.getElementsByClassName(
          'product__image-fade'
        )[0];

        if (match !== null) {
          const tl = new TimelineLite({ delay: .5 });
          tl.call(console.log, ['enter product', node])
            .set(imageFade, {
              backgroundColor: '#000000',
              opacity: .9
            })
            .to(imageFade, .5, {
              backgroundColor: '#150d05',
              opacity: .6
            });
        } else {
          const tl = new TimelineLite();
          tl.call(console.log, ['exit product', node])
            .set(node, { zIndex: 1 })
            .set(imageFade, {
              backgroundColor: '#150d05',
              opacity: .6
            })
            .to(imageFade, .5, {
              backgroundColor: '#000000',
              opacity: .9
            })
            .set(node, { opacity: 0 })
        }
      }}
      in={match !== null}
      mountOnEnter={true}
      timeout={1000}
      unmountOnExit={true}
    >
      {children}
    </Transition>
  )
};

const ProductComponent:React.FC<RouteComponentProps<TMatchParams>> = (props) => {
  const { match } = props;

  const { current: productId} = useRef<string | null>(match && match.params.id);

  const product = useMemo<IProduct | undefined>(
    () => products.find((product) => product.id === productId),
    [productId]
  );

  return (
    <div className="product page">
      { product && (
        <>
          <div className="product__image-wrapper">
            <img src={product.imageUrl} alt={product.title} className="product__image"/>
            <div className="product__image-fade" />
          </div>
          <div className="product__content">
            Product test, { productId }
            {product.description}<br />
            <Link to="/">Back home</Link>
          </div>

        </>
      )}
    </div>
  );
};

export const Product:React.FC<RouteComponentProps<TMatchParams>> = (props) => {
  return (
    <ProductTransition {...props}>
      <ProductComponent {...props} />
    </ProductTransition>
  )
};
