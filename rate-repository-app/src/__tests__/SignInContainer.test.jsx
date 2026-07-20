// src/__tests__/SignInContainer.test.jsx:
//
// Unit test for the pure SignInContainer component.
//
// This test verifies that:
// - the user can enter a username and a a password
// - pressing the Sign in button submits the form
// - Formik calls the supplied onSubmit handler
// - the first argument supplied to onSubmit contains the expected form values
//
// As we are only testing the SignInContainer component, the test is isolated from external dependencies
//  (i.e.: Apollo client, GraphQL, AsyncStorage, React Router and useSignIn).

import React from "react";

// Import the React Native Testing Library.
// - render: Renders the component into the virtual test environment. - screen: Provides global query functions.
// - fireEvent: Simulates user interaction. - waitFor: Waits for asynchronous operations (Formik submission) to complete before executing the enclosed assertions.
import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react-native";

// Import the pure Formik component. Having no dependencies upon authentication or routing. Structured for isolated unit testing.
import SignInContainer from "../components/SignInContainer";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    // Formik submits asynchronously. Hense, this test must be asynchronous.
    it("calls onSubmit with the correct username and password", async () => {
      // Create a mock function. Jest records every invocation of this function, allowing us to monitor
      //  how many times it was called and the arguments supplied during each call
      const onSubmit = jest.fn();

      // Render the pure SignInContainer component. Use awaiting render() per React Native Testing Library (RNTL) v14.
      await render(<SignInContainer onSubmit={onSubmit} />);

      // // Uncomment when debugging.
      // screen.debug();

      // Locate both text inputs. PlaceholderText is unique and developer defined, making it a good query target.
      // However, in time the PlaceholderText may be changed, demanding an update of the test file.
      // Thus, for test only purposes, locating relevant controles using getByTestId() may be a better strategy.
      const usernameInput = screen.getByPlaceholderText("Username");

      const passwordInput = screen.getByPlaceholderText("Password");

      // Locate the submit button. The Pressable has no visible text. So, use the testID added in SignInContainer.jsx.
      const submitButton = screen.getByTestId("submitButton");

      // Simulate entering a valid username.
      fireEvent.changeText(usernameInput, "myusername");
      // Formik updates its internal state asynchronously. So, we wait until the TextInput reflects the new value before continuing.
      // Intermediate 'waitFor(() => expect(...))' flushes React's state queue, giving Yup time to validate each field before the button press event.
      await waitFor(() => {
        expect(screen.getByDisplayValue("myusername")).toBeTruthy();
        // check 'input.props.value' (below) may be faster than searching the entire screen tree 'screen.getByDisplayValue' for display values.
        // expect(usernameInput.props.value).toBe("myusername");
      });
      // console.log("Username value:", usernameInput.props.value);  // Debugging.

      // Simulate entering a password that satisfies every Yup validation rule.
      fireEvent.changeText(passwordInput, "Pass(w0rd)");
      // Wait for Formik to complete its state update before attempting to submit the form.
      await waitFor(() => {
        expect(screen.getByDisplayValue("Pass(w0rd)")).toBeTruthy();
        // check 'input.props.value' (below) may be faster than searching the entire screen tree 'screen.getByDisplayValue' for display values.
        // expect(passwordInput.props.value).toBe("Pass(w0rd)");
      });
      // console.log("Password value:", passwordInput.props.value);  // Debugging.

      // Simulate pressing the Sign in button.
      fireEvent.press(submitButton);
      // console.log("Button pressed");  // Debugging.

      // Formik performs submission asynchronously.  waitFor() repeatedly executes the enclosed callback until all expectations pass, or the timeout expires.
      await waitFor(() => {
        // console.log("Mock calls:", onSubmit.mock.calls);  // Debugging.
        // The mock handler should have been called exactly once.
        expect(onSubmit).toHaveBeenCalledTimes(1);

        // Assert submission succeeded.
        // We only need to confrm the 1st argument. mock.calls is an array containing every invocation:
        // mock.calls[0]     -> first invocation
        // mock.calls[0][0]  -> first argument of first invocation
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "myusername",
          password: "Pass(w0rd)"
        });
      });
    });
  });
});
