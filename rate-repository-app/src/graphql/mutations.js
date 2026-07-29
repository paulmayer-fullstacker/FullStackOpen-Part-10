// src/graphql/mutations.js:

import { gql } from "@apollo/client";
// SIGN_IN Mutation:
// * Sends user credentials (username & password) inside a CreateUserInput structure.
// * Returns the JWT 'accessToken' upon successful authentication to maintain user session.
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

// CREATE_REVIEW Mutation:
// * Posts a repository review to the server.
// * Returns metadata including 'repositoryId' so the caller can handle post-submit routing.
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

// CREATE_USER Mutation:
// * Registers a new user account on the GraphQL server.
// * Accepts a $user object of type 'CreateUserInput' ($user: { username, password }).
// * Returns the newly created user's 'id' and 'username' as confirmation of success.
export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
