// /src/components/RepositoryList.jsx
// Manages the data array fetched from the server and configures the FlatList to iterate over the repositories.

import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native"; // Import useNavigate hook to switch routes programmatically.
import RepositoryItem from "./RepositoryItem"; // Import our item component so that each individual item can be rendered in the list.
import ItemSeparator from "./ItemSeparator"; // Shared component import
import useRepositories from "../hooks/useRepositories"; // Import useRepositories custom hook

// RepositoryListContainer: Presentational component that does not fetch its own data, it receives 'repositories' as a prop.
// Simplyfying testing, as we do not need to mock Apollo Client or hook side-effects.
// Use named export 'export const RepositoryListContainer' so the test file can import it explicitly (import { RepositoryListContainer })
export const RepositoryListContainer = ({ repositories }) => {
  // Initialise the React Router navigation hook.
  const navigate = useNavigate();
  // Get the nodes from the edges array. If 'repositories' is still undefined (when fetching), default safely to an empty array.
  const repositoryNodes =
    // Ternary operator: If 'repositories' is true (exists), .map() through its 'edges' array, extracting the inner
    //  "node" object (which contains the repository data) from each "edge" object. Creating a flat array.
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
      // Wrap RepositoryItem inside a Pressable component. onPress, navigate to the parameterised route '/repository/:id' using the item's Id.
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          {/* Destructure the current 'item' from the data array and pass it to the RepositoryItem. */}
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

// The RepositoryList component now only handles the side effect (fetching data via the hook), delegating rendering to RepositoryListContainer.
const RepositoryList = () => {
  // Extract the 'repositories' data state directly from useRepositories.js.
  const { repositories } = useRepositories();

  // Render the presentation container, passing down the fetched repositories state.
  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
