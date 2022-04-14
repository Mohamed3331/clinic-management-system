import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchRegPatients = createAsyncThunk(
  "registerdPatients/patients",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/registered/patients`
      );
      if (response.data.message) {
        return thunkAPI.rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const regPatientsSlice = createSlice({
  name: "regPatientsSlice",
  initialState: { registeredPatients: [], error: "", pending: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegPatients.pending, (state, action) => {
      return (state = {
        pending: true,
        registeredPatients: [],
        error: "",
      });
    });

    builder.addCase(fetchRegPatients.fulfilled, (state, action) => {
      return (state = {
        pending: false,
        registeredPatients: [...action.payload.registeredPatients],
        error: "",
      });
    });

    builder.addCase(fetchRegPatients.rejected, (state, action) => {
      return (state = {
        pending: false,
        registeredPatients: [],
        error: action.payload,
      });
    });
  },
});

export { fetchRegPatients };
export default regPatientsSlice.reducer;
