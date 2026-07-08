// src/hooks/useSignOut.js:
// Custom React hook encapsulating the logic for a user to sign out of our GraphQL server using Apollo Client.

import { useApolloClient } from "@apollo/client/react";
import useAuthStorage from "./useAuthStorage";

const useSignOut = () => {
  // Access the storage instance via Context.
  const authStorage = useAuthStorage();
  // Initialise the client hook.
  const apolloClient = useApolloClient();

  const signOut = async () => {
    // Because JavaScript is single-threaded and handles asynchronous operations via an event loop, it will not move on to
    // apolloClient.resetStore() until the promise returned by authStorage.removeAccessToken() has successfully resolved.
    // However, just in case the device storage fails to clear, we use a try/catch:
    try {
      // First: Remove the token from storage.
      console.log("Initiating sign out. Removing token.");
      await authStorage.removeAccessToken();

      // Then: Reset the store to clear the cache and re-execute active queries (i.e., the 'me' query).
      console.log("Token removed. Resetting Apollo store.");
      await apolloClient.resetStore();
      // At this point extract the state of the Apollo cache, and test for null (empty).
      const apolloCacheContents = apolloClient.cache.extract();
      if (apolloCacheContents?.ROOT_QUERY?.me) {
        // if me exists (is not null or undefined), the cashe has not been cleaared.
        console.log("Cache still contains user data:", apolloCacheContents);
      } else {
        // else, message to reflect success and value of User/me
        console.log(
          `The Apollo store is reset (User === ${JSON.stringify(apolloCacheContents?.ROOT_QUERY?.me)})`
        );
      }
    } catch (error) {
      // catch error and display, if removeAccessToken() or resetStore() fail.
      console.error("Sign out sequence failed:", error);
    }
  };

  return signOut;
};

export default useSignOut;
