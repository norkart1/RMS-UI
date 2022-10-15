import Head from "next/head";
import Image from "next/image";

import LandingPage from "./home";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Sibaq-22</title>
        <meta name="sibaq" content=" sibaq national art fest " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage/>
    </div>
  );
}
