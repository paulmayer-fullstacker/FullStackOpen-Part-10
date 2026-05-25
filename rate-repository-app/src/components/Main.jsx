// /src/components/Main.jsx:
//
import Constants from "expo-constants";
import { Text, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight || 0,
    flex: 1,
    backgroundColor: "white" // Adding a background color helps confirm it's rendering
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
    </View>
  );
};

export default Main;
