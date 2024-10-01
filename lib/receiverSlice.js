import { createSlice } from "@reduxjs/toolkit";
const receiverSlice = createSlice({
  name: "receiver",
  initialState: {
    rid: null,
    rusername: "",
    convId: "",
  },
  reducers: {
    receiverData: (state, action) => {
      const { rid, rusername } = action.payload;
      (state.rid = rid), (state.rusername = rusername);
    },
  },
});

export const { receiverData } = receiverSlice.actions;
export default receiverSlice.reducer;
