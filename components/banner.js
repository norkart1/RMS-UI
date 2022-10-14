import React from 'react'
import Image from 'next/image'
import bannerImg from '../public/assets/banner_sample.jpg'
function banner() {
  return (
    <div>
        <Image src={bannerImg} layout={'responsive'}></Image>
    </div>
  )
}

export default banner