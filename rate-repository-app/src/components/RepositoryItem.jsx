// /src/components/RepositoryItem.jsx:
// A presentational component responsible for defining how a single repository's data is structured and displayed.
import { View, Text } from "react-native";

// Destructure the 'item' from props to access specific repository properties.
const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
