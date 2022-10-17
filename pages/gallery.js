import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/gallery.module.css"
import { useRouter } from 'next/router'


function Gallery() {

    const images = [
        {
            id: 1,
            url: 'assets/images/banner_sample.jpg',
            width: '300',
            height: '200',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 2,
            url: 'assets/images/dh.png',
            width: '2rem',
            height: '400',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 3,
            url: 'assets/images/logo.png',
            width: '257',
            height: '300',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 4,
            url: 'assets/images/user_sample.jpg',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 5,
            url: 'assets/images/whitehouse.jpg',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 6,
            url: 'assets/images/logo.png',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 7,
            url: 'assets/images/dhiu.png',
            width: '2rem',
            height: '300',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 8,
            url: 'assets/images/sampleY.png',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 9,
            url: 'assets/images/logo.png',
            width: '257',
            height: '3rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 10,
            url: 'assets/images/dh.png',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 11,
            url: 'assets/images/logo.png',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 12,
            url: 'assets/images/logo.png',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
    ]
    function getSpanEstimate(size) {
        if (size > 200) {
            return 2
        }
        return 1
    };

    const router = useRouter();
    return (
        <Layout title='Gallery'>
            <section className={styles.gallery}>
                <div className={`${styles.container} container`}>
                    {
                        images.map((img) => (
                            <div style={{ gridColumnEnd: `span ${getSpanEstimate(img.width)}`, gridRowEnd: `span ${getSpanEstimate(img.height)}`, }} className={styles.imageContainer} key={img.id}>
                                <img className={styles.img} src={img.url} alt={img.alt} />
                                <p className={styles.description}>{img.description}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Layout>

    )
}

export default Gallery