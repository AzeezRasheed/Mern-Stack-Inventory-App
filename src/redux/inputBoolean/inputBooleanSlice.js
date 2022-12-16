import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputBoolean: [],
};

const inputBooleanSlice = createSlice({
  name: "inputBoolean",
  initialState,
  reducers: {
    SET_INPUT_BOOLEAN: (state, action) => {
      state.inputBoolean = action.payload;
    },
  },
});

export const { SET_INPUT_BOOLEAN } = inputBooleanSlice.actions;

export const selectInputBoolean = (state) => state.inputBoolean.inputBoolean;

export default inputBooleanSlice.reducer;
