import React from "react";
import "./styles.scss";

interface ISliderControlProps {
  onClick: Function,
  isActive: boolean,
  subtitle: string,
  title: string,
}

export const SliderControl = React.forwardRef<any, ISliderControlProps>((props, ref) => {
  const { onClick, isActive, subtitle, title } = props;

  return (
    <button
      ref={ref}
      className={`slider-control ${isActive ? 'slider-control--is-active' : ''}`}
      onClick={() => onClick()}
    >
      <span className="slider-control__title">{title}</span>
      <span className="slider-control__subtitle">{subtitle}</span>
    </button>
  );
});
