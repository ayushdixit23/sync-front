import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    email: "",
    organization: "",
    image: null,
    password: null,
    name: "",
  },
  reducers: {
    userData: (state, action) => {
      const { id, email, organization, image } = action.payload;
      state.id = id;
      state.email = email;
      state.organization = organization;
      state.image = image;
    },
    setnewuser: (state, action) => {
      const { name, email, password, image } = action.payload;
      state.name = name;
      state.email = email;
      //  state.organization = organization;
      state.password = password;
      state.image = image;
    },
  },
});
export const { userData, setnewuser } = userSlice.actions;
export default userSlice.reducer;
