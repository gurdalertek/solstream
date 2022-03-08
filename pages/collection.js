import Head from "next/head";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Uploads from "../components/Collection/Uploads";
import Header from "../components/TopEnd/Header";
import Navbar from "../components/TopEnd/Navbar";

export default function Collection() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  // if (!isAuthenticated) return <Login />;
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
