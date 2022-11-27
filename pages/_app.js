import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar';

import ReactGA from 'react-ga';
const TRACKING_ID = "G-F5MVYGVWTX"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  return <>
    <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
    <Component {...pageProps} />
  </>
}

export default MyApp
