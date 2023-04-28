import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { FiSend } from "react-icons/fi";
import {
  fetchChatResponses,
  getChatStatus,
  setUserResponse,
} from "../../../redux/slice/chatSlice";

const ChatMessage = () => {
  const dispatch = useDispatch();
  const status = useSelector(getChatStatus);
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (message && message.trim() && status !== "loading") {
      dispatch(fetchChatResponses(message));
      dispatch(setUserResponse(message));
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        return;
      }
      handleSend(e);
    }
  };

  return (
    <form onSubmit={handleSend} className="py-2 mt-auto">
      <div className="relative w-full flex flex-row items-end">
        <TextareaAutosize
          className="w-full pr-[32px] pl-2 text-sm resize-none focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your message"
          minRows={1}
          autoFocus
        />
        <button
          className="absolute right-2 text-[20px] text-baseGreen disabled:text-uiGrey"
          type="submit"
          disabled={status === "loading"}
        >
          <FiSend />
        </button>
      </div>
    </form>
  );
};

export default ChatMessage;
