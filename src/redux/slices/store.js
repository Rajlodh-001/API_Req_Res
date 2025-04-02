import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "./userSlice"
import { useReducer } from "react";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
   
  },
});