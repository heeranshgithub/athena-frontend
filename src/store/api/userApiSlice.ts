import {
  AuthResponse,
  LoginUserRequest,
  RegisterUserRequest,
} from "../../interfaces/authInterfaces";
import baseApiSlice from "./baseApiSlice";

export const userApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterUserRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<AuthResponse, LoginUserRequest>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApiSlice;
