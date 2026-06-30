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

In all cases, start the app with 'npm start'. Using this startup, the Pixel-8 emulator may fail to synchronise with the app. If this happens, with the emulator window in focus, press 'r' twice quickly. This triggers a reload. If it still fails to synchronise, restart using 'npm run android'.

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

### Exercise 6. The sign-in view

Turns out that my Samsung Galaxy A10 (Android device), is not a reliable test platform.
StatusBar style="light" would not work as anticipated, hiding the status icons completely. Regardless of what style I used, I could not get the device to render the icons. Resorting to my Pixel-8 emulation (via Android Studio), the emulation did render the status icons correctly.

### Exercise 7 (Scrollable app bar), & 8 (The sign-in form)

Exercise 7 completed and committed while 'out-of-office'. App not fully tested.

BMI Calculator integrated into app, for practise and testing with Formik.

Exercise 8 completed. Both exercises 7 and 8 fully tested. Code cleaned up (i.e., BMI Calculator removed). Code committed to GitHub.

### Exercise 9 (Validating the sign-in form)

After walking through the Body Mass Index example, this was reasonably straightforward. The greatest (and most time consuming) challenge was conditional styling of the margin between elements.

When the user does successfully log in, there is no feedback (login button does not change colour, and the input fields are not cleared). If this is not addressed in the next few exercises, I will have to implement a fix independently.

### Exercise 10 (A platform-specific font)

I defined platform conditional font styling within the theme.js file, using platformSpecificFontFormat: Platform.select({}). I then updated the Text.jsx and SignIn.jsx files to employ the newly defined platformSpecificFontFormat design token.

To test the Platform.select() function, using only a web browser and an Android device, I switched the fonts within the design token definition, and noted the font changes that resulted.

---

## Chapter 4

### Exercise 11

Use GET request scripts in `rate-repository-api/requests.rest` to run initial tests against the backend endpoints.

New rule added to the .gitignore file:

```text
    # backend project
    rate-repository-api/
```

Implement GrapgQL query in the frontend, to fetch the Repository List from the backend. New feature fully tested, using Android Studio and Expo Go.

Problem encountered due to my import of useQuery into useRepositories. Remember: import { useQuery } from "@apollo/client/react", not from "@apollo/client".

### Exercise 12

Environmental variables defined within .env file. Thus:

```text
# .env:

EXPO_PUBLIC_ENV=test
# EXPO_PUBLIC_APOLLO_URI=http://<Expo IP address>:4000/graphql. Note: Quotation marks not required.
# Replace <Expo IP address> with IP address from Metro: exp://192.168.1.149:8081 (below QR code), i.e.: 192.168.1.149.
EXPO_PUBLIC_APOLLO_URI=http://192.168.1.149:4000/graphql
```

### Exercise 13

At this point we handle authentication as a one-time request/response transaction. We will simply log the authentication payload data (inc. JSON Web Token). The token is not retained to maintain an authenticated session, for subsequent requests.

To test: use this mutation in the SandBox to create a user with an appropriate password.

```text
mutation {
  createUser(user: { username: "myusername", password: "Pass(w0rd)" }) {
    id
    username
  }
}
```

Note: In my current app implementation, a valid password must contain at least 8 characters, have at least one lower case, one upper case, one number, and one special character

Then, logging in to the app wth the credentials:

```text
   username: myusername
   password: Pass(w0rd)
```

Should log:

```text
myusername authenticated, with payload data {"authenticate": {"\_\_typename": "AuthenticatePayload", "accessToken": "<Long psudo-random character string. This is the JSON Web Tokens, Header, Payload, and Signature>"}}
```

### Exercise 14

The three methods for the AuthStorage class have been created. However, I can think of no easy way to test functionality. So, Exercise-14 has been commited untested. Pending further architecture to employ the utility class.

## END

---

<br/>

<hr style="height: 5px; background-color: black; border: none;">
