import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';

import ReactGA from 'react-ga';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const TRACKING_ID = "G-F5MVYGVWTX"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('developer') !== 'true' && router.pathname != '/developer_true' && window.location.host != 'sibaq.in') router.push('http://sibaq.in')
  }, [])
  return <>
    <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
    <Component {...pageProps} />
  </>
}

export default MyApp
