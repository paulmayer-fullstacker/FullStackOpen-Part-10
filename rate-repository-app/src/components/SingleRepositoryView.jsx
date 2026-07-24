// /src/components/SingleRepositoryView.jsx:
// View component that retrieves route parameters and renders a single RepositoryItem card using the useRepository hook.

import { useParams } from "react-router-native"; // Extracts path parameters (:id) from the current route.
import { Text, FlatList } from "react-native";

import RepositoryItem from "./RepositoryItem"; // Presentational item card component.
import ReviewItem from "./ReviewItem"; // Presentational review card component.
import ItemSeparator from "./ItemSeparator"; // Shared component import.
import useRepository from "../hooks/useRepository"; // Custom hook to fetch single repository data.

const SingleRepositoryView = () => {
  // Read the repository 'id' parameter from the URL path (e.g., /repository/jaredpalmer.formik)
  const { id } = useParams();

  // Call custom hook to retrieve repository data, loading state, and error object (should there be one).
  const { repository, loading, error } = useRepository(id);

  // Guard Clause: Display loading... indicator while waiting for Apollo client's response
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Guard Clause: Handle and display query errors safely.
  if (error) {
    // if there is an error, render error message UI.
    return <Text>Error: {error.message}</Text>;
  }
  // else, render the repository and the renderopenInGitHubBtn.
  // Extract review nodes array from the edges structure, defaulting to an empty array if undefined
  const reviews = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : // If 'reviews' is false (still loading or undefined [null]), default to an empty array[].
      [];
  return (
    <FlatList
      // Array of review node objects
      data={reviews}
      // Unique key for each review item
      keyExtractor={({ id }) => id}
      // Renders the main repository card at the top of the scroll view
      ListHeaderComponent={() => (
        <>
          {/* Pass renderopenInGitHubBtn={true} so RepositoryItem renders the GitHub pressable button */}
          <RepositoryItem item={repository} renderopenInGitHubBtn={true} />
          <ItemSeparator />
        </>
      )}
      // Render individual review card
      renderItem={({ item }) => <ReviewItem review={item} />}
      // Adds spacing between review items
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepositoryView;
