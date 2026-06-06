// App.js:
// Entry point of the application. It sets up global configurations
// (like routing and the status bar), and renders the top-level 'Main' component.

// Import StatusBar' component from Expo to control the device's top status bar (battery, time, ...).
import { StatusBar } from "expo-status-bar";
// Import 'NativeRouter' to enable declarative routing/navigation, for React Native apps.
import { NativeRouter } from "react-router-native";
// Import 'Main' component, acting as the core structural container for the app's views.
import Main from "./src/components/Main";

const App = () => {
  // Render the 'Main' architectural component of the app.
  return (
    // React Fragment (<>): Groups multiple elements together without adding an extra node to the view hierarchy. */}
    <>
      {/* Configures the device's status bar text and icons to use a light colour scheme (for dark backgrounds). */}
      <StatusBar style="light" />
      {/* Wrap the core application components to provide routing context down the component tree. */}
      <NativeRouter>
        {/* Renders the 'Main' component, where the actual layout, headers, and specific page routes live. */}
        <Main />
      </NativeRouter>
    </>
  );
};

export default App;
