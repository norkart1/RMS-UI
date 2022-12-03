import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';

import ReactGA from 'react-ga';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from "next/script"


const TRACKING_ID = "G-F5MVYGVWTX"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {

    if (localStorage.getItem('developer') !== 'true' && router.pathname != '/developer_true' && window.location.host != 'sibaq.in') router.push('https://sibaq.in')
  }, [])
  return <>
    <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-T27XKV27T1" />
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-T27XKV27T1', {
page_path: window.location.pathname,
});
`,
      }}
    />
    <Head>

      <link rel="icon" href="/assets/images/favicon.ico" />
    </Head>
    <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
    <Component {...pageProps} />
  </>
}

export default MyApp
