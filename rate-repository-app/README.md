# Full Stack Open, Module-10. The rate-repository-app.

## Chapter 2

### Exercise 1. Initialising the application.

At this point, the application has been initialised. The development environment has been setup and tested with an Expo emulator (Android Studio Panda 4 generating an Android Pixel-8), and Expo Go (running on my Android Samsung Galaxy A10).

Which development environment is most suitable? That depends on the development and testing platform:

- Dell Vostro 5460 with Windows 11: Expo Go on the Android A10.
- Dell Latitude 5300 (also WIn 11): Android Studio (Pixel-8).

I faced two issues when setting up the development environments:

- My primary development platform (Dell Vostro), does not have the processing power to reliably run Android Studio.
- My primary cell-phone (iPhone 11 Max Pro), will not support the Expo SDK recommended for the course material (SDK-55).

Continuing development, I will employ Expo Go with the Vostro, and Android Studio with the Latitude.

In all cases, start the app with 'npm start'. Using this startup, the Pixel-8 emulator may fail to synchromise with the app. If this happens, with the emulator window in focus, press 'r' twice quickly. This triggers a reload. If it still fails to synchronise, restart using 'npm run android'.

### Exercise 2. Setting up the ESLint.

ESLint setup per instructions. When first run, no warnings or errors were issued. Thus, a test was introduced to confirm that ESLint was correctly setup.

Code added to top of App.js, in order to force known warnings:

    // ESLint test: This will trigger "no-unused-vars".
    const unusedVariable = "I am a ghost";
    // This will then trigger "import/first" (on two lines).
    import { StatusBar } from "expo-status-bar";
    import { StyleSheet, Text, View } from "react-native";

## Chapter 3

### Exercise 3. The reviewed repositories list.

The code has been commented with inline documentation.

### Exercise 4. The app bar.

In this exercise, I've gone beyond the basic requirements of the exercise. Here are some of the additional features:

- Modular Design: I separated the tab logic into a reusable AppBarTab component. This allowed for clean testing of multiple tabs without duplicating code.

- Interactive Elements: Each tab is wrapped in a Pressable component. I couldn't implement a pressable component, without testing the onPress event functionality. So, I verified the touch functionality by implementing an onPress alert (and console log), that dynamically displays the tab's title.

- Styling: I used flexDirection: 'row' for tab alignment and Constants.statusBarHeight to ensure the bar sits correctly below the device status indicators.

The main obstacle was my development platform (Dell Vostro). A phantom task, installed with and automatically started by EDB Postgres Enterprise Manager (PEM), would inexplicably take control of port 8081. My inexperience with the new development tools, and the unexpected presence of Postgres, slowed my progress, considerably. 

### Exercise 5. Polished reviewed repositories list

Here, my work exceeded the exercise requirements, in formatting the precision of count values. My initial design (for RepositoryItem.jsx), included a table look-up to identify 'k', 'M', and 'G' values and display them in compact notation. This seemed a sensible, scalable solution. However, on reflection, it represented a lot of unnecessary code. So, this was pared back, to a simple if statement, in order to capture 'k' values only. 

I couldn't commit all that work, and then delete it. So, the original code remains, commented out.

---

## END

---

<br/>

<hr style="height: 5px; background-color: black; border: none;">
