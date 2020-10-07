// import App from 'next/app'

import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle<any>`
  body {
    padding: 10px;
  }
`;

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={{ fontFamily: "Work Sans" }}>
      <Component {...pageProps} />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default MyApp;
