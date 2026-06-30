// src/utils/authStorage.js:
// Utility class 'AuthStorage': Abstraction layer for managing JWT access token persistence on the user device.

// Import React Native's AsyncStorage to store, retrieve, and erase a user's JWT. Using namespaced keys to prevent conflicts with other stored data.
import AsyncStorage from "@react-native-async-storage/async-storage";
// Declare reusable class to encapsulate all token-related storage logic.
class AuthStorage {
  constructor(namespace = "auth") {
    // Assign the namespace string to an instance property 'this.namespace' so it can be accessed inside other methods.
    this.namespace = namespace;
  }
  // Asynchronous method to read the JWT token from the device's local storage.
  async getAccessToken() {
    // Get the access token for the storage,
    const accessToken = await AsyncStorage.getItem(
      // using a dynamically generated template literal key (string).
      `${this.namespace}:accessToken`
    );
    // By default, AsyncStorage.getItem returns null, if the key does not exist.
    // return accessToken ? accessToken : null;  // So, existential validation and explicit null assignment (via ternary operator), unnecessary.
    return accessToken; // Is a string.
  }
  // Async method to persist the newly generated accessToken (string), onto the device.
  async setAccessToken(accessToken) {
    // Bind the accessToken to our unique namespaced key (key:value pair), and commit to the store. (must be string)
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
  }
  // Method to clear the accessToken
  async removeAccessToken() {
    // Remove the namespaced key-value pair completely from the user's device storage.
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
  }
}
// Export the AuthStorage class (as default export), so it can be instantiated within application components.
export default AuthStorage;
