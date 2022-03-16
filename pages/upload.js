import Head from "next/head";
import Header from "../components/TopEnd/Header";
import Navbar from "../components/TopEnd/Navbar";
import MintItems from "../components/Upload/MintItems";

export default function Upload() {
  return (
    <div>
      <Head>
        <title>SOLSTREAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <MintItems />
    </div>
  );
}
