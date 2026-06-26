// /src/hooks/useRepositories.js:
//  Custom React hook encapsulating the logic for fetching repository data from a GraphQL server using Apollo Client.

import { useQuery } from "@apollo/client/react"; // Import useQuery hook from Apollo Client React, to handle GraphQL data fetching and lifecycle states.
import { GET_REPOSITORIES } from "../graphql/queries"; // Import GET_REPOSITORIES GraphQL query created with the gql template literal.

// Define a custom React hook (useRepositories), to make repository data reusable across components.
const useRepositories = () => {
  // Execute the query using Apollo's useQuery() hook.
  // useQuery() returns an object containing the response data, errors, loading status, and a function to manually re-run the query.
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network" // Apply the 'cache-and-network' fetch policy.
    // It returns cached data immediately while simultaneously fetching updated data from the network. Thus, avoiding stale data.
  });

  // Debugging: if an error occurred during the GraphQL execution or network request.//  report any GraphQL errors:
  if (error) {
    // Log the error details to the console, without crashing the user interface.
    console.error("GraphQL Error fetching repositories:", error);
  }

  // Use ternary operator to extract 'repositories' from the Apollo 'data' object once it exists.
  const repositories = data ? data.repositories : undefined; // If 'data' has not loaded, default it to undefined so matching our old local state behavior.

  // // Return an object containing the repository payload, loading state, and refetch function. RepositoryList expects: { repositories, loading, refetch }
  return {
    repositories, // The extracted data object containing the edges and nodes.
    loading, // boolean indicating if a network request is currently active.
    refetch // Apollo function used to trigger a manual refresh of the query data.
  };
};
// Export the useRepositories hook as the default export so it can be imported and utilized in components like RepositoryList.
export default useRepositories;
