import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import {img} from './images/data'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import classes from './Carousel.module.css'

function CarouselEffect() {
  return (
    <div>
      <Carousel
      showThumbs={false}
      infinityLoop={true}
      autoPlay={true}
      showIndicators={false}
      >
        {
        img.map((imageItemLink, index)=>{
          return <img src={imageItemLink}
          key={index}
          
          />
        })
      }
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  )
}

export default CarouselEffect
