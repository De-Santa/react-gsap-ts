import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';
import { TimelineLite } from 'gsap';
import { Link } from 'react-router-dom'
import './styles.scss';

interface IProductTransition {
  match: any
}

const ProductTransition: React.FC<IProductTransition> = (props) => {
  const { children, match } = props;

  const { current: tl } = useRef(new TimelineLite());

  return (
    <Transition
      addEndListener={(node, done) => {
        if (match !== null) {
          tl.from(node, .6, {
            opacity: 0,
            onComplete: done
          });
        } else {
          tl.to(node, .6, {
            opacity: 0,
            onComplete: done
          });
        }
      }}
      in={match !== null}
      mountOnEnter={true}
      timeout={6000}
      unmountOnExit={true}
    >
      {children}
    </Transition>
  )
};


interface IProductComponent {
  match: any
}

const ProductComponent: React.FC<IProductComponent> = (props) => {
  const { match } = props;

  const productId = useRef(match && match.params.id);

  return (
    <div className="product page">
      <div className="product__content">
        Product test, { productId.current }
      </div>
      <Link to="/">Back home</Link>
    </div>
  );
};


interface IProduct {
  match: any
}

export const Product: React.FC<IProduct> = (props) => {
  const { match } = props;
  return (
    <ProductTransition match={match}>
      <ProductComponent match={match}/>
    </ProductTransition>
  )
};
