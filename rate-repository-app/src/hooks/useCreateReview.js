// src/hooks/useCreateReview.js
// Custom React hook encapsulating the logic for sending a new review to our GraphQL server using Apollo Client.

import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations"; // Import the CREATE_REVIEW GraphQL mutation statement.

const useCreateReview = () => {
  // Initialise the useMutation hook employing the CREATE_REVIEW mutation.
  const [mutate, result] = useMutation(CREATE_REVIEW);

  // Helper function to invoke the GraphQL mutation with formatted input arguments.
  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    // Execute the mutation by passing the review object structure (CreateReviewInput).
    // Note: 'rating' is converted from a form string into a JavaScript integer using Number().
    const payload = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          // Cast rating to a JS int, from a form string using Number().
          rating: Number(rating),
          text
        }
      }
    });

    // Return the response payload so the calling component can capture data/errors.
    return payload;
  };

  // Return a tuple matching Apollo hook patterns: [mutationFunction, resultObject]
  return [createReview, result];
};

export default useCreateReview;
