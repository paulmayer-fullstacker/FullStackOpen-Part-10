// /src/theme.js:
// Define a centralized configuration object that defines the application's visual style,
// including colors, typography, and spacing, to ensure UI consistency.

// Import the Platform API from 'react-native'.
import { Platform } from "react-native"; // Used to detect which operating system the app is currently running on.

const theme = {
  colors: {
    textPrimary: "#24292e", // Dark gray for body text.
    textSecondary: "#586069", // Lighter gray for descriptions and metadata.
    primary: "#0366d6", // Main brand color used for primary actions/links.
    appBarBackground: "#465d74", // AppBar colour defines the background for the top navigation bar.
    appBarText: "#ffffff", // Contrast color for text sitting on the darker AppBar background (visibility).
    mainComponentBackground: "#e1e4e8" // Light gray background per Ex-5 instructions.
  },
  fontSizes: {
    body: 14, // Default font size for standard text blocks.
    subheading: 16 // Slightly larger size for headers, tabs, and prominent labels.
  },
  fonts: {
    // Platform.select takes an object where the keys are the platform names (ios, android, default).
    // At runtime, React Native evaluates this object and returns (to platformSpecificFontFormat), the value matching the current platform.
    platformSpecificFontFormat: Platform.select({
      // If the app is running on an iOS device, platformSpecificFontFormat will resolve to "Arial".
      ios: "Arial",
      // If the app is running on an Android device, platformSpecificFontFormat will resolve to "Roboto".
      android: "Roboto",
      // The 'default' key acts as a fallback. If the app runs on a platform not specified above (like the web), it will fall through, to "System".
      default: "System"
    })
  },
  fontWeights: {
    normal: "400", //
    bold: "700" // Heavy weight for emphasis
  }
};

export default theme;
