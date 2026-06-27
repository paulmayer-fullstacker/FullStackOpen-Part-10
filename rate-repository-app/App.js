// App.js:
// Entry point of the application. It sets up global configurations
// (like routing and the status bar), and renders the top-level 'Main' component.
// ApolloProvider used to places the client into our React application's context so all our components can access it.
import { ApolloProvider } from "@apollo/client/react";
// Import StatusBar' component from Expo to control the device's top status bar (battery, time, ...).
import { StatusBar } from "expo-status-bar";
// Import 'NativeRouter' to enable declarative routing/navigation, for React Native apps.
import { NativeRouter } from "react-router-native";
// Import 'Main' component, acting as the core structural container for the app's views.
import Main from "./src/components/Main";
// Utility used to create a new Apollo Client.
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();

const App = () => {
  console.log("env check:", process.env.EXPO_PUBLIC_ENV); // Logs 'env check: test' when the app starts up on the client.
  // Render the 'Main' architectural component of the app.
  return (
    // React Fragment (<>): Groups multiple elements together without adding an extra node to the view hierarchy. */}
    <>
      {/* Configures the device's status bar text and icons to use a light colour scheme (for dark backgrounds). */}
      <StatusBar style="light" />
      {/* Wrap the core application components to provide routing context down the component tree. */}
      <NativeRouter>
        {/* Provide the client to our React app */}
        <ApolloProvider client={apolloClient}>
          {/* Renders the 'Main' component, where the actual layout, headers, and specific page routes live. */}
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  );
};

export default App;
