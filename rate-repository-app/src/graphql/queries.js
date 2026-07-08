// src/graphql/queries.js:

import { gql } from "@apollo/client";
// gql is a tagged template literal.
export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          ownerAvatarUrl
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`; // The GraphQL query must be enclosed in backticks

export const GET_CURRENTUSER = gql`
  query getCurrentUser {
    me {
      id
      username
    }
  }
`;
