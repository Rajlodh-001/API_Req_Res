import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async (page) => {
  const res = await axios.get(`/users?page=${page}`);
  return res.data;
});

export const deleteUser =createAsyncThunk ("user/deleteUser", async (id)=>{
  const res = await axios.delete(`/users/${id}`)
  console.log("User",id," deleted Response code :",res.status)
  return res.data;
})

export const updateUser =createAsyncThunk("user/updateUser",async({id,editUser})=>{
  console.log(id,editUser)
  const res =await axios.put(`/user/${id}`,editUser)
console.log(res.data)
  return res.data;
})

const userSlice = createSlice({
  name: "user",
  initialState: { userdata: null, loading: null, error: null },
  reducers: {
    editUser: (state) => {
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state,action) => {
      state.loading = false;
      state.userdata = action.payload.data
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.error = "Rejected";
    });
  },
  // extraReducers:(builder)=>{
  //   builder.addCase(deleteUser.fulfilled),(state,action) =>{

  //   }
  // }
});

export const { editUser } = userSlice.actions;
export default userSlice.reducer;
