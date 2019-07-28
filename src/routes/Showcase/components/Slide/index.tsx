import React, { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom'
import "./styles.scss";

interface ISlideProps {
  productLink: string,
  slideData: any
}

export const Slide = React.forwardRef<any, ISlideProps>((props, ref) => {
  const {
    productLink,
    slideData: { title, description, imageUrl }
  } = props;

  const titleRef = useRef<HTMLHeadingElement>(null);

  const [descriptionWidth, setDescriptionWidth] = useState('auto');

  /** title width equal to description width **/
  useLayoutEffect(
    () => {
      const title = titleRef.current;
      setDescriptionWidth(title ? `${title.offsetWidth}px` : 'auto')
    },
    []
  );

  return (
    <div
      ref={ref}
      className="slide"
      style={{opacity: 0}}
    >
      <div className="slide__image-wrapper">
        <img className="slide__image" src={imageUrl} alt={title} />
      </div>
      <div className="slide__content">
        <h2
          ref={titleRef}
          className="slide__title"
        >
          {title}
        </h2>
        <p
          className="slide__description"
          style={{maxWidth: descriptionWidth}}
        >
          {description}
        </p>
        <Link
            className="slide__link"
            to={productLink}
        >
          More
        </Link>
      </div>
    </div>
  );
});
