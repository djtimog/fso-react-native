import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = (uri) => {
  return new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
