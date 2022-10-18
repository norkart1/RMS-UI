import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/gallery.module.css"
import { useRouter } from 'next/router'
import Image from 'next/image'


function Gallery() {

    const images = [
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g2.png').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g1.webp').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g2.png').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g2.png').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        
        {
            id: 1,
            image: require('../public/assets/sample/g2.png').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g2.png').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 1,
            image: require('../public/assets/sample/g3.png').default,
            likes: 5,
            description:'somthing got here in the description'
        },
        
    ]
    function getSpanEstimate(height, width) {
        if (height > width) {
            return {
                gridRowEnd: `span ${Math.ceil(height / 10)}`,
                gridColumnEnd: `span ${Math.ceil(width / 10)}`,
            }
        }
        else{
            return {
                gridRowEnd: `span ${Math.ceil(height / 10)}`,
                gridColumnEnd: `span ${Math.ceil(width / 10)}`,
            }
        }
    };

    const router = useRouter();
    return (
        <Layout title='Gallery'>
            <section className={styles.gallery}>
                <div className={`${styles.container} container`}>
                    {
                        images.map((img) => (
                            <article style={{ gridColumnEnd: `span ${getSpanEstimate(img.image.width)}`, gridRowEnd: `span ${getSpanEstimate(img.image.height)}`, }} className={styles.imageContainer} key={img.id}>
                                {/* <img className={styles.img} src={img.url} alt={img.alt} loading="lazy" /> */}
                                <Image className={styles.img} src={img.image} layout='responsive' ></Image>
                                {/* <p className={styles.description}>{img.description}</p> */}
                            </article>
                        ))
                        // images.map((img) => (
                        //     <article className={styles.imageContainer} key={img.id}>
                        //         <img className={styles.img} src={img.url} alt={img.alt} loading="lazy" />
                        //         <p className={styles.description}>{img.description}</p>
                        //     </article>
                        // ))
                    }
                </div>
            </section>
        </Layout>

    )
}

export default Gallery