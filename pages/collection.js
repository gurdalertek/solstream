import Head from "next/head";
import Uploads from "../components/Collection/Uploads";
import Header from "../components/TopEnd/Header";
import Navbar from "../components/TopEnd/Navbar";

export default function Collection() {
  return (
    <div>
      <Head>
        <title>SOLSTREAM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Navbar />
      <Uploads />
    </div>
  );
}
