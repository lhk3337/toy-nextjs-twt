import { AppProps } from "next/app";
import Head from "next/head";
import { SWRConfig } from "swr";
import "../global.css";
import favicon from "../public/favicon.ico";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((response) => response.json()),
      }}
    >
      <Head>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
