// import React from 'react'
import React, { useState } from 'react';
import Portal_Layout from '../../components/portal/portal_Layout'
import { useGet } from '../../helpers/functions'
import Image from 'next/image'

import UploadForm from '../../components/galleryF/UploadForm'
import ImageGrid from '../../components/galleryF/ImageGrid'
import Modal from '../../components/galleryF/Modal'

function Dashboard() {
  let userDetails
  userDetails = useGet('/user/me', false, false, false, (err) => { }, false)[0]

  const [selectedImg, setSelectedImg] = useState(null);
  // url    user/gallery/
//  post   sessionID
//  post   image
//  post   description

  
   

  return (
    <Portal_Layout activeTabName='Gallery' userType='media'  >
      <div style={{overflowY:"hidden",height:"100%"}}>
        <h1>Gallery</h1>

        <UploadForm />
        <ImageGrid setSelectedImg={setSelectedImg} styels={{height:"80%",overflowY:"scroll"}} />
        { selectedImg && (
          <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
        )}
      </div>
    </Portal_Layout>

  )
}

export default Dashboard