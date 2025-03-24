import * as SecureStore from "expo-secure-store";

// Constants for storage keys
const STORAGE_KEYS = {
  USER_TOKEN: "userToken",
  USER_NAME: "userName",
  USER_EMAIL: "userEmail",
  TASKS: "tasks",
};

const secureStorage = {
  saveUserToken: async (token: string): Promise<void> => {
    try {
      if (typeof token === "string") {
        await SecureStore.setItemAsync(STORAGE_KEYS.USER_TOKEN, token);
      } else {
        await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_TOKEN);
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
        await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_NAME);
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
        await SecureStore.deleteItemAsync(STORAGE_KEYS.USER_EMAIL);
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

  // Methods for handling tasks
  saveTasks: async (tasks: any[]): Promise<void> => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  },
  getTasks: async (): Promise<any[]> => {
    try {
      const tasks = await SecureStore.getItemAsync(STORAGE_KEYS.TASKS);
      return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
      console.error("Error getting tasks:", error);
      return [];
    }
  },
  clearTasks: async (): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.TASKS);
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  },
};

export default secureStorage;
