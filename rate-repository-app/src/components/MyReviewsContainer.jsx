// src/components/MyReviewsContainer.jsx
// Presentational component that lists the authenticated user's reviews using shared components.

import { FlatList } from "react-native";
import ReviewItem from "./ReviewItem"; // Import reusable review card component
import ItemSeparator from "./ItemSeparator"; // Import reusable item spacer component

// Presentational component receiving the normalized array of reviews as a prop
const MyReviewsContainer = ({ reviews }) => {
  return (
    // FlatList efficiently renders large, scrollable lists by only rendering items currently on screen.
    <FlatList
      data={reviews} // The array of review objects to iterate over.
      renderItem={({ item }) => <ReviewItem review={item} />} // Callback function that renders each review item into a ReviewItem component.
      keyExtractor={({ id }) => id} // Extract a unique key (id) for each item to help React manage DOM updates efficiently.
      ItemSeparatorComponent={ItemSeparator} // Renders a visual separator between items in the list. Not before first or after last.
    />
  );
};

export default MyReviewsContainer;
