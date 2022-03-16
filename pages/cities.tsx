import Head from "next/head";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Header from "../components/TopEnd/Header";
import Navbar from "../components/TopEnd/Navbar";
import Cities from "../components/Channels/Cities";

export default function Home() {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    Moralis,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

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
