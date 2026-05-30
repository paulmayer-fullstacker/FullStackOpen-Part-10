// /src/theme.js:
// Define a centralized configuration object that defines the application's visual style, 
// including colors, typography, and spacing, to ensure UI consistency.

const theme = {
  colors: {
    textPrimary: "#24292e",  // Dark gray for body text.
    textSecondary: "#586069",  // Lighter gray for descriptions and metadata.
    primary: "#0366d6",  // Main brand color used for primary actions/links.
    appBarBackground: "#465d74", // AppBar colour defines the background for the top navigation bar.
    appBarText: "#ffffff",       // Contrast color for text sitting on the darker AppBar background (visibility).
  },
  fontSizes: {
    body: 14,   // Default font size for standard text blocks.
    subheading: 16   // Slightly larger size for headers, tabs, and prominent labels.
  },
  fonts: {
    main: "System"  // Uses the device's native font (San Francisco on iOS, Roboto on Android).
  },
  fontWeights: {
    normal: "400",  // 
    bold: "700"    // Heavy weight for emphasis
  }
};

export default theme;
