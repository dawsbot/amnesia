import Head from "next/head";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle<any>`
  body {
    padding: 0px;
    margin: 0px;
  }
`;

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={{ fontFamily: "Work Sans" }}>
      <Head>
        <title>Amnesia | Notes that get rid of themselves</title>
        <meta
          name="description"
          content={`Tech should always be helpful, or get out of the way. These notes delete themselves at the end of every day, so you never have to deal with that out-of-date information!`}
        />
      </Head>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
