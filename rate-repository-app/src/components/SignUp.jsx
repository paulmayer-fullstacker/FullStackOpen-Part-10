// src/components/SignUp.jsx:
// Smart container executing registration, automatic authentication, and route redirection.
// It orchestrates business logic: calling useSignUp, performing automatic login via useSignIn, and handling navigation via useNavigate.
import { useNavigate } from "react-router-native"; // Import React Router navigation hook.
import useSignUp from "../hooks/useSignUp"; // Import custom sign up hook.
import useSignIn from "../hooks/useSignIn"; // Import custom sign in hook for auto-login after sign up.
import SignUpContainer from "./SignUpContainer"; // Import UI component.

// Controller Component for Sign Up flow. It manages side-effects: account registration -> automatic authentication -> page redirection.
const SignUp = () => {
  const [signUp] = useSignUp(); // Destructure register execution function.
  const [signIn] = useSignIn(); // Destructure login execution function.
  const navigate = useNavigate(); // Initialize route navigation.

  // Form submission handler passed to SignUpContainer. It receives values the validated credentials object
  // ({ username, password, passwordConfirm }), from which we destructure username and password.
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      // Create the user, using the signUp hook.
      await signUp({ username, password });

      // Automatically sign in the user after successful registration
      await signIn({ username, password });

      // Redirect user back to the main repository list view ("/")
      navigate("/");
    } catch (e) {
      console.log("Sign up error:", e);
    }
  };
  // Render SignUpContainer (presentational component), supplying the authentication handler as a prop.
  // SignUpContainer is responsible for collecting and validating the user's credentials (only), before invoking this callback.
  return <SignUpContainer onSubmit={onSubmit} />;
};
// Export the SignUp component so that it can be rendered by the app's router.
export default SignUp;
