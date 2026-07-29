// src/components/SignUpContainer.jsx:
// Presentational container component responsible for rendering the Sign Up form and managing its state using Formik.
// This component has no authentication logic, Apollo client code, AsyncStorage access or routing. It simply gathers the user's credentials,
// validates them and forwards the completed form values to the supplied (prop) onSubmit handler. Separating SignUpContainer from SignIn would allow us to unit test it in isolation.
import { StyleSheet, View } from "react-native"; // Import UI and layout from React Native.
import { useFormik, FormikProvider } from "formik"; // Import the core React hooks from Formik to manage input state.
import * as yup from "yup"; // Import all export declarations from Yup as the 'yup' object. Used to define object schema validation.

import FormikTextInputComponent from "./FormikTextInputComponent"; // Reusing existing custom field component.
import Button from "./Button"; // Reusable Button component

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
  // }  // Removed: button & buttonText styles are now internal to <Button />
});

// Define the validation schema using Yup.
// Cryteria for username and password, per the exercise (Ex-10.21) requirements.
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
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    // yup.ref('password') dynamically points to the value entered in the password field above.
    // oneOf ensures passwordConfirm is equal to password value.
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required")
});

// Define the initial state structure for Formik:
const initialValues = {
  username: "",
  password: "",
  passwordConfirm: ""
};

// Presentational form component. Receives 'onSubmit' handler via props to maintain decoupling from network logic and routing.
const SignUpContainer = ({ onSubmit }) => {
  // Invoke Formik hook.
  const formik = useFormik({
    initialValues,
    validationSchema, // Integrate the validation schema.
    onSubmit
  });

  return (
    // FormikProvider makes formik context available down to FormikTextInputComponent instances.
    <FormikProvider value={formik}>
      <View style={styles.container}>
        <FormikTextInputComponent
          name="username"
          placeholder="Username"
          autoCapitalize="none"
          testID="usernameInput"
        />

        <FormikTextInputComponent
          name="password"
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          testID="passwordInput"
        />

        <FormikTextInputComponent
          name="passwordConfirm"
          placeholder="Password confirmation"
          secureTextEntry
          autoCapitalize="none"
          testID="passwordConfirmInput"
        />
        {/* Reusable Submit Button. onPress={...} override prop. */}
        <Button testID="submitButton" onPress={formik.handleSubmit}>
          Sign up
        </Button>
      </View>
    </FormikProvider>
  );
};
// Export as the default export so that SignUp.jsx and any unit tests can import it.
export default SignUpContainer;
