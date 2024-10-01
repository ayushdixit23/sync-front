import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../lib/userSlice";
import receiverSlice from "@/lib/receiverSlice";
import signupSlice from "@/lib/signupSlice";

export const makeStore = configureStore({
  reducer: {
    user: userSlice,
    signup: signupSlice,
    receiver: receiverSlice,
  },
});
