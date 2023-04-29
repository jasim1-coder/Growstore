import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRIVATE_PYTHON_API } from "../../api/apiIndex";

const initialState = {
  responses: [
    {
      sender: "bot",
      message: "Hey, Welcome to Growcomers Chatbot!<br /> How may I help you?",
    },
  ],
  status: "idle",
  error: "",
};

export const fetchChatResponses = createAsyncThunk(
  "chat/fetchChatResponses",
  async (message, { rejectWithValue }) => {
    try {
      const response = await PRIVATE_PYTHON_API.get("/chat", {
        params: { query: message },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUserResponse: (state, action) => {
      state.responses = [
        ...state.responses,
        { sender: "user", message: action.payload },
      ];
    },
    removeChatErrorMessage: (state) => {
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // GET FEATURED Product
      .addCase(fetchChatResponses.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchChatResponses.fulfilled, (state, action) => {
        state.status = "success";
        state.error = "";
        state.responses = [
          ...state.responses,
          { sender: "bot", message: action.payload.data },
        ];
      })
      .addCase(fetchChatResponses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { setUserResponse, removeChatErrorMessage } = chatSlice.actions;

export const getChatResponses = (state) => state.chat.responses;
export const getChatStatus = (state) => state.chat.status;
export const getChatError = (state) => state.chat.error;

export default chatSlice.reducer;
