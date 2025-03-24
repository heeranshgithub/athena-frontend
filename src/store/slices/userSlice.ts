import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import secureStorage from "../../utils/secureStorage";

interface UserState {
  token: string | null;
  name: string;
  email: string;
}

const initialState: UserState = {
  token: null,
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; name: string; email: string }>,
    ) => {
      const { token, name, email } = action.payload;
      state.token = token;
      state.name = name;
      state.email = email;

      secureStorage.saveUserToken(token);
      secureStorage.saveUserName(name);
      secureStorage.saveUserEmail(email);
    },

    clearUser: (state) => {
      state.token = null;
      state.name = "";
      state.email = "";
      secureStorage.clearUserData();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUserToken = (state: { user: UserState }) => state?.user?.token;
export const getUserName = (state: { user: UserState }) => state?.user?.name;
export const getUserEmail = (state: { user: UserState }) => state?.user?.email;

export default userSlice.reducer;
