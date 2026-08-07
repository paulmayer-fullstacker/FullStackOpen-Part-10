// src/components/ReviewItem.jsx:
// Reusable presentational component responsible for rendering a review card.
// Dynamically renders either the author's username (single repository review card), or the repository title (myReviews), as the header.

import { View, StyleSheet } from "react-native";
import { format, parseISO } from "date-fns"; // Date formatting functions.
import Text from "./Text"; // Custom typography component.
import theme from "../theme"; // Theme variables for consistent colors.

const styles = StyleSheet.create({
  // Outer card container with a white background and padding.
  container: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row" // Row layout puts the circular rating on the left and content on the right.
  },
  // Circular badge for the numeric rating (0 - 100)
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // Height devided by two makes the container round.
    borderWidth: 2,
    borderColor: theme.colors.primary, // Primary theme blue.
    justifyContent: "center", // Center text vertically.
    alignItems: "center", // Center text horizontally.
    marginRight: 15
  },
  // Text inside the circular rating badge.
  ratingText: {
    color: theme.colors.primary,
    fontWeight: "bold"
  },
  // Content container taking up the remaining horizontal screen space.
  contentContainer: {
    flex: 1
  },
  // Header text styling. Renamed from usernameText to reflect generic header usage
  headerText: {
    marginBottom: 2
  },
  // Formatted date styling.
  dateText: {
    marginBottom: 8
  }
});

const ReviewItem = ({ review }) => {
  // Format the ISO date string (e.g. "2026-07-24T...") into "dd MMM yyyy".
  const formattedDate = review?.createdAt
    ? format(parseISO(review.createdAt), "dd MMM yyyy")
    : "";

  // Dynamically pick username (repo view) or repository full name (user's review list view)
  const headerTitle = review.user?.username || review.repository?.fullName;

  return (
    <View style={styles.container}>
      {/* Left: Circular Rating Badge */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      {/* Right: Review Details */}
      <View style={styles.contentContainer}>
        {/* Header displays username OR repository title depending on context */}
        <Text fontWeight="bold" style={styles.headerText}>
          {headerTitle}
        </Text>
        <Text color="textSecondary" style={styles.dateText}>
          {formattedDate}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
