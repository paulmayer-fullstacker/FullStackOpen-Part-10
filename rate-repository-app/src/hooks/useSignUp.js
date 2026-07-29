// src/hooks/useSignUp.js
// Custom React hook encapsulating the logic for user sign-up to our GraphQL server using Apollo Client.
import { useMutation } from "@apollo/client/react"; // Import useMutation hook from Apollo Client React, to handle GraphQL data fetching and lifecycle states.
import { CREATE_USER } from "../graphql/mutations"; // Import the CREATE_USER mutation.

// Custom React hook encapsulating user registration logic via Apollo Client.
const useSignUp = () => {
  // Initialise Apollo's useMutation hook with the CREATE_USER query definition.
  const [mutate, result] = useMutation(CREATE_USER);

  // Helper function to execute the registration mutation. Accepts an object containing username and password.
  const signUp = async ({ username, password }) => {
    // Execute mutation passing variables formatted to match the backend 'CreateUserInput' type
    const payload = await mutate({
      variables: {
        user: {
          username,
          password
        }
      }
    });

    // Return full mutation response payload, so the calling container can chain async operations (e.g., auto sign-in).
    return payload;
  };

  // Return the execution wrapper and the Apollo mutation result state (loading, error, data), in Apollo tuple pattern: [signUpFunction, mutationResult].
  return [signUp, result];
};

export default useSignUp;
