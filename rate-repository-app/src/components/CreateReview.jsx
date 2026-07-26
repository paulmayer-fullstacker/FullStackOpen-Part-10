// src/components/CreateReview.jsx
// Component managing business logic for review creation. Executes the useCreateReview hook and handles routing upon successful completion.

import { useNavigate } from "react-router-native"; // Import React Router navigation hook.
import useCreateReview from "../hooks/useCreateReview"; // Import custom review mutation hook.
import CreateReviewContainer from "./CreateReviewContainer"; // Import presentation UI form component.

const CreateReview = () => {
  // Destructure createReview execution function from custom hook.
  const [createReview] = useCreateReview();

  // Initialise navigation hook.
  const navigate = useNavigate();

  // Submission handler receiving validated form values from CreateReviewContainer.
  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      // Execute createReview mutation payload.
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating,
        text
      });

      // Confirm repositoryId was returned in payload data.
      if (data?.createReview?.repositoryId) {
        // Redirect user to the single repository view matching the created review.
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      // Log errors (e.g., repository not found, review already submitted).
      console.log("Create review error:", e);
    }
  };

  // Render the presentational container component, passing the onSubmit callback function.
  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
