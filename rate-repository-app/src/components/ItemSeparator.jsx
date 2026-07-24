// /src/components/ItemSeparator.jsx
// Reusable spacer component for FlatList visual gaps.

import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10
  }
});
// Helper component used to render a spacer between each FlatList list item row.
const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;
