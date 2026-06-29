// src/hooks/useSignIn.js:
// Custom React hook encapsulating the logic for user sign in to our GraphQL server using Apollo Client.

import { useMutation } from "@apollo/client/react"; // Import useMutation hook from Apollo Client React, to handle GraphQL data fetching and lifecycle states.
import { SIGN_IN } from "../graphql/mutations"; // Adjust this path based on where your mutations are stored

const useSignIn = () => {
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

    // Returning the whole payload ensures that 'const { data } = await signIn(...)' works in the component
    return payload;
  };

  // Return tuple [signIn, result]. signIn: function that runs the mutation with a { username, password } object argument.
  // result: the mutation's result as it is returned by the useMutation hook.
  return [signIn, result];
};

export default useSignIn;
