import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "../../store/api/userApiSlice";
import { setUser } from "../../store/slices/userSlice";
import * as React from "react";

const Register: React.FC = () => {
  const [isUser, setIsUser] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();

  const toggleIsUser = () => {
    setIsUser(!isUser);
  };

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      const userData = { name, email, password };
      const res = await registerUser(userData).unwrap();

      dispatch(
        setUser({
          token: res?.token,
          name: res?.name,
        }),
      );

      Alert.alert("Success", "User registered successfully!");
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    try {
      const userData = { email, password };
      const res = await loginUser(userData).unwrap();
      dispatch(
        setUser({
          token: res?.token,
          name: res?.name,
        }),
      );
      Alert.alert("Success", "User logged in successfully!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 p-5 justify-center bg-blue-900">
        <Text className="text-2xl font-bold text-white text-center mb-5">
          {isUser ? "Login" : "Register"}
        </Text>

        {!isUser && (
          <TextInput
            className="h-12 border border-gray-300 rounded px-3 bg-white text-base mt-4"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#A9A9A9"
          />
        )}

        <TextInput
          className="h-12 border border-gray-300 rounded px-3 bg-white text-base mt-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#A9A9A9"
        />

        <TextInput
          className="h-12 border border-gray-300 rounded px-3 bg-white text-base mt-4 mb-4"
          placeholder={isUser ? "Password" : "Set Password"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#A9A9A9"
        />

        {!isUser && (
          <TextInput
            className="h-12 border border-gray-300 rounded px-3 bg-white text-base mb-4"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#A9A9A9"
          />
        )}

        <TouchableOpacity
          className="h-12 bg-blue-500 justify-center items-center rounded mb-4"
          onPress={isUser ? handleLogin : handleRegister}
        >
          <Text className="text-white text-lg font-bold">
            {isUser ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleIsUser}>
          <View className="flex flex-row justify-center gap-4">
            <Text className="text-base text-white text-center">
              {isUser ? "New User?" : "Already have an account?"}
            </Text>
            <Text className="text-base text-blue-300 text-center">
              {isUser ? "Register" : "Login"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
