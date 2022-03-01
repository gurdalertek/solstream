import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "../providers/MoralisDappProvider/MoralisDappProvider";

const APP_ID = "t6xbULcDW4PqrtojF4BUS4FT6j2p3WTsxkvZzleZ";
const SERVER_URL = "https://s97wx7w8yvhm.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );
  if (isServerInfo)
    return (
      <MoralisProvider
        appId={APP_ID}
        serverUrl={SERVER_URL}
        initializeOnMount={true}
      >
        <MoralisDappProvider>
          {/* <App isServerInfo /> */}
          <Component isServerInfo {...pageProps} />
        </MoralisDappProvider>
      </MoralisProvider>
    );
}

export default MyApp;
