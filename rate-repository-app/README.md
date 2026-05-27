# Full Stack Open, Module-10. The rate-repository-app.

## Chapter 2

### Exercise 1. Initialising the application.

At this point, the application has been initialised. The development environment has been setup and tested with an Expo emulator (Android Studio Panda 4 generating an Android Pixel-8), and Expo Go (running on my Android Samsung Gallaxy A10).

Which development environment is most suitable? That depends on the development and testing platform:

- Dell Vostro 5460 with Windows 11: Expo Go on the Android A10.
- Dell Latitude 5300 (also WIn 11): Android Studio (Pixel-8).

I faced two issues when setting up the development environments:

- My primary development platform (Dell Vostro), does not have the processing power to reliably run Android Studio.
- My primary cell-phone (iPhone 11 Max Pro), will not support the Expo SDK recomended for the course material (SDK-55).

Continuing development, I will employ Expo Go with the Vostro, and Android Studio with the Latitude.

In all cases, start the app with 'npm start'. Using this startup, the Pixel-8 emulator may fail to sychromise with the app. If this happens, with the emulator window in focus, press 'r' twice quickly. This triggers a reload. If it still fails to synchronise, restart using 'npm run android'.

### Exercise 2. Setting up the ESLint.

ESLint setup per instructions. When first run, no warnings or errors were issued. Thus, a test was introduced to confirm that ESLint was correctly setup.

Code added to top of App.js, in order to force known warnings:

    // ESLint test: This will trigger "no-unused-vars".
    const unusedVariable = "I am a ghost";
    // This will then trigger "import/first" (on two lines).
    import { StatusBar } from "expo-status-bar";
    import { StyleSheet, Text, View } from "react-native";

### Exercise 3. The reviewed repositories list.

The code has been commented with inline documentation.

---

## END

---

<br/>

<hr style="height: 5px; background-color: black; border: none;">
