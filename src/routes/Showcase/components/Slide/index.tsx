import React, { useRef, useState, useLayoutEffect } from "react";
import "./styles.scss";

interface ISlideProps {
  slideData: any
}

export const Slide = React.forwardRef<any, ISlideProps>((props, ref) => {
  const { slideData: { title, description, imageUrl } } = props;

  const titleRef = useRef<HTMLHeadingElement>(null);

  const [descrWidth, setDescrWidth] = useState('auto');

  useLayoutEffect(
    () => {
      const title = titleRef.current;
      setDescrWidth(title ? `${title.offsetWidth}px` : 'auto')
    },
    []
  )

  return (
    <div
      key={title}
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
          style={{maxWidth: descrWidth}}
        >
          {description}
        </p>
        <a className="slide__link" href="/">
          More
        </a>
      </div>
    </div>
  );
});
