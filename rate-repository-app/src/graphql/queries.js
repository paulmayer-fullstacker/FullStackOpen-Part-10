// src/graphql/queries.js:

import { gql } from "@apollo/client";
// gql is a tagged template literal.
// Query to fetch details for alle repositories.
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
// Query to fetch details (UserName and Id) of the current user.
export const GET_CURRENTUSER = gql`
  query getCurrentUser {
    me {
      id
      username
    }
  }
`;
// Query to fetch details for a single repository by Id
export const GET_ONE_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url # //  Launch GitHub URL via Linking API
    }
  }
`;
