// /src/components/AppBar.jsx:
//  Defining the top-level nav bar for the app. Utilising a custom styling theme and a reusable sub-component (AppBarTab),
//  to create a consistent header that responds to user touch and manages device status bar spacing for mobile devices.

import { View, StyleSheet, ScrollView, Pressable } from "react-native"; // Pull core functions blocks from React Native.
import { Link } from "react-router-native"; // Import Link from react-router-native, to manage routing transitions.
import Constants from "expo-constants"; // Used to access device metadata (i.e., height of the device status bar).
import theme from "../theme"; // Imports our centralised design themes (colours, fonts),  keeping the UI consistent across the app.
import Text from "./Text"; // Import pre-styled Text component to maintain consistent typography.

import { useQuery } from "@apollo/client/react"; // Import useQuery hook from Apollo Client React, to handle GraphQL data fetching and lifecycle states.
import { GET_CURRENTUSER } from "../graphql/queries"; // Import the ME/GET_CURRENTUSER from queries.
import useSignOut from "../hooks/useSignOut"; // Import our useSignOut custom hook.

// Define styles for the AppBar and its internal tabs.
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight, // Prevents the content from being hidden under the phone's status bar or the status bar being hidden by content.
    backgroundColor: theme.colors.appBarBackground, // Set the background color based on your theme.
    display: "flex" // Redundant. Views use flexbox layout by default in React Native.
    //flexDirection: "row" // Removed. Child is now a single ScroolView, that fills the parent container. row styling now managed by the ScrollView container.
  },
  // Define style object specifically for the ScrollView's inner content container. - ScrollViews do not behave like standard Views.
  // Layout styles applied to ScrollView's standard `style` prop affect the scrollable viewport boundary, not the content inside it.
  scrollViewContentContainer: {
    flexDirection: "row", // Aligns the child tabs horizontally in a single row inside the scrollable track.
    alignItems: "center" // Keep tabs vertically centered if they have different heights.
  },
  tabTouchable: {
    padding: 15 //Add a 15 unit padding around the text to create a larger, easier-to-hit 'touch target'.
  },
  tabText: {
    color: theme.colors.appBarText // Pull text colour assigned to the AppBar, from the theme.
  }
  // ...
});

// AppBarTab sub-component: It destructures 'title' (the text to display), <Link> 'to' (the route target path), and onPress from its props.
const AppBarTab = ({ title, to, onPress }) => {
  // Isolate text layer into a shared variable so we don't repeat the Text markup.
  const tabFace = (
    <Text fontWeight="bold" fontSize="subheading" style={styles.tabText}>
      {title}
    </Text>
  )
  // If an onPress function is provided, we render a primitive Pressable component instead of a router Link.
  // We reuse the exact same `styles.tabTouchable` object here so the hit-target layout matches the Links.
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.tabTouchable}>
        {tabFace}
      </Pressable>
    );
  }
  // Else: wrap the tab face in a routing Link
  return (
    // The Link component wraps the text and handles changing the application URL route automatically when tapped.
    // UnderlayColor gives feedback when the user taps the text area, on mobile devices.
    <Link
      to={to}
      style={styles.tabTouchable}
      underlayColor={theme.colors.mainComponentBackground}
    >
      {tabFace}
    </Link>
  );
};

// Define the main AppBar component exported from this file.
const AppBar = () => {
  const { data } = useQuery(GET_CURRENTUSER); // Execute getCurrentUser query to get user data.
  const user = data?.me; // If data contains the 'me' object, the user is signed in.
  const signOut = useSignOut(); // Instantiate the custom hook function here inside the functional component body
  // to make the operation available for execution during conditional rendering.
  return (
    // View is the outer wrapper for the entire bar.
    <View style={styles.container}>
      {/* // Wrap the tabs inside a <crollView component. */}
      {/* horizontal={true}: Changes scrolling axis from V to H and automatically sets up a internal H layout. */}
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {/* AppBarTab: Instance of our sub-component. We currently have two tabs: "Repositories" and "Sign In." */}
        {/* Pass the "to" prop (<Link> to) to point to the correct paths configured in Main.jsx */}
        <AppBarTab title="Repositories" to="/" />
        {/* Conditional rendering based on sign-in status */}
        {user ? (
          // if user not null, user is signed in. So, offer 'Sign Out'.
          <AppBarTab title="Sign out" onPress={signOut} />
          // onPress={signOut} forces our conditional logic in AppBarTab to switch from an inactive routing link 
          // to an active <Pressable> node that fires the actual state-clearing sequence.
        ) : (
          // else offer 'Sign In'
          <AppBarTab title="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
