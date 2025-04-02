import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    console.log(credentials);
    const res = await axios.post("/login", credentials);
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Login failed!";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
