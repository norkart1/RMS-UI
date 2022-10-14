import React from 'react'
import Image from 'next/image'

import SimpleImageSlider from "react-simple-image-slider"; 
import bannerImg from '/public/assets/images/banner_sample.jpg'
import dhiu from '/public/assets/images/dhiu_.png'

import styles from '../styles/component/comp_banner.module.css'
 
import { useEffect, useState } from 'react';
 

 
function banner() {
  const [width , setWidth] = useState(0);
  const [height , setHeight] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

   const images = [
      { url:  bannerImg.src,   },
      { url: dhiu.src, },
    ]
   

 
  return (
    <div className={styles.slide}>
      <SimpleImageSlider
        width={width }
        height={height/1.3}
        images={images}
        showBullets={true}
        showNavs={true}
        navStyle={1}
        slideDuration={1}
        style={{ }}
         
        loop={true}
        autoPlay={true}

      />
    </div>
  )
}

export default banner