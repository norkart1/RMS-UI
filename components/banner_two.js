import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import SimpleImageSlider from "react-simple-image-slider";
import bannerImg from '/public/assets/images/banner_sample.jpg'
import dhiu from '/public/assets/images/dhiu_.png'

import styles from '/styles/component/comp_banner.module.css'
import gsap from 'gsap';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';


// import { useEffect, useState } from 'react';



function banner() {
  SwiperCore.use([Autoplay]);
  const [started, setStarted] = useState(false)
  let slides = [
    {
      id: 1,
      image: require('/public/assets/images/banner_sample.jpg').default,
    },
    {
      id: 2,
      image: require('/public/assets/images/banner_sample.jpg').default,
    },
    {
      id: 3,
      image: require('/public/assets/images/banner_sample.jpg').default,
    },
  ]


  const handleOnload = () => {
    console.log('working');
    let tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    tl.to('.banner_slides', { duration: 1, left: '100px' });
  }

  // setStarted(true)

  return (
    // <div id='banner' className={styles.banner_slides} style={{ width: `${slides.length * 100}vw` }}
    //   onLoad={handleOnload}>
    <Swiper
      loop={true}
      speed= {1000}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      spaceBetween={20}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map((slide, index) => (
        <SwiperSlide>
          <div className={styles.slide} key={index}>
            {/* <div className={styles.sample}>{slide.id}</div> */}
            <Image src={slide.image} layout='responsive'></Image>
          </div>
        </SwiperSlide>


      ))}
    </Swiper>


    // </div>

  )

}



export default banner;