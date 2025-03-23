import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Adjust the import based on your store location

const currBaseSimURL = "http://10.0.2.2:8080/api/v1/";
const currBase_HP_BH_IP_URl = "http://172.16.16.123:8080/api/v1/";
const currBase_HP_Home_IP_URl = "http://192.168.1.108:8080/api/v1/";

const baseApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: currBaseSimURL,
    // baseUrl: currBase_HP_IP_URl,
    baseUrl: currBase_HP_Home_IP_URl,
    // baseUrl: currBase_HP_BH_IP_URl,
    prepareHeaders: async (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      const token = (getState() as RootState)?.user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default baseApiSlice;