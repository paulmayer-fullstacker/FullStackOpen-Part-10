// /src/components/ItemSeparator.jsx
// Reusable spacer component for FlatList visual gaps.

import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  separator: {
    height: 10 // Default vertical gap between list items
  }
});

// JSDoc Block: Displays component details and prop types when hovering over <ItemSeparator /> in VS Code.
/**
 * Reusable ItemSeparator component.
 * Renders a standard vertical spacer between items in a FlatList or SectionList.
 * @param {object|Array} [style] - Optional style overrides (e.g., to adjust height or add a border line)
 */

// Helper component used to render a spacer between each FlatList list item row.
const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;
