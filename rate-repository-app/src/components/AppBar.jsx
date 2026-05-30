// /src/components/AppBar.jsx:
//  Defining the top-level nav bar for the app. Utilising a custom styling theme and a reusable sub-component (AppBarTab),
//  to create a consistent header that responds to user touch and manages device status bar spacing for mobile devices.
 
import { View, StyleSheet, Pressable, Alert } from 'react-native';  // Pull core functions blocks from React Native.
import Constants from 'expo-constants';  // Used to access device metadata (i.e., height of the device status bar).
import theme from '../theme';  // Imports our centralized design tHEMES (colors, fonts),  keepING the UI consistent across the app.
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,   // Prevents the content from being hidden under the phone's status bar or the status bar being hidden by content.
    backgroundColor: theme.colors.appBarBackground,  // Set the background color based on your theme.
    display: 'flex',
    flexDirection: 'row',  // Aligns the children (tabs) horizontally.
  },
  tabTouchable: {
    padding: 15,  //Add a 15 unit padding around the text to create a larger, easier-to-hit 'touch target'.
  },
  tabText: {
    color: theme.colors.appBarText,  // Pull text colour assigned to the AppBar, from the theme.
  },
  // ...
});

// AppBarTab sub-component:
const AppBarTab = ({ title }) => {   // Accept a title prop to display different names for different tabs.
  const handlePress = () => {       // Function run when the tab is pressed.
    // Alert will be displayed on the device, not the web browser view.
    Alert.alert('Navigation', `You pressed the ${title} tab`);  // Shows native mobile dialog box, on device and emullator.
    console.log(`You pressed the ${title} tab`);  // Logs action to the debugger for web browser development.
  };

  return (
    // Wraps the text to make it clickable, applying the tabTouchable padding style.
    <Pressable onPress={handlePress} style={styles.tabTouchable}> 
    {/* Renders the title using your custom typography styling. */}
      <Text fontWeight="bold" fontSize="subheading" style={styles.tabText}>
        {title}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {  // Component exported from this file.
  return (
    // View is the outer wrapper for the entire bar.
    <View style={styles.container}>
      {/* AppBarTab: Instance of our sub-component. We currently have two tabs: "Repositories" and "Future Development." */}
      <AppBarTab title="Repositories" />
      <AppBarTab title="Future Development" />
      {/* Future tabs can be added here: <AppBarTab title="Tab Name" /> */}
    </View>
  );
};

export default AppBar;