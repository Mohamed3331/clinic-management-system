import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const filterPatients = createAsyncThunk("filteredPatients/patients", async (searchQuery, thunkAPI) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/search?term=${searchQuery}`
    );
    if (response.data.message) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
    return response.data;

  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});



const filteredPatientsSlice = createSlice({
  name: "filteredPatients",
  initialState: { filteredPatients: [], error: "", pending: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filterPatients.pending, (state, action) => {
      return (state = {
        pending: true,
        filteredPatients: [],
        error: "",
      });
    });

    builder.addCase(filterPatients.fulfilled, (state, action) => {
      console.log(action);
      return (state = {
        pending: false,
        filteredPatients: [...action.payload],
        error: "",
      });
    });

    builder.addCase(filterPatients.rejected, (state, action) => {
      return (state = {
        pending: false,
        filteredPatients: [],
        error: action.payload,
      });
    });
  },
});

export { filterPatients };
export default filteredPatientsSlice.reducer;
