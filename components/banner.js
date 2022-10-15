import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '/styles/component/comp_banner.module.css'
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';




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


  return (
    <Swiper
      loop={true}
      speed={1000}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      spaceBetween={20}

    >
      {slides.map((slide, index) => (
        <SwiperSlide>
          <div className={styles.slide} key={index}>
            <Image src={slide.image} layout='responsive'></Image>
          </div>
        </SwiperSlide>


      ))}
    </Swiper>



  )

}



export default banner;