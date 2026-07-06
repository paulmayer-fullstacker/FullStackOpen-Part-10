// src/hooks/useSignIn.js:
// Custom React hook encapsulating the logic for user sign in to our GraphQL server using Apollo Client.
// import { useApolloClient } from "@apollo/client";
// import { useMutation } from "@apollo/client/react"; // Import useMutation hook from Apollo Client React, to handle GraphQL data fetching and lifecycle states.
import { useMutation, useApolloClient } from "@apollo/client/react";
import { SIGN_IN } from "../graphql/mutations"; // Adjust this path based on where your mutations are stored.
import useAuthStorage from "../hooks/useAuthStorage"; // Import the custom hook

const useSignIn = () => {
  // Access the storage instance via Context.
  const authStorage = useAuthStorage();
  // Initialise the client hook.
  const apolloClient = useApolloClient();
  // Initialise the useMutation hook with the SIGN_IN mutation as defined in mutations.js.
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // Execute the mutation by passing the credentials (of AuthenticateInput type).
    // mutate: execution function generated for us by Apollo's useMutation hook.
    const payload = await mutate({
      // variables: { ... } - All dynamic data sent in an operation must be encapsulated in an object called variables
      variables: {
        credentials: { username, password } // Assignvalue to variable 'credentials' -> mutation definition '$credentials'.
      }
    });

    // Extract the token from the mutation response
    // Note: Verify the exact path of 'authenticate.accessToken' based on our GraphQL schema
    // Optional Chaining: If any link in the chain is null/undefined, the operation stops immediately and safely returns 'undefined'.
    // if (payload ?.data ?.authenticate ?.accessToken) {  // or ..
    // Logical AND (&&) short-circuiting: Evaluate expressions from L-R. If 'false' encountered, terminate if evaluation.
    // if (payload && payload.data && payload.data.authenticate) {
    if (payload?.data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(payload.data.authenticate.accessToken);
      // Reset the store. Clear cache/re-execute active queries.
      await apolloClient.resetStore();
    }

    // Returning the whole payload ensures that 'const { data } = await signIn(...)' works in the component
    return payload;
  };

  // Return tuple [signIn, result]. signIn: function that runs the mutation with a { username, password } object argument.
  // result: the mutation's result as it is returned by the useMutation hook.
  return [signIn, result];
};

export default useSignIn;
