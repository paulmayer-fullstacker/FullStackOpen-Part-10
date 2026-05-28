import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import Constants from "expo-constants";

const HelloWorld = () => {
  return (
    <View>
      <Text style={styles.helloText}>Hello world!</Text>
    </View>
  );
};

const PressableText = () => {
  return (
    <Pressable onPress={() => Alert.alert("You pressed the text!")}>
      <Text>You can press me now</Text>
    </Pressable>
  );
};

const BigBlueText = () => {
  return (
    <View style={styles.bigBlueContainer}>
      <Text style={styles.bigBlueText}>Big green text</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" backgroundColor="#eeeeee" translucent={false} />
      <Text>Open up App.js to start working on this app!</Text>
      <HelloWorld />
      <PressableText />
      <BigBlueText />
      {/* <StatusBar style="auto" />  Removed, as not working correctly on my A10*/}
    </View>
  );
}

// Combine all styles into ONE StyleSheet.create call
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight
  },
  bigBlueContainer: {
    padding: 20
  },
  bigBlueText: {
    color: "green",
    fontSize: 24,
    fontWeight: "700"
  },
  helloText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  }
});
