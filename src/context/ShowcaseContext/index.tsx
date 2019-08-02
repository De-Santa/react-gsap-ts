import React, { createContext, useCallback, useState } from 'react';

const setInitialSlide = (slideNum: number):void => {
  window.sessionStorage.setItem('initialSlide', slideNum.toString())
};

const getInitialSlide = ():number => {
  const slide = window.sessionStorage.getItem('initialSlide');
  return slide ? +slide : 0
};

interface IShowcaseContext {
  currentSlide: number;
  handleSlideChange: (...args: any[]) => void;
}

const ShowcaseContext = createContext<IShowcaseContext>({
  currentSlide: 0,
  handleSlideChange: (slideNum: number) => null
});

const ShowcaseProvider:React.FC = (props) => {
  const { children } = props;

  const [currentSlide, setCurrentSlide] = useState<number>(getInitialSlide);

  const handleSlideChange = useCallback(
    (slideNum:number):void => {
      setInitialSlide(slideNum);
      setCurrentSlide(slideNum)
    },
    []
  );

  return (
    <ShowcaseContext.Provider value={{ currentSlide, handleSlideChange }}>
      {children}
    </ShowcaseContext.Provider>
  );
};

export { ShowcaseContext, ShowcaseProvider };
