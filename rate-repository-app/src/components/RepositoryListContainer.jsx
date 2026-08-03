// /src/components/RepositoryListContainer.jsx
// Presentational layout component for rendering the repository list, searchbar, and ordering picker.

import { FlatList, Pressable, View, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native"; // Import useNavigate hook to switch routes programmatically.
import { Picker } from "@react-native-picker/picker"; // Import Picker component for ordering principle selection dropdown.
import { Searchbar } from "react-native-paper"; // Import Searchbar UI component from React Native Paper, to filter repo by name or owner name.

import RepositoryItem from "./RepositoryItem"; // Import our item component so that each individual item can be rendered in the list.
import ItemSeparator from "./ItemSeparator"; // Import shared seperator component.
import theme from "../theme"; // Import centralised theme for consistent background and component styling.

// Define styling for the header component containing the dropdown Order picker and Searchbar.
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.mainComponentBackground || "#e1e4e8", // Matching background for consistent spacing.
    padding: 10 // Inner spacing around the container elements.
  },
  searchbar: {
    backgroundColor: "white",
    borderRadius: 25
  },
  pickerContainer: {
    backgroundColor: theme.colors.mainComponentBackground || "#e1e4e8"
  }
});

// RepositoryListHeader: Presentational header containing the Searchbar input and the Order Picker.
// Keeping this presentational allows full decoupled testing without mocking hooks or timers.
// Destructures search state values, order selection state, and their corresponding updater functions.
export const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  selectedOrder,
  setSelectedOrder
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Searchbar component for filter keywords input */}
      <Searchbar
        placeholder="Search repositories..."
        onChangeText={setSearchKeyword} // Binds text input changes directly to updating the raw search state.
        value={searchKeyword} // Controlled component binding: reflects current raw search string.
        style={styles.searchbar}
      />
      {/* Picker dropdown container */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedOrder} // Binds the active dropdown option to the selectedOrder state string.
          onValueChange={(itemValue) => setSelectedOrder(itemValue)} // Updates selectedOrder state when an option is selected.
        >
          {/* Placeholder / Disabled item for placeholder text */}
          <Picker.Item label="Select an item..." value="" enabled={false} />
          {/* Option 1: Order by newest repository review date. { orderBy: "CREATED_AT", orderDirection: "DESC" } */}
          <Picker.Item label="Latest repositories" value="LATEST" />
          {/* Option 2: Sort descending by average rating. { orderBy: "RATING_AVERAGE", orderDirection: "DESC" } */}
          <Picker.Item
            label="Highest rated repositories"
            value="HIGHEST_RATED"
          />
          {/* Option 3: Sort ascending by average rating. { orderBy: "RATING_AVERAGE", orderDirection: "ASC" } */}
          <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
        </Picker>
      </View>
    </View>
  );
};

// RepositoryListContainer: Presentational component that does not fetch its own data, it receives 'repositories' as a prop.
// Simplyfying testing, as we do not need to mock Apollo Client or hook side-effects.
// Now accepts ordering state props alongside 'repositories'.
// Use named export 'export const RepositoryListContainer' so the test file can import it explicitly (import { RepositoryListContainer })
export const RepositoryListContainer = ({
  repositories,
  searchKeyword,
  setSearchKeyword,
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
      // Pass the unified Header component (Searchbar + Picker) as ListHeaderComponent
      ListHeaderComponent={
        <RepositoryListHeader
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
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

export default RepositoryListContainer;
