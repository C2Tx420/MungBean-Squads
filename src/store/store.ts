import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/theme-reducer";
import toastReducer from "./reducers/toast-reducer";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
