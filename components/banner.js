import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '/styles/component/comp_banner.module.css'
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';


function banner() {
  const useWidth = () => {
    const [width, setWidth] = useState(0); // default width, detect on server.

    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      handleResize()
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);
    return width;
  };
  SwiperCore.use([Autoplay]);
  let slides = [

    {
      id: 2,
      image: {
        lg_image: require('/public/assets/images/banner_sample.jpg').default,
        sm_image: require('/public/assets/images/banner_sample_sm.jpg').default,
      },
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
      spaceBetween={0}

    >
      {slides.map((slide, index) => (
        <SwiperSlide>
          <div className={styles.slide} key={index}>
            {
              useWidth() > 600 ? <Image src={slide.image.lg_image} layout='responsive'></Image> : <Image src={slide.image.sm_image} layout='responsive'></Image>
            }
          </div>
        </SwiperSlide>


      ))}
    </Swiper>



  )

}



export default banner;