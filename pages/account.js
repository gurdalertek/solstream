import Head from "next/head";

import Overview from "../components/Account/Overview";
import Header from "../components/TopEnd/Header";
import Navbar from "../components/TopEnd/Navbar";

export default function Account() {
  return (
    <div>
      <Head>
        <title>SOLSTREAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <Overview />
    </div>
  );
}
