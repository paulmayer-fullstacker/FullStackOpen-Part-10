// /src/hooks/useRepository.js:
// Custom React hook encapsulating the logic for fetching a single repository's data by ID using Apollo Client.

import { useQuery } from "@apollo/client/react"; // Import useQuery hook from Apollo Client React to handle fetching and lifecycle states.
import { GET_REPO_AND_REVIEWS } from "../graphql/queries"; // Import query fetching repo details and reviews.

// Define custom hook (useRepository) accepting the repository 'id' as an argument.
const useRepository = (id) => {
  // Execute query with Apollo's useQuery hook, passing 'id' inside the variables option.
  const { data, error, loading, refetch } = useQuery(GET_REPO_AND_REVIEWS, {
    fetchPolicy: "cache-and-network", // Serves cached data instantly while refetching latest data in background.
    variables: { id }
  });

  // Debugging: Log GraphQL or network errors to console without halting the React runtime.
  if (error) {
    console.error(
      "GraphQL Error fetching single repository and reviews:",
      error
    );
  }

  // Use ternary operator to safely extract 'repository' from the 'data' payload when ready.
  const repository = data ? data.repository : undefined;

  // Return unified data state matching useRepositories signature.
  return {
    repository, // Extracted single repository object
    loading, // Boolean indicating network request status
    error, // Error object if fetch failed
    refetch // Function to manually re-run query
  };
};

export default useRepository;
