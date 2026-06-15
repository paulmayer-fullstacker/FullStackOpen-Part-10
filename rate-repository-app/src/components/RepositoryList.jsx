// /src/components/RepositoryList.jsx
// Manages the data array fetched from the server and configures the FlatList to iterate over the repositories.

import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem"; // Import our item component so that each individual item can be rendered in the list.
import useRepositories from "../hooks/useRepositories"; // Import useRepositories custom hook

const styles = StyleSheet.create({
  // Define a visual gap between list items.
  separator: {
    height: 10
  }
});

// Helper component used to render a spacer between each list item row.
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  // Refactored code: Replaced local useState, useEffect, and fetchRepositories with the /src/hooks/useRepositories.js custom hook.
  // Extract the 'repositories' data state directly from useRepositories.js.
  const { repositories } = useRepositories();

  // Get the nodes from the edges array. If 'repositories' is still undefined (when fetching), default safely to an empty array.
  const repositoryNodes =
    // Ternary operator: If 'repositories' is true (exists), .mao() through its 'edges' array, extracting the inner
    //  "node" object (which contains the actual repository data) from each "edge" object. Creating a flat array.
    repositories
      ? repositories.edges.map((edge) => edge.node)
      : // If 'repositories' is false (still loading or undefined [null]), default to an empty array[].
        [];

  return (
    // Flatlist: An iterator that traverses an array one index at a time.
    <FlatList
      // The array of data to be rendered. Array 'repositoryNodes' has been extracted from the server (above).
      data={repositoryNodes}
      // Renders the ItemSeparator component between items (but not at the top or bottom).
      ItemSeparatorComponent={ItemSeparator}
      // Assign a unique key to each item so that React can track and optimize rendering.
      keyExtractor={(item) => item.id}
      // Destructure the current 'item' from the data array and pass it to the RepositoryItem.
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
