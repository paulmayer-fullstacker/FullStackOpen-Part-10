// src/graphql/mutations.js:

import { gql } from "@apollo/client";
// gql is a tagged template literal. So, it's content must be wrapped in back-ticks (`).
/* ** NOTE: Comments directly inside field selections can sometimes lead to parsing errors **
# mutation - function type. SignIn - function name. ($credentials: - Declare variable named 'credentials'.
# AuthenticateInput! - Data type of non-nullable variable).
# Call the authenticate(...) mutation field defined in the backend server,
# passing our $credentials variable into the backend's credentials argument.
# Selection Set: Tells server to just return the accessToken, not the entire AuthPayload.
*/
export const SIGN_IN = gql`
  # mutation - function type. SignIn - function name. ($credentials: - Declare variable named 'credentials'.
  # AuthenticateInput! - Data type of non-nullable variable).
  mutation SignIn($credentials: AuthenticateInput!) {
    # Call the authenticate(...) mutation field defined in the backend server,
    #passing our $credentials variable into the backend's credentials argument.
    authenticate(credentials: $credentials) {
      # Selection Set: Tells server to just return the accessToken, not the entire AuthPayload.
      accessToken
    }
  }
`;

// Defines the GraphQL mutation operation sent to the Apollo Server to post a review.
// # Accepts a $review payload of type CreateReviewInput. Exclamation (!) makes CreateReviewInput a required (non-nullable) input type.
// # Returns the repositoryId allowing us to identify the newly reviewed repository page for post-submission navigation.
export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      repositoryId
      rating
      createdAt
      text
    }
  }
`;
