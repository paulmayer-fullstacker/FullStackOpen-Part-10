// src/_tests_/ACT-SignInCotainerTest.test.jsx:

import React from "react";
// Import the React Native Testing Library.
// - render: Renders the component into the virtual test environment. - screen: Provides global query functions. - fireEvent: Simulates user interaction.
// - waitFor: Waits for asynchronous operations (Formik submission) to complete before executing the enclosed assertions.
// - act: Wraps state-changing interactions so React processes all pending renders and side effects before allowing assertions to run.
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from "@testing-library/react-native";
// Import the pure Formik component. Having no dependencies upon authentication or routing. Structured for isolated unit testing.
import SignInContainer from "../components/SignInContainer";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    // Formik submits asynchronously. Hense, this test must be asynchronous.
    it("calls onSubmit with correct arguments when a valid form is submitted", async () => {
      // Create a mock function. Jest records every invocation of this function, allowing us to monitor
      //  how many times it was called and the arguments supplied during each call
      const onSubmit = jest.fn();

      // Render the pure SignInContainer component. Use awaiting render() per React Native Testing Library (RNTL) v14.
      await render(<SignInContainer onSubmit={onSubmit} />);

      // // Uncomment when debugging.
      // screen.debug();

      // Locate relevant controles using getByTestI(). Probably a better strategy than getByPlaceholderText().
      // Though we can specify the PlaceholderText, in time, this may change, demanding test file changes.
      const usernameInput = screen.getByTestId("usernameInput");
      const passwordInput = screen.getByTestId("passwordInput");
      const submitButton = screen.getByTestId("submitButton");

      // Wrap the field changes in act to let Formik & Yup finish updating internal state
      await act(async () => {
        // Simulate entering a valid username.
        fireEvent.changeText(usernameInput, "myusername");
        // Simulate entering a password that satisfies every Yup validation rule.
        fireEvent.changeText(passwordInput, "Pass(w0rd)");
      });
      // console.log("Username value_:", usernameInput.props.value); // Debugging.
      // console.log("Password value_:", passwordInput.props.value); // Debugging.

      // Simulate pressing the Sign in button. Again wrapped in act().
      await act(async () => {
        fireEvent.press(submitButton);
      });
      // console.log("Button pressed");  // Debugging.

      // waitFor() repeatedly executes the enclosed callback until all expectations pass, or the timeout expires.
      await waitFor(() => {
        // console.log("Mock calls:", onSubmit.mock.calls);  // Debugging.
        // The mock handler should have been called once.
        expect(onSubmit).toHaveBeenCalledTimes(1);
        // Assert submission succeeded
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "myusername",
          password: "Pass(w0rd)"
        });
      });
    });
  });
});
