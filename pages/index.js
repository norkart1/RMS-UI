import Head from 'next/head'
import Image from 'next/image'
 
import LandingPage from "./home";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Sibaq-22</title>
        <meta name="sibaq" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
        <link rel="icon" href="/assets/images/logo.png" />
      </Head>
      <LandingPage/>
    </div>
  );
}
