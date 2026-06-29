// src/graphql/mutations.js:

import { gql } from "@apollo/client";
// gql is a tagged template literal. So, it's content must be wrapped in back-ticks (`).
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
