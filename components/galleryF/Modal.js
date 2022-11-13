import React from 'react';
import { motion } from 'framer-motion';
import style from '../../styles/component/galleryF/gallery.module.css';

const Modal = ({ setSelectedImg, selectedImg }) => {

  const handleClick = (e) => {
    if (e.target.classList.contains(`${style.backdrop}`)) {
      setSelectedImg(null);
    }
  }

  return (
    <motion.div className={style.backdrop} onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img src={selectedImg} alt="enlarged pic" 
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
    </motion.div>
  )
}

export default Modal;