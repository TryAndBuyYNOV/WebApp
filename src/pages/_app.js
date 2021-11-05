import 'react-multi-carousel/lib/styles.css';
import 'react-modal-video/css/modal-video.min.css';
import 'rc-drawer/assets/index.css';
import 'typeface-dm-sans';
// import client from '../utils/apollo/ApolloClient';
import { ApolloProvider } from '@apollo/client';

import { ApolloClient , InMemoryCache , ApolloProvider } from '@apollo/client'
export default function CustomApp({ Component, pageProps }) {

     const client = new ApolloClient({
  uri: 'http://localhost:3030/graphql',
  cache: new InMemoryCache()
});
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  
  
  );
}
