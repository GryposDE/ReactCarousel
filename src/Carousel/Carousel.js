
import React from 'react';
import { useCallback, useEffect, useRef, useState } from "react";
import './Carousel.css';

// Source: https://github.com/monsterlessonsacademy/monsterlessonsacademy/blob/278-advanced-react-slider/src/ImageSlider.js


function Carousel({ slides, parentWidth }) {

    const timerRef = useRef(null);

    const [currentIndex, setCurrentIndex] = useState(1);

    // go to previous slide
    const goToPrevious = () => {
      const isFirstSlide = currentIndex === 0;
      var newIndex = isFirstSlide ? slides.length : currentIndex - 1;

      let carousel = document.getElementById("CarouselSlideView");
      if(isFirstSlide)
      {      
        carousel.style.transition = 'transform ease-out 0s';
      }
      else
      {
        carousel.style.transition = 'transform ease-out 0.8s';
      }

      setCurrentIndex(newIndex);
    };

    // go to next slide
    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === slides.length +1;
        var newIndex = isLastSlide ? 1 : currentIndex + 1;

        let carousel = document.getElementById("CarouselSlideView");        
        if(isLastSlide)
        {
            carousel.style.transition = 'transform ease-out 0s';
        }
        else
        {
            carousel.style.transition = 'transform ease-out 0.8s';
        }

        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);

    // go to a slide
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };

  
    // automatic switch slides every 2 sec
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
      <div className='Carousel'>
        <h2> {currentIndex} </h2>

        {/* Arrow keys to manually move slide left/right */}
        <div>
          <div className='leftArrow' onClick={goToPrevious} >
            ❰
          </div>

          <div className='rightArrow' onClick={goToNext} >
            ❱
          </div>
        </div>

        {/* show current slide */}
        <div className='CarouselView'>
            <div className='CarouselSlideView' id='CarouselSlideView' style={{transform: `translateX(${-((currentIndex) * parentWidth)}px)`, transition: 'transform ease-out 0.8s'}}>

                <div className='CarouselSlide'> 
                    <img src={slides[slides.length-1]} style={{objectFit: 'cover', width: '500px'}} alt={'image_first'} ></img>
                </div>

                {slides.map((_, slideIndex) => (
                <div className='CarouselSlide' key={slideIndex}> 
                    <img src={slides[slideIndex]} style={{objectFit: 'cover', width: '500px'}} alt={'image'+slideIndex} ></img>
                </div>
                ))}

                <div className='CarouselSlide'> 
                    <img src={slides[0]} style={{objectFit: 'cover', width: '500px',}} alt={'image_last'} ></img>
                </div>

          </div>
        </div>

        {/* Select slide via dot menu */}
        <div className='CarouselDotSelection'>
          {slides.map((slide, slideIndex) => (
            <div className='CarouselDot' key={slideIndex} onClick={() => goToSlide(slideIndex+1)}>
              ●
            </div>
          ))}
        </div>

      </div>
    );
  };

export default Carousel;
