// src/components/SignIn.jsx:

import { StyleSheet, TextInput, Pressable, View } from "react-native";
import { useFormik } from "formik";
import Text from "./Text"; // Using your custom Text component for consistent typography
import theme from "../theme"; // Importing your centralized theme

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
    marginBottom: 15, // Space between inputs and Submit button
    fontSize: 16
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
    fontSize: 16
  }
});

// Define the initial state structure for Formik
const initialValues = {
  username: "",
  password: ""
};

// Presentational component holding the form elements
const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit
  });

  return (
    <View style={styles.container}>
      {/* Username Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#767676"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        autoCapitalize="none" // Submit username as typed. No auto-cap first letter of names.
      />

      {/* Password Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#767676"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry // Obscures the text entry for security. secureTextEntry={true}
        autoCapitalize="none" // Submit password as typed by user.
      />

      {/* Submit Button wrapper */}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

// Main container component, handling business logic.
const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values); // Submission for Exercise-8 just logs the values object.
    // // Explicit print properties sequentially { username: '...', password: '...' }, overriding JS's object key ordering.
    // console.log(`Username: ${values.username}, Password: ${values.password}`);
  };

  return <SignInForm onSubmit={onSubmit} />;
};
// Export the SignIn component so that it can be dynamically rendered by the Router inside Main.jsx.
export default SignIn;
