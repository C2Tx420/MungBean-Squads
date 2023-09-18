import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    createToast: (state: any, action: PayloadAction<any>): any => {
      const newState = [action.payload]
        return state = newState;
    },
    removeToast: (state: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return state = [];
    },
  },
});

export const { createToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;
