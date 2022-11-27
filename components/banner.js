import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '/styles/component/comp_banner.module.css'
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import Link from 'next/link';
import { useRouter } from 'next/router';


function banner() {
  const useWidth = () => {
    const [width, setWidth] = useState(0); // default width, detect on server.

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      handleResize()
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width;
  };
  SwiperCore.use([Autoplay]);
  let slides = [
    {
      id: 1,
      link: '#',
     
      image: {
        lg_image: require("/public/assets/banners/welcome_lg.png").default,
        sm_image: require("/public/assets/banners/welcome_sm.png").default,
      },
    },
    {
      id: 1,
      link: '/public_portal/elimination_results',
      button_text: 'Go to Results',
      image: {
        lg_image: require("/public/assets/banners/result_lg.jpg").default,
        sm_image: require("/public/assets/banners/result_sm.jpg").default,
      },
    },
    {
      id: 1,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/host1.jpg").default,
        sm_image: require("/public/assets/banners/host1_sm.jpg").default,
      },
    },
    {
      id: 1,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/host2.jpg").default,
        sm_image: require("/public/assets/banners/host2_sm.jpg").default,
      },
    },
    {
      id: 1,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/host3.jpg").default,
        sm_image: require("/public/assets/banners/host3_sm.jpg").default,
      },
    },
    {
      id: 1,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/host4.jpg").default,
        sm_image: require("/public/assets/banners/host4_sm.jpg").default,
      },
    },
    {
      id: 1,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/host5.jpg").default,
        sm_image: require("/public/assets/banners/host2_sm.jpg").default,
      },
    },
    {
      id: 1,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/art.jpg").default,
        sm_image: require("/public/assets/banners/art_sm.jpg").default,
      },
    },
    {
      id: 2,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/banner_sample.jpg").default,
        sm_image: require("/public/assets/banners/banner_sample_sm.jpg").default,
      },
    },

    {
      id: 3,
      link: '#',
      image: {
        lg_image: require("/public/assets/banners/counts.jpg").default,
        sm_image: require("/public/assets/banners/counts_sm.jpg").default,
      },
    },

  ]


  const handleOnload = () => {
    let tl = gsap.timeline({ defaults: { ease: 'power1.out' } });
    tl.to('.banner_slides', { duration: 1, left: '100px' });
  }
  const router = useRouter();

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
        <SwiperSlide key={index}>

          <div className={styles.slide}  >

            {
              useWidth() > 600 ? <Image src={slide.image.lg_image} layout='responsive' alt="sibaq 22 Banner Images"></Image> : <Image src={slide.image.sm_image} layout='responsive' alt="sibaq 22 Banner Images"></Image>
            }

            {slide.button_text && <button
              style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, left: 'auto', right: '10px', margin: '2rem', padding: '1rem', borderRadius: '5px', border: 'none', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => router.push(slide?.link)}>{slide.button_text}</button>}
          </div>

        </SwiperSlide>


      ))}
    </Swiper>



  )

}



export default banner;