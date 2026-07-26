// src/components/CreateReviewContainer.jsx
// Presentational component responsible for rendering the review creation form and validating its input using Formik and Yup.
// This component has no Apollo Client logic, AsyncStorage, or routing logic.

import { StyleSheet, TextInput, Pressable, View } from "react-native"; // Import UI primitives from React Native.
import { useFormik } from "formik"; // Import useFormik hook to manage form state.
import * as yup from "yup"; // Import Yup for schema-based object validation.
import Text from "./Text"; // Import custom styled Text component for typography.
import theme from "../theme"; // Import centralized application theme.

// Define the layout and component styling:
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // White background for form container.
    padding: 15 // Uniform padding around form elements.
  },
  input: {
    borderWidth: 1, // Narrow line border round input box.
    borderColor: "#a9a9a9", // Grey border colour.
    borderRadius: 5, // Rounded corners.
    padding: 15, // Padding inside the box for text.
    fontFamily: theme.fonts.platformSpecificFontFormat, // Added so text typed inside the form matches the global theme.
    fontSize: theme.fontSizes.subheading // Adhear to global theme.
  },
  inputError: {
    borderColor: "#d73a4a" // Red border colour for validation failure.
  },
  inputMarginBottom: {
    marginBottom: 15 // Removable margin, in case error message needs to be displayed.
  },
  errorMessageText: {
    color: "red", // Red error text colour matching field border.
    marginTop: 5, // Top margin positioning text just below the input box.
    marginBottom: 15 // Space between error message and next input element.
  },
  button: {
    backgroundColor: "#0366d6", // Blue background button colour.
    borderRadius: 5, // Rounded corners.
    alignItems: "center", // Centrally align the text inside the button.
    padding: 15 // Vertical and horizontal inner padding round the text..
  },
  buttonText: {
    color: "white", // White text colour - contrast.
    fontWeight: theme.fontWeights.bold, // Bold text weight for visual emphasis.
    fontSize: theme.fontSizes.subheading
  }
});

// Define the validation schema using Yup:
// - Repository owner's username and Repository's name are required strings
// - Rating: required number between 0 and 100
// - Review: optional string
const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number") // Guard against non-numeric string inputs
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  text: yup.string().optional()
});

// Define the initial state structure for Formik
const initialValues = {
  ownerName: "", // Instantiate the initial variable strings as empty.
  repositoryName: "",
  rating: "",
  text: ""
};

const CreateReviewContainer = ({ onSubmit }) => {
  // Invoke Formik hook.
  const formik = useFormik({
    initialValues,
    validationSchema, // Integrate the validation schema.
    onSubmit
  });

  return (
    <View style={styles.container}>
      {/* Repository Owner Name Input Field */}
      <TextInput
        testID="ownerNameInput" // Stable selector for automated tests. Not currently used.
        style={[
          styles.input,
          // Dynamically track validation and interface interaction. Conditional styling on validation error.
          formik.touched.ownerName && formik.errors.ownerName
            ? styles.inputError
            : styles.inputMarginBottom
        ]}
        placeholder="Repository owner name"
        placeholderTextColor="#767676"
        value={formik.values.ownerName}
        // onChangeText={formik.handleChange("ownerName")}
        // Receive the ownerName string directly from React Native and update Formik state explicitly.
        onChangeText={(value) => formik.setFieldValue("ownerName", value)}
        autoCapitalize="none" // Submit repository ownerName as typed. No auto-cap first letter of names.
        onBlur={formik.handleBlur("ownerName")} // Trigger Formik's 'touched' state. Alerts the hook to log user exited the field, making error notifications eligible for display.
      />
      {/* Evaluate state values. Print the current failure message when field has been touched and validation parameters fail. */}
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorMessageText}>{formik.errors.ownerName}</Text>
      )}

      {/* Repository Name Input Field */}
      <TextInput
        testID="repositoryNameInput" // Stable selector for automated tests. Not used.
        style={[
          styles.input,
          // Conditional styling on validation error.
          formik.touched.repositoryName && formik.errors.repositoryName
            ? styles.inputError
            : styles.inputMarginBottom
        ]}
        placeholder="Repository name"
        placeholderTextColor="#767676"
        value={formik.values.repositoryName}
        onChangeText={(value) => formik.setFieldValue("repositoryName", value)}
        autoCapitalize="none"
        onBlur={formik.handleBlur("repositoryName")} // Trigger Formik's 'touched' state.
      />
      {/* Evaluate state values. Render the current failure message when when field has been touched and validation fails. */}
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorMessageText}>
          {formik.errors.repositoryName}
        </Text>
      )}

      {/* Rating Input Field */}
      <TextInput
        testID="ratingInput"
        style={[
          styles.input,
          // Conditional styling on validation error.
          formik.touched.rating && formik.errors.rating
            ? styles.inputError
            : styles.inputMarginBottom
        ]}
        placeholder="Rating between 0 and 100"
        placeholderTextColor="#767676"
        value={formik.values.rating}
        onChangeText={(value) => formik.setFieldValue("rating", value)}
        keyboardType="numeric"
        onBlur={formik.handleBlur("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorMessageText}>{formik.errors.rating}</Text>
      )}

      {/* Review Text Input Field (Multi-line, optional input) */}
      <TextInput
        testID="textInput"
        style={[
          styles.input,
          formik.touched.text && formik.errors.text
            ? styles.inputError
            : styles.inputMarginBottom
        ]}
        placeholder="Review"
        placeholderTextColor="#767676"
        value={formik.values.text}
        onChangeText={(value) => formik.setFieldValue("text", value)}
        multiline // Allows text box expansion across multiple lines.
        onBlur={formik.handleBlur("text")}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.errorMessageText}>{formik.errors.text}</Text>
      )}

      {/* Submit Button wrapper */}
      <Pressable
        testID="submitButton" // Allows the Pressable itself to be targeted by the unit test.
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};
// Export as the default export so that CreateReview.jsx and the unit tests can import it.
export default CreateReviewContainer;
