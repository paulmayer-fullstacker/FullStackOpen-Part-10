// /src/components/RepositoryList.jsx:
// Manages the data array and configures the FlatList to iterate over the repositories.
import { FlatList, View, StyleSheet } from "react-native";
// Import our item component so that each individual item can be rendered, in the list of items.
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  // Define a visual gap between list items.
  separator: {
    height: 10
  }
});

// Array of objects (items) containing GitHub repository details.
const repositories = [
  {
    id: "jaredpalmer.formik",
    fullName: "jaredpalmer/formik",
    description: "Build forms in React, without the tears",
    language: "TypeScript",
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4"
  },
  {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4"
  },
  {
    id: "django.django",
    fullName: "django/django",
    description: "The Web framework for perfectionists with deadlines.",
    language: "Python",
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4"
  },
  {
    id: "reduxjs.redux",
    fullName: "reduxjs/redux",
    description: "Predictable state container for JavaScript apps",
    language: "TypeScript",
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4"
  }
];

// Helper component used to render a spacer between each list item row
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    // Flatlist: An iterator that traverses an array one index at a time.
    <FlatList
      // The array of data to be rendered
      data={repositories}
      // Renders the ItemSeparator component between items (but not at the top or bottom). Flatlist skips the first item, as this is a separator, not a margin.
      ItemSeparatorComponent={ItemSeparator}
      // Assign a unique key to each item, so that React can find and manage the item. The unique key helps React with re-rendering performance.
      keyExtractor={(item) => item.id}
      // Destructure the current 'item' from the data array and pass it to the RepositoryItem, to be rendered.
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
