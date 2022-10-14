import React from 'react'
import Layout from '../../components/layout.js'
import { data } from './sample_data.js'



function NewsItem({ news_item }) {
    return (
        <Layout>
            <section>
                <div>{news_item.title}</div>
                <div>{news_item.description}</div>
            </section>
        </Layout>
    )
}





export async function getStaticPaths() {
    const paths = data.news.map((news_item) => ({
        params: { slug: news_item.slug },
    }))
    return { paths, fallback: false }
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    return {
        // Passed to the page component as props
        // data.news.
        props: { news_item: data.news.find((news_item) => news_item.slug === context.params.slug) },
    }
}

export default NewsItem