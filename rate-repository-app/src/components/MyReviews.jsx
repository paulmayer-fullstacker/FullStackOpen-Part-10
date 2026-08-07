// src/components/MyReviews.jsx
// Logic component responsible for fetching the current user's reviews via custom hook (useMyReviews),
// and passing them to the presentational (MyReviewsContainer) component.

import useMyReviews from "../hooks/useMyReviews"; // Import useMyReviews custom hook.
import MyReviewsContainer from "./MyReviewsContainer"; // Import the presentational component.
import Text from "./Text";
import { View, StyleSheet } from "react-native";

// Define local styles for state containers (loading/error).
const styles = StyleSheet.create({
  centerContainer: {
    padding: 20,
    alignItems: "center"
  }
});

const MyReviews = () => {
  // Use custom hook to handle GraphQL data fetching and state extraction.
  const { reviews, loading, error } = useMyReviews();

  // Display loading indicator state, while GraphQL query request is pending.
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  // Display error message state if request fails (network error, auth error, etc.).
  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Error loading reviews: {error.message}</Text>
      </View>
    );
  }

  // Pass normalised reviews array directly to presentational container component.
  return <MyReviewsContainer reviews={reviews} />;
};

export default MyReviews;
