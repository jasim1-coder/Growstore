import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRIVATE_PYTHON_API } from "../../api/apiIndex";
import axios from "axios";
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
  async (userMessage, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3001/botReplies");
      const replies = res.data;

      // Simple keyword matching, case-insensitive
      const match = replies.find((item) =>
        userMessage.toLowerCase().includes(item.keyword.toLowerCase())
      );

      const botReply = match
        ? match.response
        : "Sorry, I didn't understand that. Can you please rephrase?";

      return { reply: botReply };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch replies");
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
    .addCase(fetchChatResponses.pending, (state) => {
      state.status = "loading";
      state.error = "";
    })
    .addCase(fetchChatResponses.fulfilled, (state, action) => {
      state.status = "success";
      state.error = "";
      state.responses = [
        ...state.responses,
        { sender: "bot", message: action.payload.reply },
      ];
    })
    .addCase(fetchChatResponses.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Error fetching chatbot reply";
    });
},
});

export const { setUserResponse, removeChatErrorMessage } = chatSlice.actions;

export const getChatResponses = (state) => state.chat.responses;
export const getChatStatus = (state) => state.chat.status;
export const getChatError = (state) => state.chat.error;

export default chatSlice.reducer;
