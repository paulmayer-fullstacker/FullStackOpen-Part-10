# FormikTextInputComponent

## Introduction

Exercise-22 required implementation of a Sign-Up form. Another form demanding user input, validation, and error responses. A form similar to Sign-In and Creat Review, with the potential to generate more code duplication. Thus, I elected to create a reusable component (the FormikTextInputComponent), that would deal with the duplicate user input, validation, and error responses functions, while controlling code duplication. Promoting code readability and maintainability.

To clarify the function of the FormikTextInputComponent, I will walk through its usage, tracing the lifecycle of the username field, through the Sign-Up process.

## Form lifecycle

Here I will attempt to explanain the operation of `FormikTextInputComponent`, including its role within the form lifecycle and its interaction with the dependent files, by following the field `username`, through the many stages of the Sign up process.

### Stage 1 - The form is created:

Before the user makes any text input, they select Sign up from the app bar. React Router navigates to the /signup route and renders the SignUp component. SignUp then renders the SignUpContainer component, where the Formik form is created.

### Stage 2 - In SignUpContainer.jsx we create Formik:

```text
const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit
});
```

with the initial values being all empty strings (username: "", password: "", and passwordConfirm: "").

Formik now creates an internal state object containing, amongst other things, the following:

```text
{
  values: {
    username: "",
    password: "",
    passwordConfirm: ""
  },

  touched: {
    username: false,
    password: false,
    passwordConfirm: false
  },

  errors: {}
}
```

Internally, Formik stores more information (i.e.: isSubmitting, submitCount, isValidating), but these are beyond the scope of this explanation. Formik also creates helper functions internally, such as: setValue(), setTouched(), validateField(), validateForm(), and handleSubmit()

React creates and renders the form, but it is Formik that owns and will manage the state. Whenever Formik's state changes, React automatically re-renders the affected components to reflect the new state.

### Stage 3 - In SignUpContainer.jsx FormikProvider shares the state:

Formik is wrapped within FormikProvider:

```text
<FormikProvider value={formik}>
```

FormikProvider uses React Context to make the Formik state available to descendant components (when they call `useField()`, to read the context).

React then renders every child inside the Provider (with the container styles). One of those children being FormikTextInputComponent with a `name="username"` field:

```text
// FormikProvider makes formik context available down to FormikTextInputComponent instances.
    <FormikProvider value={formik}>
      <View style={styles.container}>
        <FormikTextInputComponent
        // Our tracked field
          name="username"
          placeholder="Username"
          autoCapitalize="none"
          testID="usernameInput"
        />

        <FormikTextInputComponent
          name="password"
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          testID="passwordInput"
        />
        {/* ... truncated */}

```

### Stage 4 - Username connects itself to Formik:

Moving into FormikTextInputComponent.jsx, one instance of FormikTextInputComponent receives `name="username"`, when it is created, via:

```text
const FormikTextInputComponent = ({ name, ...props }) => {
```

the next instance of FormikTextInputComponent receives `name="password"`. We will follow the FormikTextInputComponent that received `name="username"`.

In the next line we see:

```text
const [field, meta, helpers] = useField(name);
```

Here, FormikTextInputComponent calls useField(name). Since name contains "username", useField(name) connects this component to Formik's "username" field and returns three live objects:

- field – the current value
- meta – validation and touched information
- helpers – functions for updating the field

creating live links to that field's value, metadata, and helper function.

Now the FormikTextInputComponent has everything it needs to render itself.

### Stage 5 - TextInput is rendered:

Continuing in FormikTextInputComponent.jsx, React now renders the `TextInput` component:

```text
<TextInput
  onChangeText={(value) => helpers.setValue(value)}
  onBlur={() => helpers.setTouched(true)}
  value={field.value}
/>
```

