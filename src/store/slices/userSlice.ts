import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import secureStorage from "../../utils/secureStorage";

interface UserState {
  token: string | null;
  name: string;
}

const initialState: UserState = {
  token: null,
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ token: string; name: string }>,
    ) => {
      const { token, name } = action.payload;
      state.token = token;
      state.name = name;

      secureStorage.saveUserToken(token);
      secureStorage.saveUserName(name);
    },

    clearUser: (state) => {
      state.token = null;
      state.name = "";

      secureStorage.clearUserData();
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUserToken = (state: { user: UserState }) => state?.user?.token;
export const getUserName = (state: { user: UserState }) => state?.user?.name;

export default userSlice.reducer;
