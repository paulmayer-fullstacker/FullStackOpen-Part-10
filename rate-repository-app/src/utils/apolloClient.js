// src/utils/apolloClient.js:
// Utility to create a new Apollo Client at the specified URI.
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  // uri: "http://<Expo IP address>:4000/graphql".
  // Replace <Expo IP address> with IP address from Metro: exp://192.168.1.149:8081 (below QR code), i.e.: 192.168.1.149.
  uri: "http://192.168.1.149:4000/graphql"
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    // Initialise + configure the local data cache for our Apollo Client application. This tells Apollo Client to store the results
    // of our GraphQL queries in the client's memory so that it doesn't have to make repeated network requests to retrieve the same data.
    cache: new InMemoryCache()
  });
};

export default createApolloClient;
