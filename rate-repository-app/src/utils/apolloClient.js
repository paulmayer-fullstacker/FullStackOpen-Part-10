// src/utils/apolloClient.js:
// Utility function to initialise and configure an Apollo Client instance. It sets up the network connection to the GraphQL API,
//  and chains an authentication link that automatically retrieves the stored access token and attaches it to the header of every outgoing HTTP request.

// Import core modules from the Apollo Client package.
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// Import the link modifier used to intercept requests and dynamically update the context (i.e.: adding HTTP headers).
import { SetContextLink } from "@apollo/client/link/context";

// Create HTTP link that connects Apollo Client to our GraphQL API server.
const httpLink = new HttpLink({
  // uri: "http://<Expo IP address>:4000/graphql". Replaced by environmental variable, defined within the .env file.
  uri: process.env.EXPO_PUBLIC_APOLLO_URI // Dynamically inject the the .env variable as the API endpoint URL.
});

// Define function that accepts the authStorage instance to create a customized Apollo Client.
const createApolloClient = (authStorage) => {
  // Create asynchronous authentication link using setContextLink. { headers } destructures the headers directly from the incoming context/request object.
  const authLink = new SetContextLink(async ({ headers }) => {
    try {
      // Asynchronously fetch (await), the AccessToken from the device's local storage.
      const accessToken = await authStorage.getAccessToken();
      // Return the updated context object containing the modified HTTP headers.
      return {
        headers: {
          // Spread and preserve any existing headers so they are not lost/overwritten.
          ...headers,
          // Ternary operator existential validation. If token exists, format as a 'Bearer' token; else, pass empty string ("").
          authorization: accessToken ? `Bearer ${accessToken}` : ""
        }
      };
      // Catch storage read errors.
    } catch (e) {
      // Log to console,
      console.log(e);
      // and pass through the existing headers unmodified. Request chain remains unbroken, but unauthorised, will fail..
      return {
        headers
      };
    }
  });

  // Instantiate and return the fully configured Apollo Client instance.
  return new ApolloClient({
    // Concatinate authentication link and HTTP link. So, headers are added just before the network request is sent.
    link: authLink.concat(httpLink),
    // Initialise in-memory cache to store query results locally, reducing network overhead.
    cache: new InMemoryCache()
  });
};

// Export function as default export of this module.
export default createApolloClient;
