import { ThemeProvider } from "theme-ui";
import theme from "theme";
import Layout from "components/layout";
import "react-multi-carousel/lib/styles.css";
import "react-modal-video/css/modal-video.min.css";
import "rc-drawer/assets/index.css";
import "typeface-dm-sans";
import dynamic from "next/dynamic";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
export const client = new ApolloClient({
  uri: "http://localhost:3030/graphql",
  cache: new InMemoryCache(),
});
function CustomApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default dynamic(() => Promise.resolve(CustomApp), {
  ssr: false,
});
