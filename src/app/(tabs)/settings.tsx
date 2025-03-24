import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  getUserEmail,
  getUserName,
} from "../../store/slices/userSlice";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const SettingsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const userEmail = useSelector(getUserEmail);
  const userName = useSelector(getUserName);
  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <View
      className="flex-1 bg-[#121212] p-6"
      style={{ paddingTop: insets.top }}
    >
      <Text className="text-white text-2xl font-bold mb-6">Settings</Text>

      <View className="bg-[#1f2937] p-4 rounded-lg flex-row items-center mb-4">
        <FontAwesome name="user" size={24} color="white" className="mr-4" />
        <View>
          <Text className="text-white text-lg font-semibold">{userName}</Text>
          <Text className="text-gray-400 text-sm">{userEmail}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-[#8b0000] p-4 rounded-lg mt-6"
        onPress={handleLogout}
      >
        <View className="flex-row items-center justify-center">
          <MaterialIcons
            name="logout"
            size={20}
            color="white"
            className="mr-2"
          />
          <Text className="text-white text-lg font-semibold">Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
