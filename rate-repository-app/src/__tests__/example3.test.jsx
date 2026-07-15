import { useState } from "react";
import { Text, TextInput, Pressable, View } from "react-native";
import { render, screen, userEvent } from "@testing-library/react-native";

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onSubmit({ username, password });
  };

  return (
    <View>
      <TextInput
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />

      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
      />

      <Pressable onPress={handleSubmit}>
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
};

describe("Form", () => {
  it("calls function provided by onSubmit prop after pressing the submit button", async () => {
    const onSubmit = jest.fn();

    const user = userEvent.setup();

    await render(<Form onSubmit={onSubmit} />);

    await user.type(screen.getByPlaceholderText("Username"), "kalle");

    await user.type(screen.getByPlaceholderText("Password"), "password");

    await user.press(screen.getByText("Submit"));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: "kalle",
      password: "password"
    });
  });
});
