import * as SecureStore from "expo-secure-store";

// Constants for storage keys
const STORAGE_KEYS = {
  USER_TOKEN: "userToken",
  USER_NAME: "userName",
  USER_EMAIL: "userEmail",
};

const secureStorage = {
  saveUserToken: async (token: string): Promise<void> => {
    try {
      if (typeof token === "string") {
        await SecureStore.setItemAsync(STORAGE_KEYS.USER_TOKEN, token);
      } else {
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER_TOKEN);
      }
    } catch (error) {
      console.error("Error saving user token:", error);
    }
  },
  saveUserName: async (name: string): Promise<void> => {
    try {
      if (typeof name === "string") {
        await SecureStore.setItemAsync(STORAGE_KEYS.USER_NAME, name);
      } else {
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER_NAME);
      }
    } catch (error) {
      console.error("Error saving user name:", error);
    }
  },
  saveUserEmail: async (email: string): Promise<void> => {
    try {
      if (typeof email === "string") {
        await SecureStore.setItemAsync(STORAGE_KEYS.USER_EMAIL, email);
      } else {
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER_EMAIL);
      }
    } catch (error) {
      console.error("Error saving user email:", error);
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
  getUserEmail: async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.USER_EMAIL);
    } catch (error) {
      console.error("Error getting user email:", error);
      return null;
    }
  },
  clearUserData: async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_TOKEN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_NAME);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_EMAIL);
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  },
};

export default secureStorage;
