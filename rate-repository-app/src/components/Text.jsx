// /src/components/Text.jsx:
// A flexible wrapper around the native Text component.
// It applies predefined styles from the theme based on props (like color or fontWeight).

import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    // Default styles applied to content in every instance of the component.
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
  },
  // Alternative styling based on Conditional Style Composition
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  }
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  // Logic: Combine the default 'text' style with conditional styles based on props
  const textStyle = [
    styles.text,
    // If color="textSecondary" is passed, apply the style object styles.colorTextSecondary
    color === "textSecondary" && styles.colorTextSecondary,
    // If color="primary" is passed, apply styles.colorPrimary
    color === "primary" && styles.colorPrimary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    // Allow custom styles passed via the 'style' prop to override everything above
    style
  ];
  // Render the native Text component with the array of computed styles and remaining props
  return <NativeText style={textStyle} {...props} />;
};

export default Text;
