import React, { createContext, useState } from 'react';

const setInitialSlide = (slideNum: number) => {
  window.sessionStorage.setItem('initialSlide', slideNum.toString())
};

const getInitialSlide = () => {
  console.log('get initial slide run');
  const slide = window.sessionStorage.getItem('initialSlide');
  return slide ? +slide : 0
};

const ShowcaseContext = createContext(null);

const ShowcaseProvider = ({ children }: any) => {
  const [currentSlide, setCurrentSlide] = useState(getInitialSlide);

  const handleSlideChange = (slideNum: number) => {
    setInitialSlide(slideNum);
    setCurrentSlide(slideNum)
  };

  return (
    <ShowcaseContext.Provider
      // @ts-ignore
      value={{
        currentSlide,
        handleSlideChange
      }}
    >
      {children}
    </ShowcaseContext.Provider>
  );
};

export { ShowcaseContext, ShowcaseProvider };
