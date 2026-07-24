// /src/components/SingleRepositoryView.jsx:
// View component that retrieves route parameters and renders a single RepositoryItem card using the useRepository hook.

import { useParams } from "react-router-native"; // Extracts path parameters (:id) from the current route.
import { Text, View, StyleSheet } from "react-native";

import RepositoryItem from "./RepositoryItem"; // Presentational item card component.
import useRepository from "../hooks/useRepository"; // Custom hook to fetch single repository data.

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

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
  return (
    <View style={styles.container}>
      {/* Pass renderopenInGitHubBtn={true} so RepositoryItem renders the GitHub pressable button */}
      <RepositoryItem item={repository} renderopenInGitHubBtn={true} />
    </View>
  );
};

export default SingleRepositoryView;
