import React, {useState, useEffect } from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';
//import { Link } from 'react-router-dom'

export default function SlideShow( {slides} ) {
  useEffect(() => {
  }, [slides])

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    console.log(slides.length)
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slidesShow = slides.map((item,i) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={i}
      >
        <img src={item.image && `http://localhost:3000/images/advertisement/${item.image}`} alt={"Slide " + i} width={window.innerWidth} height='600px'/>
      </CarouselItem>
    );
  });

  return (
    <div>
      { slides && 
          <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          interval={10000}
          stopOnHover={true}
          useKeyboardArrows={true}
        >
          <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slidesShow}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      }
    </div>
  )
}
