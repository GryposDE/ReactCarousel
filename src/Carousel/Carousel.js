
import React from 'react';
import { useCallback, useEffect, useRef, useState } from "react";
import './Carousel.css';

// Source: https://github.com/monsterlessonsacademy/monsterlessonsacademy/blob/278-advanced-react-slider/src/ImageSlider.js


function Carousel({ slides, parentWidth }) {

    const timerRef = useRef(null);

    const [previousIndex, setPreviousIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);

    // Go to previous slide
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      var newIndex = isFirstSlide ? slides.length : currentIndex - 1;

      let carousel = document.getElementById("CarouselSlideView");
      carousel.style.transition = (isFirstSlide) ? 'transform ease-out 0s' : 'transform ease-out 0.8s';

      setPreviousIndex(currentIndex);
      setCurrentIndex(newIndex);
    };

    // Go to next slide
    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length + 1;
        var newIndex = isLastSlide ? 1 : currentIndex + 1;

        let carousel = document.getElementById("CarouselSlideView");  
        carousel.style.transition = (isLastSlide) ? 'transform ease-out 0s' : 'transform ease-out 0.8s';

        setPreviousIndex(currentIndex);
        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);

    // Go to a slide
    const goToSlide = (slideIndex) => {
      setPreviousIndex(currentIndex);
      setCurrentIndex(slideIndex);
    };

    // Switches between edges of the carousel
    const doOverflow = () => {
      let carousel = document.getElementById("CarouselSlideView");  

      if( (currentIndex === 0) && (previousIndex === 1) )
      {
        carousel.style.transition = 'transform ease-out 0s';
        carousel.style.transform = `translateX(${-((slides.length) * parentWidth)}px)`
        setCurrentIndex(slides.length);
      }

      if( (currentIndex === slides.length+1) && (previousIndex === slides.length))
      {
        carousel.style.transition = 'transform ease-out 0s';
        carousel.style.transform = `translateX(${-((1) * parentWidth)}px)`
        setCurrentIndex(1);
      }
    };

    // Selects which dot is selected
    const isSlideSelected = (slideIndex) => {
      if(((currentIndex - 1) % slides.length) === slideIndex)
      {
        return 'gray';
      }

      if( (currentIndex === 0) && (slideIndex === slides.length -1) )
      {
        return 'gray';
      }

      return 'black';
    }

  
    // Automatic switch slides every 2 sec
    useEffect(() => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        goToNext();
      }, 2000);
  
      return () => clearTimeout(timerRef.current);
    }, [goToNext]);


    return (
      <div className='Carousel' style={{width:`${parentWidth}px`}}>
        {/* <h5> previousIndex = {previousIndex} </h5> */}
        {/* <h5> currentIndex = {currentIndex} </h5> */}

        {/* Arrow keys to manually move slide left/right */}
        <div>
          <div className='leftArrow' onClick={goToPrevious}>
            ❰
          </div>

          <div className='rightArrow' onClick={goToNext} >
            ❱
          </div>
        </div>

        {/* Show current slide */}
        <div className='CarouselView' style={{width:`${parentWidth}px`}}>
            <div className='CarouselSlideView' id='CarouselSlideView' style={{transform: `translateX(${-((currentIndex) * parentWidth)}px)`}} onTransitionEnd={doOverflow}>

                <div className='CarouselSlide'> 
                    <img src={slides[slides.length-1].src} style={{objectFit: 'cover', width: `${parentWidth}px`}} alt={slides[slides.length-1].alt} ></img>
                </div>

                {slides.map((_, slideIndex) => (
                <div className='CarouselSlide' key={slideIndex}> 
                    <img src={slides[slideIndex].src} style={{objectFit: 'cover', width: `${parentWidth}px`}} alt={slides[slideIndex].alt} ></img>
                </div>
                ))}

                <div className='CarouselSlide'> 
                    <img src={slides[0].src} style={{objectFit: 'cover', width: `${parentWidth}px`}} alt={slides[0].alt} ></img>
                </div>

          </div>
        </div>

        {/* Select slide via dot menu */}
        <div className='CarouselDotSelection'>
          {slides.map((slide, slideIndex) => (
            <div className='CarouselDot' key={slideIndex} onClick={() => goToSlide(slideIndex+1)} style={{color:isSlideSelected(slideIndex)}}>
              ●
            </div>
          ))}
        </div>

      </div>
    );
  };

export default Carousel;
