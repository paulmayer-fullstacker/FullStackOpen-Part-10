// /src/components/AppBar.jsx:
//  Defining the top-level nav bar for the app. Utilising a custom styling theme and a reusable sub-component (AppBarTab),
//  to create a consistent header that responds to user touch and manages device status bar spacing for mobile devices.

import { View, StyleSheet } from "react-native"; // Pull core functions blocks from React Native.
import { Link } from "react-router-native"; // Import Link from react-router-native, to manage routing transitions.
import Constants from "expo-constants"; // Used to access device metadata (i.e., height of the device status bar).
import theme from "../theme"; // Imports our centralized design themes (colors, fonts),  keeping the UI consistent across the app.
import Text from "./Text"; // Import pre-styled Text component to maintain consistent typography.

// Define styles for the AppBar and its internal tabs.
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight, // Prevents the content from being hidden under the phone's status bar or the status bar being hidden by content.
    backgroundColor: theme.colors.appBarBackground, // Set the background color based on your theme.
    display: "flex", // Redundant. Views use flexbox layout by default in React Native.
    flexDirection: "row" // Aligns the children (tabs) horizontally.
  },
  tabTouchable: {
    padding: 15 //Add a 15 unit padding around the text to create a larger, easier-to-hit 'touch target'.
  },
  tabText: {
    color: theme.colors.appBarText // Pull text colour assigned to the AppBar, from the theme.
  }
  // ...
});

// AppBarTab sub-component: It destructures 'title' (the text to display) and <Link> 'to' (the route target path) from its props.
const AppBarTab = ({ title, to }) => {
  return (
    // The Link component wraps the text and handles changing the application URL route automatically when tapped.
    // UnderlayColor gives feedback when the user taps the text area, on mobile devices.
    <Link
      to={to}
      style={styles.tabTouchable}
      underlayColor={theme.colors.mainComponentBackground}
    >
      {/* Render the title using our custom typography styling. */}
      <Text fontWeight="bold" fontSize="subheading" style={styles.tabText}>
        {title}
      </Text>
    </Link>
  );
};

// Define the main AppBar component exported from this file.
const AppBar = () => {
  return (
    // View is the outer wrapper for the entire bar.
    <View style={styles.container}>
      {/* AppBarTab: Instance of our sub-component. We currently have two tabs: "Repositories" and "Sign In." */}
      {/* Pass the "to" prop (<Link> to) to point to the correct paths configured in Main.jsx */}
      <AppBarTab title="Repositories" to="/" />
      <AppBarTab title="Sign in" to="/signin" />
    </View>
  );
};

export default AppBar;
