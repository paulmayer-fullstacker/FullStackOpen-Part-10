// src/graphql/queries.js:

import { gql } from "@apollo/client";
// Query to fetch details for alle repositories. Newly parameterised with $orderBy and $orderDirection variable definitions.
// User can now sort by CREATED_AT or RATING_AVERAGE in ASC/DESC order.
export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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
// Query to fetch details for a single repository by Id.
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

// Query to fetch reviews for the single repository.
export const GET_REPO_REVIEWS = gql`
  query GetReviews($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
// Query to fetch details for a single repository (inc. reviews), by Id.
export const GET_REPO_AND_REVIEWS = gql`
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
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
