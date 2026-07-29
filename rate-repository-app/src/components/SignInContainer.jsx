// src/components/SignInContainer.jsx:
// Presentational component for the user login screen. Building and validating login forms.
// Decoupling GraphQL operations, by leaving these to the SignIn form.
import { StyleSheet, View } from "react-native"; // Import UI and layout from React Native.
import { useFormik, FormikProvider } from "formik"; // Import the core React hooks from Formik to manage input state.
import * as yup from "yup"; // Import all export declarations from Yup as the 'yup' object. Used to define object schema validation.

// import Text from "./Text"; // Using our custom Text component for consistent typography.
import FormikTextInputComponent from "./FormikTextInputComponent"; // Reusable custom field component.
import Button from "./Button"; // Import reusable Button component
// import theme from "../theme"; // Importing our centralised theme.

// Define the layout and component styling:
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // White background container for the form.
    padding: 15 // Inner spacing around the form elements.
  }
  // button: {
  //   backgroundColor: "#0366d6", // Blue background button colour.
  //   borderRadius: 10, // Rounded corners.
  //   alignItems: "center", // Centrally align the text inside the button.
  //   padding: 15 // Vertical and horizontal padding round the text.
  // },
  // buttonText: {
  //   color: "white", // White text colour - contrast.
  //   fontWeight: theme.fontWeights.bold, // Bold text weight.
  //   fontSize: theme.fontSizes.subheading
  // }  // REemoved: button & buttonText styles are now internal to <Button />.
});

// // Complex password validation cryteria removed:
// // Define the validation schema using Yup
// const validationSchema = yup.object().shape({
//   username: yup
//     .string() // Evaluate variable data type to ensure string.
//     .min(3, "Username must be at least 3 characters long")
//     .required("Username is required"), // Invalid if property evaluates to false.
//   password: yup
//     .string()
//     .min(8, "Password must be at least 8 characters long")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // .matches: scans the sequence for inclusion (A-Z).
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[@$!()£%*?&]/,
//       "Password must contain at least one special character (@$!£%*?&)"
//     )
//     .required("Password is required")
// });

// Define the new (simplified) validation schema using Yup.
// Cryteria for password simplified, to remove unnecessary complexity.
// Criteria for username and password now in line with exercise requirements (Ex-10.21).
const validationSchema = yup.object().shape({
  username: yup
    .string() // Evaluate variable data type to ensure string.
    .min(5, "Username must be between 5 and 30 characters long")
    .max(30, "Username must be between 5 and 30 characters long")
    .required("Username is required"), // Invalid if property evaluates to false.
  password: yup
    .string()
    .min(5, "Password must be between 5 and 50 characters long")
    .max(50, "Password must be between 5 and 50 characters long")
    .required("Password is required")
});

// Define the initial state structure for Formik:
const initialValues = {
  username: "",
  password: ""
};

// Presentational form component. Receives 'onSubmit' handler via props to maintain decoupling from network logic and routing.
const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema, // Integrate the validation schema.
    onSubmit
  });

  return (
    // FormikProvider passes formik context down to child components (i.e., FormikTextInputComponent).
    <FormikProvider value={formik}>
      <View style={styles.container}>
        <FormikTextInputComponent
          name="username"
          placeholder="Username"
          autoCapitalize="none" // Submit test as typed by user.
          testID="usernameInput" // Allows the input field to be targeted by unit tests.
        />

        <FormikTextInputComponent
          name="password"
          placeholder="Password"
          secureTextEntry // Obscures the text entry for security. secureTextEntry={true}
          autoCapitalize="none"
          testID="passwordInput"
        />
        {/* Reusablle submit Button */}
        {/* Replaced Pressable + Text with custom Button component. onPress={...} override prop. */}
        <Button testID="submitButton" onPress={formik.handleSubmit}>
          Sign in
        </Button>
      </View>
    </FormikProvider>
  );
};

export default SignInContainer;
