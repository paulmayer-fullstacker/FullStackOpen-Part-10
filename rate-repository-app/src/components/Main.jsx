// /src/components/Main.jsx:
// Structural layout wrapper, handling environment-specific styling like the status bar height for safe area rendering.

import { StyleSheet, View } from "react-native"; // Import core layout components and styling utilities from React Native.
import { Route, Routes, Navigate } from "react-router-native"; // Import routing components for navigating within the mobile app.
import RepositoryList from "./RepositoryList"; // Import the list of items
import SignIn from "./SignIn"; // Import the component for the SignIn screen.
import AppBar from "./AppBar"; // Import the top navigation bar component.
import theme from "../theme"; // Import the centralized theme configuration for consistent styling.

// Define the styles for the Main component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flex:1, makes the view expand to fill the entire available screen height and width.
    backgroundColor: theme.colors.mainComponentBackground // Apply colour per Ex-5 instruction.
  }
});

// Define the Main component, serving as the root layout of the application.
const Main = () => {
  return (
    // Outer container wrapper using the styles defined above, to span the full screen.
    <View style={styles.container}>
      {/* Render the top navigation App Bar. This persists across all pages. */}
      <AppBar />
      {/* <Routes>: Container for all routes. It looks at the current application URL path and renders the first <Route> that matches. */}
      <Routes>
        {/* Home page route: When the user visits the root path ("/"), render the RepositoryList component. */}
        <Route path="/" element={<RepositoryList />} />
        {/* Sign-in page route: When the path matches "/signin", render the SignIn component. */}
        <Route path="/signin" element={<SignIn />} />
        {/* Catch-all / fallback route: Matches any URL path ("*") not caught by the ones above. */}
        {/* Instead of rendering a "404 Not Found" page, the <Navigate to="/" /> component redirects back to the home page (/). */}
        {/* The 'replace' prop replaces the brocken link in the history stack, with the home page. So, it can't be called by the [Back] button. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};
// Export the Main component as the default export, so it can be imported and rendered in App.js.
export default Main;
