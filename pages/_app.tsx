import Head from "next/head";
import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0px;
    margin: 0px;
    height: 100%;
  }

  div#__next {
    height: 100%;
  }

  * {
    font-family: 'Fira Code', monospace;
  }
`;

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>Amnesia | Notes that get rid of themselves</title>
        <meta
          name="description"
          content={`Tech should always be helpful, or get out of the way. These notes delete themselves at the end of every day, so you never have to deal with that out-of-date information!`}
        />
        <link
          rel="icon"
          type="image/png"
          href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/shocked-face-with-exploding-head_1f92f.png"
        />
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </>
  );
}

export default MyApp;
