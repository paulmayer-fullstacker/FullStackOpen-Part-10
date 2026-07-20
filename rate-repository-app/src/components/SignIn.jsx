// src/components/SignIn.jsx:
// Smart/container component responsible for authenticating the user.
//
// This component contains no user interface code. It just handles the business logic by:
// - invoking the custom useSignIn hook to authenticate the user, - navigating to the home page after successful authentication,
// - and passing the onSubmit handler to the pure SignInContainer component

import { useNavigate } from "react-router-native"; // Import React Router navigation hook.

import useSignIn from "../hooks/useSignIn"; // Import the custom authentication hook.

// SignInContainer manages only the Formik form and user interface, having no interaction with authentication or navigation.
import SignInContainer from "./SignInContainer"; // Import the pure presentational component.

// Main smart/container component.
const SignIn = () => {
  // Initialise our custom authentication hook, which returns a tuple [signIn, result]
  // Here just use the signIn function.
  const [signIn] = useSignIn();

  // Initialise the React Router navigation hook.
  const navigate = useNavigate();

  // Form submission handler. Asynchronous function receives the validated form values from SignInContainer,
  // authenticates the user via Apollo Client and, redirects the user to the repository list (if authentication successful).
  const onSubmit = async (values) => {
    // Destructure the submitted credentials.
    const { username, password } = values;

    try {
      // Execute the authentication mutation. The custom useSignIn hook returns the entire
      //  Apollo mutation payload, allowing us to check the authentication response.
      const { data } = await signIn({
        username,
        password
      });

      // Confirm that a valid access token has been returned before attempting navigation.
      if (data?.authenticate?.accessToken) {
        console.log(username, "authenticated, with payload data:", data);

        // Redirect the authenticated user to the application's home page.
        navigate("/");
      }

      // Otherwise, execution continues to the catch block below.
    } catch (e) {
      // Log any authentication or network errors.
      console.log("Authentication error:", e);
    }
  };

  // Render SignInContainer (the presentational component), supplying the authentication handler as a prop.
  // SignInContainer is responsible only for collecting and validating the user's credentials before invoking this callback.
  return <SignInContainer onSubmit={onSubmit} />;
};

// Export the SignIn component so that it can be rendered by the app's router.
export default SignIn;
