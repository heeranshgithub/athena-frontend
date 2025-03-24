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
} from "../store/api/userApiSlice";
import { setUser } from "../store/slices/userSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Register: React.FC = () => {
  const [isUser, setIsUser] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const toggleIsUser = () => setIsUser(!isUser);
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
        setUser({ token: res?.token, name: res?.name, email: res?.email }),
      );
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
        setUser({ token: res?.token, name: res?.name, email: res?.email }),
      );
    } catch (error) {
      Alert.alert("Error", "Login failed. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        className="flex-1 bg-[#0f0f0f] justify-center px-6"
        style={{ paddingTop: insets.top }}
      >
        <Text className="text-white text-3xl font-bold text-center mb-6">
          {isUser ? "Welcome Back" : "Create Account"}
        </Text>
        {!isUser && (
          <TextInput
            className="h-12 bg-[#1e1e1e] text-white px-4 rounded-lg mb-4"
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />
        )}
        <TextInput
          className="h-12 bg-[#1e1e1e] text-white px-4 rounded-lg mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
        />
        <TextInput
          className="h-12 bg-[#1e1e1e] text-white px-4 rounded-lg mb-4"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
        />
        {!isUser && (
          <TextInput
            className="h-12 bg-[#1e1e1e] text-white px-4 rounded-lg mb-4"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor="#888"
          />
        )}
        <TouchableOpacity
          className="h-12 bg-[#6366f1] justify-center items-center rounded-lg mb-4"
          onPress={isUser ? handleLogin : handleRegister}
        >
          <Text className="text-white text-lg font-bold">
            {isUser ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleIsUser}
          className="flex-row justify-center"
        >
          <Text className="text-gray-400 text-base">
            {isUser ? "New here? " : "Already have an account? "}
          </Text>
          <Text className="text-[#6366f1] text-base font-semibold">
            {isUser ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
