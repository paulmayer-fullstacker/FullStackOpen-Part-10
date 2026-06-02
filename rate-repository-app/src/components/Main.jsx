// /src/components/Main.jsx:
// Structural layout wrapper, handling environment-specific styling like the status bar height for safe area rendering.
// import Constants from "expo-constants";  // REMOVED
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList"; // Import the list of items
// import Text from "./Text"; // Import the text styling object.  // REMOVED
import AppBar from "./AppBar"
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainComponentBackground, // Apply colour per Ex-5 instruction.
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

export default Main;
