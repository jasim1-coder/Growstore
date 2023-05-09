import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PRIVATE_PYTHON_API } from "../../api/apiIndex";

const initialState = {
  data: 75,
  trainStatus: "idle",
  trainError: "",
  trainData: null,
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

export const trainCFModel = createAsyncThunk(
  "dai/trainCFModel",
  async (data, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_PYTHON_API.post("/train", data);
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
    builder
      .addCase(fetchINRvalue.fulfilled, (state, action) => {
        state.data = action.payload.INR;
      })

      .addCase(trainCFModel.pending, (state) => {
        state.trainStatus = "loading";
        state.trainError = "";
      })
      .addCase(trainCFModel.fulfilled, (state, action) => {
        state.trainStatus = "success";
        state.trainError = "";
        state.trainData = action.payload.data;
      })
      .addCase(trainCFModel.rejected, (state, action) => {
        state.trainStatus = "failed";
        state.trainError = action.payload.message;
      });
  },
});

export const getINRvalue = (state) => state.dai.data;

export const getTrainingSummary = (state) => state.dai.trainData;
export const getTrainingStatus = (state) => state.dai.trainStatus;
export const getTrainingError = (state) => state.dai.trainError;

export default daiSlice.reducer;
