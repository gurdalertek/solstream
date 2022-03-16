import Head from "next/head";
import Header from "../components/TopEnd/Header";
import Navbar from "../components/TopEnd/Navbar";
import Culture from "../components/Channels/Culture";

export default function Home() {
  return (
    <div>
      <Head>
        <title>SOLSTREAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <Culture />
    </div>
  );
}