As `field.value` is currently `""` (from SignUpContainer's initial state), the textbox starts empty.

React now waits and the application will sits idle, until the user types into the input field.

### Stage 6 - The user types:

The user types the first character (e.g.: 'A'). Now, React Native's native text input detects that the user typed "A". React Native fires the event `onChangeText("A")`.

Because we specified that `onChangeText={(value) => helpers.setValue(value)}`, the helper function `helpers.setValue("A")` is called.

### Stage 7 - Formik updates its state:

Inside the Formik library, Formik receives `setValue("A")`. Since this field is connected to `username`, Formik updates `values.username` from `""` to `"A"`. Formik also marks its internal state as changed, which causes React to schedule another render. This is repeated as every character in the username is typed, or whenever a change is made to the username input field.

### Stage 8 - useField runs again:

Formik has now updated its internal state. Because the Formik state has changed, React schedules another render. FormikTextInputComponent is invoked again and useField(name) now returns an updated field.value. This process repeats after every keystroke until the user finishes entering their username.

### Stage 9 - The user finishes typing:

Once the user finishes typing, values.username contains the completed username. Although the user only interacted with the TextInput, every keystroke has been synchronised with Formik's internal state.

### Stage 10 - The user leaves the field:

The user taps the Password box, and React Native automatically fires `onBlur()`, because the text input lost focus. Our code executes `helpers.setTouched(true)`, and Formik updates its internal state to `touched.username = true`. Formik now knows that the user has interacted with this field, and can now arbitrate whether validation errors should be displayed.

### Stage 11 - Validation:

Formik now executes the validation schema that we defined in SignUpContainer.jsx:

```text
const validationSchema = yup.object().shape({
  username: yup
    .string() // Evaluate variable data type to ensure string.
    .min(5, "Username must be between 5 and 30 characters long")
    .max(30, "Username must be between 5 and 30 characters long")
    .required("Username is required"), // Invalid if property evaluates to false.
  password: yup
  {/* ... truncated */}
```

Formik automatically calls Yup, passing our field values: `username:"Abcd", password:"", passwordConfirm:""`

Yup checks every rule in the schema, and for username, returns `"Username must be between 5 and 30 characters long".` The returned validation error is stored in Formik's internal errors object..

### Stage 12 - React renders again:

Because Formik's state changed (either touched, errors, or both), React re-renders the component. So, in FormikTextInputComponent, `useField("username")` runs again and now returns updated metadata. If validation failed, meta.error contains the error message. If validation passed, meta.error is undefined.

Also in the FormikTextInputComponent, below `useField()`, we defined `const showError = meta.touched && meta.error;`.So, If the field has been touched and there is an error, `showError` becomes true. Otherwise it is false. Through this boolean, we control two things: the border colour, and whether the error message is rendered.

```text
  style={[
    styles.input,
    // Conditional styling on validation error.
    showError ? styles.inputError : styles.inputMarginBottom
]}
   // ... Trunkated.

  {showError && (
        // Display the dynamic error string provided directly by your Yup schema (meta.error). */}
        <Text style={styles.errorMessageText}>{meta.error}</Text>
        // else: do nothing.
      )}
```

We do not directly tell React to draw a red border and render the error text. React simply re-renders with different data, and becauseyour JSX depends on showError, the UI changes automatically.

### Stage 13 - The user presses "Sign up":

In SignUpContainer.jsx, we defined our button as:

```text
  <Pressable
    onPress={formik.handleSubmit}
  >
```

So, we don't call `handleSubmit()` directly. We pass that function itself to Pressable. Then, When the user taps the button, React Native calls `formik.handleSubmit()` for us.

### Stage 14 - Formik validation approval:

Before calling your onSubmit, Formik validates the entire form against our Yup schema.

If any field is invalid:

- The corresponding errors entries are updated,
- React re-renders,
- Error messages are displayed

Formik stops the submission process here. Our `onSubmit` function will not be called, until Formik approves validation.

### Stage 15 - Formik calls onSubmit:

Once validation is approved, Formik executes the callback we originally passed to useFormik() in SignUpContainer.jsx:

useFormik({
initialValues,
validationSchema,
onSubmit
});

Control now returns to SignUp.jsx, because the onSubmit function was created in SignUp.jsx, passed into SignUpContainer.jsx as a prop, and then supplied to useFormik(). Formik stored a reference to this function when the form was first created.

Formik now calls it with the completed form values:

onSubmit({
username: "PaulM",
password: "secret123",
passwordConfirm: "secret123"
});

At this point, Formik relinquishes responsibility.

### Stage 16 - Our business logic:

Control returns to SignUp.jsx, as our `onSubmit` function receives the validated values:

const onSubmit = async (values) => {
const { username, password } = values;

await signUp({ username, password });
await signIn({ username, password });
navigate("/");
};

This is where our application-specific busines logic kicks in:

- signUp() calls our useSignUp hook.
- useSignUp executes the GraphQL CREATE_USER mutation using Apollo Client.
- When the server confirms that the account has been created, signIn() automaticaly authenticates the new user.
- Finally, navigate("/") tells React Router Native to display the repository list.

Throughout this process, FormikTextInputComponent remained completely unaware of GraphQL, authentication, routing, or the rest of the form. Its sole responsibility was to synchronise a single input field with Formik's state. This separation of responsibilities makes the component reusable across the Sign In, Sign Up, and Create Review forms.

## Conclusion

Although `FormikTextInputComponent` appears to be a relatively small component, it plays a central role in the form lifecycle. By abstracting repetitive tasks (synchronising user input, tracking field state, and displaying validation errors), it allows the Sign In, Sign Up, and Create Review forms to share the same behaviour with minimal code duplication.

Following the `username` field through each stage of the Sign-Up process demonstrates how React, React Native, Formik, Yup, and Apollo Client each fulfil a specific responsibility. Together, they provide a clear separation of concerns, resulting in code that is easier to understand, maintain, and extend.

## END

---

<br/>

<hr style="height: 5px; background-color: black; border: none;">
