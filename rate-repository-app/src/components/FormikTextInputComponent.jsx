// src/components/FormikTextInputComponent.jsx
// Reusable form field component that integrates React Native's TextInput with Formik state and errors.

import { StyleSheet, TextInput, View } from "react-native"; // Import UI and layout from React Native.
import { useField } from "formik"; // Import the core React hook from Formik to manage input state.
import Text from "./Text"; // Using our custom Text component for consistent typography.
import theme from "../theme"; // Importing our centralised theme.
// Define the layout and component styling:
const styles = StyleSheet.create({
  input: {
    borderWidth: 1, // Narrow line border round input box.
    borderColor: "#a9a9a9", // Grey border colour.
    borderRadius: 10, // Rounded corners.
    padding: 15, // Padding inside the box for text.
    fontFamily: theme.fonts.platformSpecificFontFormat, // Added so text typed inside the form matches the global theme.
    fontSize: theme.fontSizes.subheading // Adhear to global theme.
  },
  inputError: {
    borderColor: "red" // Red border colour for validation failure.
  },
  inputMarginBottom: {
    marginBottom: 15 // Removable margin, in case error message needs to be displayed.
  },
  errorMessageText: {
    color: "red",
    marginTop: 5, // Small space above error text (below input field).
    marginBottom: 15 // Space between error message and next input field or Submit button.
  }
});

// JSDoc Block. Hover over 'FormikTextInputComponent' anywhere else in the project, a tooltip pops up displaying the text message.
// When coding we benefit from IntelliSense Tooltips, IntelliSense and Safety Hints. JSDoc is optional.
/**
 * Reusable form field component that integrates React Native's TextInput
 * with Formik state management and Yup validation errors.
 * @param {string} name - The key path in Formik state (e.g. "username", "password"). Required.
 * @param {object} [props] - Passes through standard React Native TextInput props
 * (e.g., placeholder, secureTextEntry, keyboardType, testID, multiline).
 */
// The FormikTextInputComponent accepts a required `name` string (e.g. "username")
// and gathers any extra props into `...props` (e.g. placeholder, secureTextEntry, testID).
const FormikTextInputComponent = ({ name, ...props }) => {
  // useField(name) automatically hooks into the nearest parent <FormikProvider> context.
  // It returns a 3-element tuple:
  // - field: Contains field state properties like { value, name, onChange, onBlur }.
  // - meta: Contains metadata about field validation state like { error, touched, initialValue }.
  // - helpers: Contains helper methods to manually update Formik state like { setValue, setTouched, setError }.
  const [field, meta, helpers] = useField(name);
  // Helper boolean evaluation:
  // Returns true IF the user has interacted with/exited this field (meta.touched === true)
  // AND there is an active Yup validation error string present (meta.error !== undefined).
  const showError = meta.touched && meta.error;

  return (
    // Outer View container groups the input field and its optional error message together
    <View>
      <TextInput
        style={[
          styles.input,
          // Conditional styling on validation error. Always applies base 'styles.input'.
          // if 'showError' true: apply red border ('styles.inputError').
          // else: applies bottom margin ('styles.inputMarginBottom') to maintain form consistancy.
          showError ? styles.inputError : styles.inputMarginBottom
        ]}
        // Sets a grey placeholder color for unentered text
        placeholderTextColor="#767676"
        // onChangeText event listener triggered on every keystroke in React Native.
        // Captures the updated string value and updates Formik's internal state directly for this field name.
        onChangeText={(value) => helpers.setValue(value)}
        // onBlur event listener triggered when user exits/unfocuses the input field.
        // Explicitly updates Formik's 'touched' metadata state for this field to 'true'.
        // Thus, preventing validation error messages from cluttering the screen before a user has touched the field.
        onBlur={() => helpers.setTouched(true)} // Trigger Formik's 'touched' state.
        // Controlled input binding: Binds the actual displayed text inside the component directly to Formik's state value for the field.
        value={field.value}
        // Spread the rest of props (placeholder, secureTextEntry, multiline, keyboardType, testID, etc.).
        {...props} // Forwards all additional passed props directly to React Native's underlying <TextInput /> component.
      />
      {/* Conditional short-circuit rendering. if showError: render the red error message text*/}
      {showError && (
        // Display the dynamic error string provided directly by your Yup schema (meta.error). */}
        <Text style={styles.errorMessageText}>{meta.error}</Text>
        // else: do nothing.
      )}
    </View>
  );
};
// Export as the default export so form containers (SignInContainer, CreateReviewContainer) can import and render it.
export default FormikTextInputComponent;
