import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    createToast: (state, action) => {
        return state = [action.payload];
    },
    removeToast: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return state = [];
    },
  },
});

export const { createToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
