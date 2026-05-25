// App.js:

// // ESLint test: This will trigger "no-unused-vars".
// const unusedVariable = "I am a ghost";
// // This will then trigger "import/first" (on two lines).
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";

// * Define the HelloWorld component using React Native components
const HelloWorld = (props) => {
  return (
    <View>
      <Text style={styles.helloText}>Hello world!</Text>
    </View>
  );
};

// Define a pressable component that works on the mobile device
const PressableText = (props) => {
  return (
    <Pressable onPress={() => Alert.alert("You pressed the text!")}>
      <Text>You can press me now</Text>
    </Pressable>
  );
};

// // Define a pressable component that works on the web browser
// const PressableText = (props) => {
//   return (
//     <Pressable onPress={() => {
//         console.log("Pressed!");
//         alert("You pressed the text!"); }}>
//       <Text>You can press me now</Text>
//     </Pressable>
//   );
// };

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on this app!</Text>

      {/* * Render the HelloWorld component here */}
      <HelloWorld />

      {/* * Render the PressableText component here */}
      <PressableText />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  // * Style for the helloText component
  helloText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10
  }
});
