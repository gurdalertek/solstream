import Head from "next/head";
import Header from "../components/TopEnd/Header";
import Navbar from "../components/TopEnd/Navbar";
import Cities from "../components/Channels/Cities";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SOLSTREAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <Cities />
    </div>
  );
}
