// src/components/CreateReviewContainer.jsx:
// Presentational component responsible for rendering the review creation form and validating its input using Formik and Yup.
// This component has no Apollo Client logic, AsyncStorage, or routing logic.

import { StyleSheet, View } from "react-native"; // Import UI primitives from React Native.
import { useFormik, FormikProvider } from "formik"; // Import useFormik hook and FormikProvider to manage and pass form state.
import * as yup from "yup"; // Import Yup for schema-based object validation.

import FormikTextInputComponent from "./FormikTextInputComponent"; // Reusable custom field
import Button from "./Button"; // Reusable Button component.

// Define the layout and component styling:
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // White background for form container.
    padding: 15 // Uniform padding around form elements.
  }
});

// // Define the validation schema using Yup:
// - Repository owner's username and Repository's name are required strings.
// - Rating: required number between 0 and 100.
// - Review: optional string.
const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number") // Guard against non-numeric string inputs, e.g.: 'fiftyfive' instead of '55'.
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  text: yup.string().optional() // Reiew text is optional.
});

// Define the initial state structure for Formik
const initialValues = {
  ownerName: "",
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
    <FormikProvider value={formik}>
      <View style={styles.container}>
        {/* Repository Owner Name Input Field. Form state and validation managed via FormikTextInputComponent */}
        <FormikTextInputComponent
          name="ownerName"
          placeholder="Repository owner name"
          autoCapitalize="none"
          testID="ownerNameInput" // Stable selector for automated tests.
        />
        {/* Repository Name Input Field.*/}
        <FormikTextInputComponent
          name="repositoryName"
          placeholder="Repository name"
          autoCapitalize="none"
          testID="repositoryNameInput"
        />
        {/* Rating Input Field. Numeric keyboard will be offered to the user, here */}
        <FormikTextInputComponent
          name="rating"
          placeholder="Rating between 0 and 100" // Remind user before validation failure.
          keyboardType="numeric"
          testID="ratingInput"
        />
        {/* Review Text Input Field (Multi-line, optional input) */}
        <FormikTextInputComponent
          name="text"
          placeholder="Review"
          multiline
          testID="textInput"
        />
        {/* Reusable Submit Button. onPress={...} override prop.*/}
        <Button testID="submitButton" onPress={formik.handleSubmit}>
          Create a review{" "}
        </Button>
      </View>
    </FormikProvider>
  );
};
// Export as the default export so that CreateReview.jsx and the unit tests can import it.
export default CreateReviewContainer;
