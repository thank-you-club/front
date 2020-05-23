import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri:
    process.env.VUE_APP_API_URL && process.env.VUE_APP_API_URL.length > 0
      ? process.env.VUE_APP_API_URL + '/api/v1/graphql'
      : 'http://localhost:3000/api/v1/graphql',
});

const authLink = setContext((_: any, { headers }: { headers: any }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
