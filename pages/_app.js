import '../styles/globals.css'

import ReactGA from 'react-ga';
const TRACKING_ID = "G-F5MVYGVWTX"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
