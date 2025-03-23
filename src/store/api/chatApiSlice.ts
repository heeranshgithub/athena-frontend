import baseApiSlice from "./baseApiSlice";

export const chatApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<string, string>({
      query: (message) => ({
        url: "/chat",
        method: "POST",
        body: { message },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = chatApiSlice;
