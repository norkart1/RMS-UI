import React from 'react'
import Layout from '../components/layout'
import styles from "../styles/gallery.module.css"
import { useRouter } from 'next/router'


function Gallery() {

    const images = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            width: '150',
            height: '150',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
            width: '200',
            height: '200',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            width: '150',
            height: '100',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dXJsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1665574519755-8defe71f409d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDF8cVBZc0R6dkpPWWN8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60',
            width: '2rem',
            height: '300',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1665422668725-a26fd45ed24a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDExfHFQWXNEenZKT1ljfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 9,
            url: 'https://images.unsplash.com/photo-1665347249761-658102c63bea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE5fHFQWXNEenZKT1ljfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            width: '257',
            height: '3rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 10,
            url: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZCUyMHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 11,
            url: 'https://images.unsplash.com/photo-1552083375-1447ce886485?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZCUyMHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
            width: '2rem',
            height: '4rem',
            likes: 5,
            description:'somthing got here in the description'
        },
        {
            id: 12,
            url: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGFuZCUyMHNjYXBlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
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
                            <article style={{ gridColumnEnd: `span ${getSpanEstimate(img.width)}`, gridRowEnd: `span ${getSpanEstimate(img.height)}`, }} className={styles.imageContainer} key={img.id}>
                                <img className={styles.img} src={img.url} alt={img.alt} loading="lazy" />
                                <p className={styles.description}>{img.description}</p>
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