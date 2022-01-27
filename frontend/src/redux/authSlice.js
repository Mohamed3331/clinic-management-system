import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { localStorageHandler } from '../Utils/localStorage'
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

const authSlice = createSlice({
  name: "admin",
  initialState: {},
  reducers: {
    logout: (state) => {
      state.token = ''
    },
  },
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


// console.log(authSlice.actions.logout().type === 'admin/logout');

// const authMiddleware = (store) => (next) => (action) => {
//   console.log(action);
//   // console.log(authSlice.actions.logout.match(action));
//   if (authSlice.actions.logout.match(action) || action.type === 'login/auth/rejected') {
//     console.log('dsfds');
//     removeTokenLocalStorage()
//   }
//   return next(action);
// };

const { logout } = authSlice.actions

export { loginUser, logout };
export default authSlice.reducer;
