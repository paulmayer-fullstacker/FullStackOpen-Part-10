// /src/components/RepositoryList.jsx
// Manages the data array fetched from the server and configures the FlatList to iterate over the repositories.

import { useState } from "react"; // Import useState to manage ordering selection state in React.
import { FlatList, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native"; // Import useNavigate hook to switch routes programmatically.
import { Picker } from "@react-native-picker/picker"; // Import Picker component for ordering principle selection dropdown.

import RepositoryItem from "./RepositoryItem"; // Import our item component so that each individual item can be rendered in the list.
import ItemSeparator from "./ItemSeparator"; // Shared component import.
import useRepositories from "../hooks/useRepositories"; // Import useRepositories custom hook.

// Define styling for the header component containing the dropdown picker.
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white", // White background container for the form.
    padding: 10 // Inner spacing around the container elements.
  }
});

// OrderPickerHeader: Presentational component rendering the ordering selector menu.
// Receives the current selected ordering value and updater function as props.
export const OrderPickerHeader = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <View style={styles.headerContainer}>
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      >
        {/* Placeholder / Disabled item for placeholder text */}
        <Picker.Item label="Select an item..." value="" enabled={false} />
        {/* Option 1: Order by newest repository review date. { orderBy: "CREATED_AT", orderDirection: "DESC" } */}
        <Picker.Item label="Latest repositories" value="LATEST" />
        {/* Option 2: Sort descending by average rating. { orderBy: "RATING_AVERAGE", orderDirection: "DESC" } */}
        <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
        {/* Option 3: Sort ascending by average rating. { orderBy: "RATING_AVERAGE", orderDirection: "ASC" } */}
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
      </Picker>
    </View>
  );
};

// RepositoryListContainer: Presentational component that does not fetch its own data, it receives 'repositories' as a prop.
// Simplyfying testing, as we do not need to mock Apollo Client or hook side-effects.
// Now accepts ordering state props alongside 'repositories'.
// Use named export 'export const RepositoryListContainer' so the test file can import it explicitly (import { RepositoryListContainer })
export const RepositoryListContainer = ({
  repositories,
  selectedOrder, // The picker's option state.
  setSelectedOrder // Function to update picker option state.
}) => {
  // Initialise the React Router navigation hook.
  const navigate = useNavigate();
  // Get the nodes from the edges array. If 'repositories' is still undefined (when fetching), default safely to [].
  const repositoryNodes =
    // Ternary operator: If 'repositories' is true (exists), .map() through its 'edges' array, extracting the inner
    //  "node" object (which contains the repository data) from each "edge" object. Creating a flat array.
    repositories
      ? repositories.edges.map((edge) => edge.node)
      : // else, 'repositories': false (still loading or undefined [null]), default to empty array [].
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
      // FlatList's ListHeaderComponent accepts OrderPickerHeader component as prop. This places the dropdown menu at the top of the scrollable list.
      ListHeaderComponent={
        <OrderPickerHeader
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      }
      renderItem={({ item }) => (
        // Wrap RepositoryItem inside a Pressable component. onPress, navigate to the parameterised route '/repository/:id' using the item's Id.
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
  // NEW: State for tracking the chosen ordering principle.
  // Exercise requirement: "Latest repositories" is the default principle.
  const [selectedOrder, setSelectedOrder] = useState("LATEST");

  // NEW: Translate the dropdown UI state string into GraphQL query argument variables.
  let queryVariables = { orderBy: "CREATED_AT", orderDirection: "DESC" };

  switch (selectedOrder) {
    case "HIGHEST_RATED":
      queryVariables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      break;
    case "LOWEST_RATED":
      queryVariables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      break;
    case "LATEST":
    default:
      queryVariables = { orderBy: "CREATED_AT", orderDirection: "DESC" };
      break;
  }

  // Extract the 'repositories' data state (inc. query variables orderBy and orderDirection), directly from useRepositories.js.
  const { repositories } = useRepositories(queryVariables);

  // Render the presentation container, passing down the fetched repositories state, selected order and selected order state.
  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
