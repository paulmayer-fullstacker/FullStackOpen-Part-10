// src/hooks/useMyReviews.js
// Custom React hook encapsulating the logic for fetching the current user's reviews using Apollo Client.

import { useQuery } from "@apollo/client/react";
import { GET_CURRENTUSER } from "../graphql/queries";

const useMyReviews = () => {
  // Execute GET_CURRENTUSER query (with includeReviews set to true), using Apollo Client's useQuery hook.
  const { data, error, loading, refetch } = useQuery(GET_CURRENTUSER, {
    // Pass dynamic argument (includeReviews), to the GraphQL query to fetch associated review nodes.
    variables: { includeReviews: true },
    // Cache-and-network strategy: serves cached data immediately while sending a network request to fetch updated data in the background.
    fetchPolicy: "cache-and-network" // Refreshes reviews cache when navigating to this tab.
  });

  // Debugging: Log GraphQL or network errors to console.
  if (error) {
    console.error("GraphQL Error fetching user reviews:", error);
  }

  // Extract review node objects array from GraphQL edges response.
  // By flattening the edges and stripping away the metadata layer, we create a normalized (standardized, flat) array:
  // if : else
  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  return {
    reviews, // Normalised array of review objects.
    loading, // Boolean indicating network request status.
    error, // Error object if fetch failed.
    refetch // Function to manually re-run query.
  };
};

export default useMyReviews;
