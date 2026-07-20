// src/components/SignInContainer.jsx:
// Pure presentational/container component responsible for rendering the Sign In form and managing its state using Formik.
// This component has no authentication logic, Apollo client code, AsyncStorage access or routing.
// It simply gathers the user's credentials, validates them and forwards the completed form values to the supplied (prop) onSubmit handler.
// Separating SignInContainer.jsx from SignIn.jsx allows it to be unit tested in isolation.

import { StyleSheet, TextInput, Pressable, View } from "react-native"; // Import UI and layout from React Native.
import { useFormik } from "formik"; // Import the core React hook from Formik to manage input state.
import * as yup from "yup"; // Import all export declarations from Yup as the 'yup' object. Used to define object schema validation.
import Text from "./Text"; // Using our custom Text component for consistent typography.
import theme from "../theme"; // Importing our centralised theme.

// Define the layout and component styling:
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // White background container for the form.
    padding: 15 // Inner spacing around the form elements.
  },
  input: {
    borderWidth: 1, // Narrow line border round input box.
    borderColor: "#a9a9a9", // Grey border colour.
    borderRadius: 10, // Rounded corners.
    padding: 15, // Padding inside the box for text.
    // marginBottom: 15, // Space between inputs and Submit button. Removed to accommodate error message.
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
    marginTop: 5,
    marginBottom: 15 // Space between error message and Submit button.
  },
  button: {
    backgroundColor: "#0366d6", // Blue background button colour.
    borderRadius: 10, // Rounded corners.
    alignItems: "center", // Centrally align the text inside the button.
    padding: 15 // Vertical and horizontal padding round the text.
  },
  buttonText: {
    color: "white", // White text colour - contrast.
    fontWeight: theme.fontWeights.bold, // Bold text weight.
    fontSize: theme.fontSizes.subheading
  }
});

// Define the validation schema using Yup
const validationSchema = yup.object().shape({
  username: yup
    .string() // Evaluate variable data type to ensure string.
    .min(3, "Username must be at least 3 characters long")
    .required("Username is required"), // Invalid if property evaluates to false.
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // .matches: scans the sequence for inclusion (A-Z).
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!()£%*?&]/,
      "Password must contain at least one special character (@$!£%*?&)"
    )
    .required("Password is required")
});

// Define the initial state structure for Formik
const initialValues = {
  username: "", // Instantiate the initial variable string as empty.
  password: ""
};

const SignInContainer = ({ onSubmit }) => {
  // Invoke Formik hook.
  const formik = useFormik({
    initialValues,
    validationSchema, // Integrate the validation schema.
    onSubmit
  });

  return (
    <View style={styles.container}>
      {/* Username Input Field */}
      <TextInput
        testID="usernameInput" // Stable selector for automated tests. Not currently used.
        style={[
          styles.input,
          // Dynamically track validation and interface interaction. Conditional styling on validation error.
          formik.touched.username && formik.errors.username
            ? styles.inputError
            : styles.inputMarginBottom
        ]}
        placeholder="Username"
        placeholderTextColor="#767676"
        value={formik.values.username}
        onChangeText={(value) => formik.setFieldValue("username", value)}
        autoCapitalize="none" // Submit username as typed. No auto-cap first letter of names.
        onBlur={formik.handleBlur("username")} // Trigger Formik's 'touched' state. Alerts the hook to log user exited the field, making error notifications eligible for display.
      />

      {/* Evaluate state values. Print the current failure message when field has been touched and validation parameters fail. */}
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorMessageText}>{formik.errors.username}</Text>
      )}

      {/* Password Input Field */}
      <TextInput
        testID="passwordInput" // Stable selector for automated tests. Not used.
        style={[
          styles.input,
          // Conditional styling on validation error.
          formik.touched.password && formik.errors.password
            ? styles.inputError
            : styles.inputMarginBottom
        ]}
        placeholder="Password"
        placeholderTextColor="#767676"
        value={formik.values.password}
        // onChangeText={formik.handleChange("password")}
        // Receive the password string directly from React Native and update Formik state explicitly.
        onChangeText={(value) => formik.setFieldValue("password", value)}
        secureTextEntry // Obscures the text entry for security. secureTextEntry={true}
        autoCapitalize="none" // Submit password as typed by user.
        onBlur={formik.handleBlur("password")} // Trigger Formik's 'touched' state.
      />

      {/* Evaluate state values. Render the current failure message when when field has been touched and validation fails. */}
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorMessageText}>{formik.errors.password}</Text>
      )}

      {/* Submit Button wrapper */}
      <Pressable
        testID="submitButton" // *** NEW *** Allows the Pressable itself to be targeted by the unit test.
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

// Export as the default export so that SignIn.jsx and the unit tests can import it.
export default SignInContainer;
