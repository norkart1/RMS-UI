import Head from 'next/head'
import Image from 'next/image'
 
import LandingPage from "./home";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Sibaq</title>
        <meta  name="keywords" content="Sibaq, sibaq, sibaq-22 ,art fest ,sibaq.in , darul huda, "/>  
        <meta property="" />
        <meta name="author" content="Darul Huda Islamic University" />
        <meta property="og:url" content="https://www.sibaq.in" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sibaq" />

        <meta name="og:decription" content="Darul Huda Sibaq is the national art fest of DHIU 
        and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help,
         promote and develop educational activities of concerned students. " />
         <meta name="description" content="Darul Huda Sibaq is the national art fest of DHIU"/>
        <link rel="icon" href="/assets/images/logo.png" />
      </Head>
      <LandingPage/>
    </div>
  );
}
