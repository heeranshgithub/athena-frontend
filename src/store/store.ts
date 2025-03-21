import { configureStore } from "@reduxjs/toolkit";
import baseApiSlice from "./api/baseApiSlice";
import userReducer from "./slices/userSlice";
import devToolsEnhancer from "redux-devtools-expo-dev-plugin";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: false,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(devToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
