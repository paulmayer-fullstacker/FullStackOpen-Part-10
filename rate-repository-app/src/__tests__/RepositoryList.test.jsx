// src/__tests__/RepositoryList.test.jsx:
// Unit/integration test designed to verify that the RepositoryListContainer component correctly displays a list of repositories.
// Supplying mock data (as props), we ensure that repository information is rendered correctly, independently of the backend.

import React from "react";
// Import testing utilities from the React Native Testing Library (v14+). - 'render': Prepares and mounts our component tree into a virtual, headless test DOM.
// - 'screen': Global utility object used to query elements after rendering. - 'within': Limits queries to a specific element subtree (for asserting list items).
import { render, screen, within } from "@testing-library/react-native";
// Import RepositoryListContainer, so it can be tested in clean environment, bypassing live server state or routing constraints.
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    // Declare the test block as an async function. In @testing-library/react-native v14+, component rendering is asynchronous.
    it("renders repository information correctly", async () => {
      // Define a mock data structure that matches the GraphQL query results returned from the backend.
      // Thus allowing us to run the tests in a controlled, enclosed environment, without a server connection.
      const repositories = {
        // Total number of repositories available on the server. Telling our FlatList/UI how many items exist in the database.
        totalCount: 8,
        // Metadata block designed to manage cursor-based pagination.
        pageInfo: {
          // Are there more items to fetch from the server. If 'true': the list will trigger 'fetch more' action, when scrolling to the bottom of the list.
          hasNextPage: true,
          // endCursor: an opaque, Base64 encoded string representing the position of the last item in the current batch.
          // The client sends this to the GraphQL server to request the next page of records that start after this cursor.
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          // startCursor: an opaque, Base64 encoded string representing the position of the first item in this batch.
          // Used if the user is paginating backwards.
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd"
        },
        // edges: an array of individual edge wrapper objects. edges, here, represents our list of repositories.
        edges: [
          // edge: wrapper that defines the relationship that links one node to another.
          {
            // node: represents the data object item (the complete data package for a single repository).
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619, // Expected display dependent on formatting, i.e.: 1.6k.
              stargazersCount: 21856, // Expected display dependent on formatting, i.e.: 21.9k.
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4"
            },
            // cursor: represents the node's position in the list.
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd"
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4"
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ=="
          }
        ]
      };

      // Await the rendering of the container component, with mock repositories passed as a prop.
      // In @testing-library/react-native version 14+, 'await render()' guarantees the component resolves all internal cycles
      //  and renders to the virtual screen before test runner starts casting assertions.
      await render(<RepositoryListContainer repositories={repositories} />);

      // Debug: uncomment 'screen.debug()' to output the rendered component's XML structure in the terminal output.
      // screen.debug();

      // Fetch all elements marked with testID="repositoryItem" (defined on each item's parent View), and place in array.
      // Note: getAllBy... always returns an array.
      const repositoryItemsArray = screen.getAllByTestId("repositoryItem");
      // Assert that two items are rendered in our list (matching our mock edges above).
      expect(repositoryItemsArray).toHaveLength(2);
      // Destructure our array of items to test them individually. We know there are only two items in our test data (above).
      const [firstItem, secondItem] = repositoryItemsArray;
      // Assertions for the first repository (jaredpalmer.formik). 'within': wrapper to scope our queries inside this list item (only).
      const firstItemQueries = within(firstItem);
      // Assert that text string values (fullName, description, and language), appear correctly.
      expect(firstItemQueries.getByText("jaredpalmer/formik")).toBeTruthy();
      expect(
        firstItemQueries.getByText("Build forms in React, without the tears")
      ).toBeTruthy();
      expect(firstItemQueries.getByText("TypeScript")).toBeTruthy();

      // Assert that numerical fields are properly formatted by our custom 'formatCount' helper, and appear correctly.
      expect(firstItemQueries.getByText("21.9k")).toBeTruthy(); // Stargazers: 21856 -> (21856 / 1000).toFixed(1) -> Compact metric notation: '21.9k'
      expect(firstItemQueries.getByText("1.6k")).toBeTruthy(); // Forks: 1619 -> (1619 / 1000).toFixed(1) -> Compact metric notation: '1.6k'
      expect(firstItemQueries.getByText("88")).toBeTruthy(); // Ratings and review (< 1000), '88' and '3' respectively.
      expect(firstItemQueries.getByText("3")).toBeTruthy();

      // Assertions for the second repository (async-library.react-async). Use 'within' to restrict our queries just to this list item.
      const secondItemQueries = within(secondItem);
      // Assert that text string values (fullName, description, and language), appear correctly.
      expect(
        secondItemQueries.getByText("async-library/react-async")
      ).toBeTruthy();
      expect(
        secondItemQueries.getByText("Flexible promise-based React data loader")
      ).toBeTruthy();
      expect(secondItemQueries.getByText("JavaScript")).toBeTruthy();
      // Assert that numerical fields appear correctly.
      expect(secondItemQueries.getByText("1.8k")).toBeTruthy(); // Compact metric notation correctly formatted from '1760'
      expect(secondItemQueries.getByText("69")).toBeTruthy();
      expect(secondItemQueries.getByText("72")).toBeTruthy();
      expect(secondItemQueries.getByText("3")).toBeTruthy();
    });
  });
});
