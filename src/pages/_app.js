import 'react-multi-carousel/lib/styles.css';
import 'react-modal-video/css/modal-video.min.css';
import 'rc-drawer/assets/index.css';
import 'typeface-dm-sans';

import { ApolloClient , InMemoryCache , ApolloProvider } from '@apollo/client'

export  const client = new ApolloClient({
  uri: 'http://localhost:3030/graphql',
  cache: new InMemoryCache()
});
export default function CustomApp({ Component, pageProps }) {
 
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  
  
  );
}
