import React, { useState } from 'react';
import ImageGrid from '../components/galleryF/ImageGrid'
import Modal from '../components/galleryF/Modal'
import Layout from '../components/layout'
import styles from "../styles/explore.module.css"
import { useRouter } from 'next/router'
// import Image from 'next/image'

// import Album from '../components/gallery'

function Gallery() {

    const router = useRouter();
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <Layout title='Gallery'>
            <section className={styles.gallery}>
                <ImageGrid setSelectedImg={setSelectedImg} />
                { selectedImg && (
                <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                )}
            </section>
        </Layout>

    )


    
}

export default Gallery

