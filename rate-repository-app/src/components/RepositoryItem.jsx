// /src/components/RepositoryItem.jsx:
// A presentational component responsible for defining how a single repository's data is structured and displayed.
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text'; // Utilizing a custom Text component for consistent typography.
import theme from '../theme';

const styles = StyleSheet.create({
  container: {  // This is the 'Card' that contains repo item details. These sit on the main page (grey).
    backgroundColor: 'white',
    padding: 15,
  },
  mainComponentContainer: { 
    flexDirection: 'row',  // Row layout puts the Avatar and the Content side-by-side.
    marginBottom: 15,
    // backgroundColor: By default, 'View', is transparent. So parent white shows through.
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,  // Slightly rounded corners for the author image.
    marginRight: 15,  // Space between the image and the text content.
  },
  contentContainer: {
    // flex: 1 tells this container to take up all remaining horizontal space in the row.
    // This ensures long descriptions wrap to the next line rather than pushing off-screen.
    flex: 1,
    // alignItems: 'flex-start' ensures the children (like the language tag) only take up 
    // as much width as their content needs, instead of stretching to full width.
    alignItems: 'flex-start',
  },
  languageTag: {
    backgroundColor: theme.colors.primary, // Uses primary blue colour defined in theme.js.
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginTop: 8,
    // overflow: 'hidden' is necessary on some Android versions,
    // to ensure the background colour does not 'bleed' past the border radius.
    overflow: 'hidden',
  },
  countContainer: {
    flexDirection: 'row',  // row: Horizontal layout for the four count tags spread accros the bottom.
    justifyContent: 'space-around',  // space-around: Distributes the four items evenly with equal space between them.
  },
  countItem: {
    alignItems: 'center',  // Center the count text vertically over the label text.
  },
});

// Helper function, formatting the precision of count values, for compact notation.
const formatCount = (count) => {
  // If count >= 1000: divide by 1000, round to one decimal place, remove '.0', and concat 'k' (e.g., 8400 -> 8.4k).
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  // Return count (rounded or not) cast to a string.
  return count.toString();
};

// REMOVED AS BEYOND SCOPE OF CURRENT EXERCISE REQUIREMENTS
// // Helper function - Formatting the precision of count values, for compact notation.
// // Scalable number formatter for k, M, G, etc. Iterate through a lookup table to find the highest applicable unit.
// const formatCount = (count) => {
//   // Define an array of 'threshold' objects. 
//   // List values descending, so that the .find() method catches the highest unit first.
//   const lookup = [
//     { value: 1e9, symbol: "G" }, // Giga / > 1,000,000,000
//     { value: 1e6, symbol: "M" }, // Mega / > 1,000,000
//     { value: 1e3, symbol: "k" }  // Kilo / > 1000
//   ];

//   // lookup.find() iterates through the array. It returns the FIRST object where the 'count' is > or == to the 'value'.
//   // Example, if count is 1,543,000, it skips 'G' (1e9). It finds 'M' (1e6), stops, and returns 'item'.
//   const item = lookup.find(item => count >= item.value);

//   // Use ternary operator (condition ? ifTrue : ifFalse) to handle the resulting 'item'.
//   return item 
//     // If match found (e.g., item is { value: 1e3, symbol: "k" }):
//         // - Divide the count by the unit value (e.g., 1,543,000 / 1,000,000 = 1.543).
//         // - .toFixed(1) rounds it to one decimal place (1.5).
//         // -. .replace(/\.0$/, '') is a Regular Expression. It looks for ".0" at the 
//         //    end of the string and removes it. This turns '8.0k' into '8k'.
//         // - Append the symbol ('1.5' + 'M' = '1.5M').
//     ? (count / item.value).toFixed(1).replace(/\.0$/, '') + item.symbol 
//     // If not found (the count < 1000):
//       // Cast the count to a string.
//     : count.toString();
// };

const RepositoryItem = ({ item }) => {
  return (
    // The outer white card.
    <View style={styles.container}>
      {/* Top Section: Avatar and Info (fullName, description, language tag) */}
      <View style={styles.mainComponentContainer}>
        {/* Image requires a source object with a 'uri' property for remote URLs */}
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        
        <View style={styles.contentContainer}>
          {/* Use the custom Text component for consistent styles */}
          <Text fontWeight="bold" fontSize="subheading" style={{ marginBottom: 4 }}>
            {item.fullName}
          </Text>
          <Text color="textSecondary">
            {item.description}
          </Text>
          {/* Blue Language Tag */}
          <Text style={styles.languageTag}>
            {item.language}
          </Text>
        </View>
      </View>

      {/* Bottom Section: Displaying Counts (Stars, Forks, Reviews, Rating) */}
      <View style={styles.countContainer}>
        <CountItem label="Stars" value={formatCount(item.stargazersCount)} />
        <CountItem label="Forks" value={formatCount(item.forksCount)} />
        <CountItem label="Reviews" value={item.reviewCount} />
        <CountItem label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
};

// Sub-component for individual count columns.
const CountItem = ({ label, value }) => (
  <View style={styles.countItem}>
    <Text fontWeight="bold" style={{ marginBottom: 4 }}>
      {value}
    </Text>
    <Text color="textSecondary">
      {label}
    </Text>
  </View>
);

export default RepositoryItem;
