import React, { useEffect, useState } from 'react';// import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import style from '../../styles/component/galleryF/gallery.module.css'
import { BaseApi } from '../../helpers/functions';




const ImageGrid = ({ setSelectedImg, styels }) => {
  const [images,setImages] = useState(null);
  // const { docs } = useFirestore('images');
  useEffect(()=>{
    loadImages();
  },[])

  const loadImages = async ()=>{
    BaseApi.get('/Public/media/gallery')
    .then((res)=>{
      if(res.data.success) setImages(res.data.data)
    })
  }

  return (
    <div className={style.imgGrid} style={styels}>
      {images && images.map(image => (
        <motion.div className={style.imgWrap} key={image.id} 
          layout
          whileHover={{ opacity: 1 }}s
          onClick={() => setSelectedImg(image.file.url)}
        >
          <motion.img src={image.file.url} alt={`${image.imageCaption}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid;