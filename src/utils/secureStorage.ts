import * as SecureStore from "expo-secure-store";

// Constants for storage keys
const STORAGE_KEYS = {
  USER_TOKEN: "userToken",
  USER_NAME: "userName",
};

const secureStorage = {
  saveUserToken: async (token: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_TOKEN, token);
    } catch (error) {
      console.error("Error saving user token:", error);
    }
  },

  saveUserName: async (name: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.USER_NAME, name);
    } catch (error) {
      console.error("Error saving user name:", error);
    }
  },
  getUserToken: async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.USER_TOKEN);
    } catch (error) {
      console.error("Error getting user token:", error);
      return null;
    }
  },

  getUserName: async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.USER_NAME);
    } catch (error) {
      console.error("Error getting user name:", error);
      return null;
    }
  },
  clearUserData: async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_NAME);
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  },
};

export default secureStorage;
