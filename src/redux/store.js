import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    counter: counterReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
