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

### Exercise 15

Test using the credentials created to test exercise 13.

```text
   username: myusername
   password: Pass(w0rd)
```

The JSON Web Token is still printed to the console. However, the token is now stored localy and the user is redirected to the reviewed repositories list.

### Exercise 16

In the Apollo Sandbox, use this mutation to retrieve an access token for a authorised user:

Operation

```text
mutation RetrievToken($credentials: AuthenticateInput!) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
```

Variables

```text
{
  "credentials": {
    "username"myusername",
    "password": "Pass(w0rd)"
  }
}
```

We can then confirm the validity of the access token, by using it to identify its owner (the current user):

Operation

```text
query GetCurrentUser {
  me {
    id
    username
  }
}
```

Headers

```text
Authorization Bearer <Access token, with no quotation marks>
```

Having completed exercise 16, logging code added to fully test the SignOut() function:

```text
const signOut = async () => {
    // Because JavaScript is single-threaded and handles asynchronous operations via an event loop, it will not move on to
    // apolloClient.resetStore() until the promise returned by authStorage.removeAccessToken() has successfully resolved.
    // However, just in case the device storage fails to clear, we use a try/catch:
    try{
      // First: Remove the token from storage.
      console.log('Initiating sign out. Removing token.');
      await authStorage.removeAccessToken();

      // Then: Reset the store to clear the cache and re-execute active queries (i.e., the 'me' query).
      console.log('Token removed. Resetting Apollo store.');
      await apolloClient.resetStore();
      // At this point extract the state of the Apollo cache, and test for null (empty).
      const apolloCacheContents = apolloClient.cache.extract();
      if (apolloCacheContents?.ROOT_QUERY?.me) {
        console.log('Cache still contains user data:', apolloCacheContents);
      }
      else {
        // Message to reflect success
        console.log('The Apollo store is reset (User === null)!');
      }
    }
    catch (error) {
      console.error("Sign out sequence failed:", error);
    }
  };

  return signOut;
```

## Chapter 5

Installed jest-expo and appended package.json with a new "jest" configuration key.

I tried adding a comment to the package.json file, in the form of a dummy key. However, I'm not convinced that will work too well. So, it's been removed.

Also installed and configured eslint-plugin-jest.

To execute the test suites in the `/src/_tests_` directory, run `npm test`.

#### Versioning Issues

While working through the course material and trialling the example tests, I encountered a versioning issue. I have installed newer versions of the React Native testing ecosystem. One that is incompatible with the example tests, as offered in the course material. Rather than downgrading my testing ecosystem (and risk employing deprecated code), I decided to update the tests. Thus, concentrating on the latest test strategies, per React Native Testing Library (RNTL) v14.

It is my understanding that, in React 19, `react-test-renderer` has been deprecated and removed as a dependency in `@testing-library/react-native` version 14+, in favour of a new package called `test-renderer`. The new testing library (v14), introduces changes to the rendering and interaction APIs. The `render()` function is now asynchronous, so tests use: `await render(<Greeting name="Kalle" />)`, rather than `render(<Greeting name="Kalle" />)`.

### Exercise 17

Test suit implemented using React Native Testing Library v14. The `render()` function is now asynchronous. So, `await render()` guarantees the component resolves all internal cycles and renders to the virtual screen before the test runner starts casting assertions.

### Exercise 18

I refactored SignIn.jsx to extract the presentational form wrapper into a component called SignInContainer. Exporting SignInContainer so that the test runner (SignInForm.test.jsx) could isolate it from the live Apollo Client hooks and navigation code.

However, SignInForm.test.jsx kept generating this error:

`SyntaxError: Cannot use import statement outside a module`

`import { useNavigate } from "react-router-native"; // Import useNavigate.`

SignInContainer doesn't need or use `useNavigate`. However, Jest still tries to load it.

Solution:
Refactor to completely different modules:

```text
src/_tests_/SignInContainer.test.jsx
src/components/SignInContainer.jsx
src/components/SignIn.jsx
```

Having debugged the code and squeezed a pass out of the test, I still get errors reported:

` console.error`

`The current testing environment is not configured to support act(...)`

I believe that this is due to a versioning conflict between React 19, Formik, and the RNTL v14. I'm pretty sure that it's not just down to my code.
In attempts to resolve the conflicts, I implemented waits employing `act()` rather than `waitFor()`. See the `ACT-SignInContainerTest.test.jsx` test file.
Although this solution was shorter (coding) and a little faster to execute, I prefer the `SignInContainer.test.jsx` solution.

### Exercise 19

Created a new query to fetch a single repository. Created a useRepository custom hook, to fetch the single repository data, based on item Id. Then, created a SingleRepositoryView component to render the single repository view. Updated RepositoryItem, RepositoryList and Main components, to accommodate new functionality (i.e.: selecting item from list and linking 'Open in GitHub' button).

### Exercise 20

Created a new query to fetch a single repository including reviews. Created ReviewItem presentational component to render a single repository review card. Created an ItemSeparator component, as a shared resource, used in RepositoryList and SingleRepositoryView components, to separate the FlatList items (repository cards and review cards).

#### Note on: `<Flatlist/>`

React Native’s <FlatList> is a wrapper around a more low-level component called <VirtualizedList>.

Instead of rendering all 30, 300 or 3000 reviews in our list, all at once (which would consume too much memory), <FlatList> uses a windowing mechanism to structure the layout of the list items:

