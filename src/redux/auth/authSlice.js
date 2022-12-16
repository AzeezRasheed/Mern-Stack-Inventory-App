import { createSlice } from "@reduxjs/toolkit";
const name = localStorage.getItem("name")
  ? JSON.parse(localStorage.getItem("name"))
  : null;
const initialState = {
  isLoggedIn: false,
  name:  name ? name : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    SET_NAME: (state, action) => {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.name = action.payload;
    },
    SET_USER: (state, action) => {
      const data = action.payload;
      state.user.name = data.name;
      state.user.email = data.email;
      state.user.email = data.email;
      state.user.phone = data.phone;
      state.user.bio = data.bio;
      state.user.photo= data.photo;
    },
  },
});

export default authSlice.reducer;
export const { SET_LOGIN, SET_USER, SET_NAME } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
