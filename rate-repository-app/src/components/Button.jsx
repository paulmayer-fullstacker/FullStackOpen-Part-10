// src/components/Button.jsx:
// A reusable action button component, standardising touchable button styling, allowing custom style overrides.

import { Pressable, StyleSheet } from "react-native"; // Import UI primitives from React Native.
import Text from "./Text"; // Import custom styled Text component for typography.
import theme from "../theme"; // Import our centralised application theme.

// Define the layout and component styling:
const styles = StyleSheet.create({
  // Default primary button styles shared across all form/action buttons.
  button: {
    backgroundColor: theme.colors.primary, // // Blue background button colour. Standardised to theme primary color (#0366d6)
    borderRadius: 5, // // Rounded corners. Border radius across all buttons (e.g. 5px)
    alignItems: "center", // Centrally align the text inside the button.
    padding: 15 // Vertical and horizontal inner padding round the text.
  },
  // Default button label text styling
  text: {
    color: "white", // White text colour - contrast.
    fontWeight: theme.fontWeights.bold, // Bold text weight for visual emphasis.
    fontSize: theme.fontSizes.subheading
  }
});

// JSDoc Block. Hover over <Button/> anywhere else in the project, a tooltip pops up displaying the text message.
// When coding we benefit from IntelliSense Tooltips, IntelliSense and Safety Hints. JSDoc is optional.
/**
 * Reusable Button component.
 * @param {React.ReactNode} children - The button text/content
 * @param {object|array} style - Optional external style overrides (e.g., margins, specific background colors)
 * @param {object|array} textStyle - Optional style overrides for the label text
 * @param {object} props - Passes through standard Pressable props (onPress, testID, disabled, etc.)
 */

// Button:
// children: Represents the text or components we place inside the <Button> tags when using it (e.g., <Button>Sign In</Button>).
// style & textStyle: Explicitly pulled out as named parameters so we can handle custom styling safely without corrupting other props.
//...props: Collects all remaining props passed to <Button> into a single object called props (inc. onPress and testID).
const Button = ({ children, style, textStyle, ...props }) => {
  return (
    // style={[styles.button, style]} (Style array): allows caller components to pass custom styles (like marginTop), while keeping core styling defaults.
    // {...props} (Spread operator): Forwards all those extra props directly onto React Native's underlying <Pressable> primitive.
    <Pressable style={[styles.button, style]} {...props}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
};
// Export as the default export so form containers (SignInContainer, CreateReviewContainer) can import and render it.
export default Button;
