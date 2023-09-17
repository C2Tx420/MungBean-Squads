import { createSlice } from "@reduxjs/toolkit";

const initialState: string = 'dark'

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      if (state === "dark") {
        return state = "light";
      } else {
        return state = "dark";
      }
    },
  },
});


export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer