import React from 'react'
import Style from './MainSlider.module.css'
import slide1 from '../../Assets/images/slider-image-2.jpeg'
import slide2 from '../../Assets/images/slider-image-1.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import blog1 from '../../Assets/images/slider-image-1.jpeg'
import blog2 from '../../Assets/images/slider-image-3.jpeg'

import Slider from 'react-slick'


export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  return <>
    <div className={ `row gx-0 py-2 mb-3`}>
      <div className={`col-md-9 ${Style.bigSlider}`}>
        <Slider {...settings}>
          <img src={slide1} alt="slide1" className={`${Style.bigImg} w-100`} height={400}/>
          <img src={slide2} alt="slide2" className={`${Style.bigImg} w-100`} height={400}/>
          <img src={slide3} alt="slide3" className={`${Style.bigImg} w-100`} height={400}/>
        </Slider>
      </div>
      <div className={`col-md-3 ${Style.smallSlider}`}>
        <img src={blog1} alt="blog1" className={`${Style.smallImg} w-100`} height={200}/>
        <img src={blog2} alt="blog1" className={`${Style.smallImg} w-100`} height={200}/>
      </div>
    </div>
  </>
}
