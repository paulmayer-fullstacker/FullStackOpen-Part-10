// /src/components/Main.jsx:
// Structural layout wrapper, handling environment-specific styling like the status bar height for safe area rendering.
// import Constants from "expo-constants";  // REMOVED
import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList"; // Import the list of items
// import Text from "./Text"; // Import the text styling object.  // REMOVED
import AppBar from "./AppBar"

const styles = StyleSheet.create({
  container: {
    // statusBarHeight: Expo retrieves this fro the phone during initial negotiation.
    // marginTop used to ensure the content does not overlap with the device's status bar (time, battery, etc.).
    // marginTop: Constants.statusBarHeight, // marginTop removed to accommodate AppBar. AppBar will keep content away from the device Status Bar
    // Flex: 1 forces the view container to expand to fill all available screen space, in the direction of the Flexbox parent container's flexDirection.
    // flex: 1 tells the component to expand and fill all available space along its parent's main axis.
    // In React Native, the default flexDirection is 'column', so this fills the vertical height.
    flex: 1

    // // Note on flex: 0.5 behavior:
    // flex: 0.5
    // // On Mobile: Fills 50% of the screen height because the parent (the window) has a fixed height.
    // // On Web: If the parent height is 'auto', the container may collapse vertically, appearing as a horizontal strip because width still defaults to 'stretch'.

    // backgroundColor: "lightblue" // Test to visualise the container's boundaries during development.
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
