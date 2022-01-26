import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPatients = createAsyncThunk(
  "patients/patientsListFetch",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/patients");
      if (response.data.message) {
        return thunkAPI.rejectWithValue(response.data.message);
      }
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

const patientsSlice = createSlice({
  name: "patients",
  initialState: { patients: [], error: "", pending: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.pending, (state, action) => {
      return (state = {
        pending: true,
        patients: [],
        error: "",
      });
    });

    builder.addCase(fetchPatients.fulfilled, (state, action) => {
      return (state = {
        pending: false,
        patients: [...action.payload.patients],
        error: "",
      });
    });

    builder.addCase(fetchPatients.rejected, (state, action) => {
      return (state = {
        pending: false,
        patients: [],
        error: action.payload,
      });
    });
  },
});

export { fetchPatients };
export default patientsSlice.reducer;
