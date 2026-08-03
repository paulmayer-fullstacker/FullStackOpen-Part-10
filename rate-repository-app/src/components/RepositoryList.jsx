// /src/components/RepositoryList.jsx
// // Smart container managing state, debouncing, sorting, and fetching repository data.
import { useState } from "react"; // Import useState to manage ordering selection state in React.
import { useDebounce } from "use-debounce"; // Import useDebounce hook to prevent excessive API calls while typing.

import useRepositories from "../hooks/useRepositories"; // Import useRepositories custom hook.
import { RepositoryListContainer } from "./RepositoryListContainer";

// The RepositoryList component now only handles the side effect (fetching data via the hook), delegating rendering to RepositoryListContainer.
const RepositoryList = () => {
  // State to store the immediate text input value entered by the user.
  const [searchKeyword, setSearchKeyword] = useState("");
  // Debounce the searchKeyword state by 500ms delay. 'debouncedSearchKeyword' only updates 500ms after the user stops typing.
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  // State for tracking the chosen ordering principle. "Latest repositories" is the default principle.
  const [selectedOrder, setSelectedOrder] = useState("LATEST");

  // Translate the dropdown UI state string into GraphQL query argument variables.
  let queryVariables = { orderBy: "CREATED_AT", orderDirection: "DESC" };

  switch (selectedOrder) {
    case "HIGHEST_RATED":
      queryVariables = { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
      break;
    case "LOWEST_RATED":
      queryVariables = { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
      break;
    case "LATEST":
    default:
      queryVariables = { orderBy: "CREATED_AT", orderDirection: "DESC" };
      break;
  }

  // Pass the sorting rules and the debounced search keyword to the custom query hook.
  // Because 'debouncedSearchKeyword' only updates after a typing pause, the Apollo query executes efficiently.
  const { repositories } = useRepositories({
    ...queryVariables,
    searchKeyword: debouncedSearchKeyword
  });

  // Render the presentation container, passing down the fetched repositories state, selected order and selected order state.
  return (
    <RepositoryListContainer
      repositories={repositories}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
