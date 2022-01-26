import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUser = createAsyncThunk("login/auth", async (userCred, thunkAPI) => {
  try {
    const response = await axios({
      method: "post",
      url: `http://localhost:5000/admin/login`,
      data: userCred,
    });
    if (response.data.message) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const token = localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""

const initialState = { token, error: "" }


const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(loginUser.fulfilled, (state, action) => {
      return (state = {
        token: action.payload.token,
        error: "",
      });
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      return (state = {
        token: "",
        error: action.payload,
      });
    });
  },
});

export { loginUser };
export default adminSlice.reducer;
