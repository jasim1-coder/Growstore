import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: 75,
};

export const fetchINRvalue = createAsyncThunk(
  "dai/fetchINRvalue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api.coinconvert.net/convert/dai/inr?amount=1"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const daiSlice = createSlice({
  name: "dai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchINRvalue.fulfilled, (state, action) => {
      state.data = action.payload.INR;
    });
  },
});

export const getINRvalue = (state) => state.dai.data;

export default daiSlice.reducer;