```text
[ ListHeaderComponent ]  --> Rendered ONCE at the top
───────────────────────
[ Rendered Window ]
  ├─ Item 1 (renderItem)
  ├─ Separator (ItemSeparatorComponent)
  ├─ Item 2 (renderItem)
  └─ Separator (ItemSeparatorComponent)
───────────────────────
[ Unrendered Off-screen Items ] --> Only kept as data in memory
```

Key Internal Components like Header / Footer Layer (ListHeaderComponent / ListFooterComponent), are placed at the boundaries of the scroll container. These can be used for placing content or repo details that scroll along with the list.

React Native automatically injects the Separator (ItemSeparatorComponent) components between items in your data array. Excluding before the first item or after the last item.

The Key Tracker (keyExtractor)is evaluated for every node in data to assign React's internal key prop, letting React track which items changed, moved, or deleted during re-renders.

### Exercise 21

While exercise 21 has been completed, per the course instructions, I'm not happy with the way that `CreateReview` works. Inputting the `ownerName` and the `repositoryName`, manually, is error prone. As I discovered while testing.

Also, there is significant code duplication in the `CreateReviewContainer` and `SignInContainer` files. As the application's functionality is developed, this duplication is likely to grow.

To reduce code duplication, it is my understanding that I could implement a custom form (a UI presentational component with Formik hook integration), to act as an abstraction layer between React Native’s primitive <TextInput/> and Formik’s form state context. Such a component would enforce styling uniformity, and enhance code maintainability.

If these issues are not addressed later in the module, I may have to revisit the exercise to clean it up.

### Exercise 22

Exercise-22 required implementation of a Sign-Up form. Another form demanding user input, validation, and error responses. A form similar to Sign-In and Create Review, with the potential to generate more code duplication. Thus, I elected to create a reusable component (`FormikTextInputComponent`) that deals with the duplicate user input, validation, and error handling, while controlling code duplication and promoting code readability and maintainability.

A detailed explanation of `FormikTextInputComponent`, including its role within the form lifecycle and its interaction with the dependent files, can be found in **FormikTextInputComponent.md**. This document is probably best read alongside the `rate-repository-app` source code.

All the forms that employ our shiny new `FormikTextInputComponent`, also employ a submit button. To prevent styling duplication across forms and cards, I created a reusable `<Button/>` component.

Beyond centralizing background colors and padding, the component:

- Uses style array composition (`[styles.button, style]`) so caller views can pass inline layout overrides (such as `marginTop`) without altering core button defaults.
- Uses prop forwarding (`...props`) to seamlessly pass native `<Pressable>` props (like `onPress` and `testID`), ensuring component reusability and test compatibility.
- Integrates our custom `<Text/>` component to maintain consistent theme typography across the application. See the `/src/components/Button.jsx` component.

Exercise-22 triggered a significant discontinuity shift in my design and coding practices. The techniques (referred to above) adopted for Exercise 22 should probably have been employed from the get-go. However, prior to Exercise-22, I had concentrated on one exercise at a time without regard for the bigger design picture.

Devised parameterised queries to fulfil the three fetch requirements:

Operatioin:

```text
query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
    edges {
      node {
        id
        fullName
        ratingAverage
        createdAt
      }
    }
  }
}
```

```text
Variables:
{
  "orderBy": "CREATED_AT",
  "orderDirection": "DESC"
}
```

Variables:

```text
{
  "orderBy": "RATING_AVERAGE",
  "orderDirection": "DESC"
}
```

Variables:

```text
{
  "orderBy": "RATING_AVERAGE",
  "orderDirection": "ASC"
}
```

With a single parameterised query, we can send variables to our `useRepositories` custom hook. Apollo Client will send those parameters over the network, overriding the backend's default behavior whenever the user selects a different ordering principle (like Highest or Lowest rated).

Using the React Native Picker component:

```text
npm install @react-native-picker/picker`
```

The repository ordering feature, in brief:

1. **User Selection & State:** In `RepositoryList`, the `selectedOrder` state tracks the currently selected dropdown option (defaulting:`"LATEST"`).

2. **Variable Translation:** A `switch` statement translates `selectedOrder` into the GraphQL variables expected by your schema (`orderBy` and `orderDirection`). For example, selecting `"Highest rated repositories"` sets `{ orderBy: "RATING_AVERAGE", orderDirection: "DESC" }`.

3. **Data Fetching via Hook:** These variables are passed into `useRepositories(queryVariables)`, which forwards them to Apollo Client's `useQuery(GET_REPOSITORIES, { variables })`.

4. **GraphQL Execution:** Apollo executes `GET_REPOSITORIES`, passing `orderBy` and `orderDirection` as arguments to the server. The GraphQL server returns the repository list sorted accordingly.

5. **Header and List Rendering:** The presentational component (`RepositoryListContainer`) receives the fetched data and the picker state. It renders `<OrderPickerHeader/>` inside the `FlatList`'s `ListHeaderComponent` prop, so the dropdown stays pinned to the top of the list.

6. **Re-rendering on Change:** When a user selects a new option from the dropdown, `setSelectedOrder` updates the state, triggering a re-render. `useRepositories` is called with the new query variables, and Apollo automatically fetches and displays the updated, re-ordered data.

### Exercise 24

## END

---

<br/>

<hr style="height: 5px; background-color: black; border: none;">
