import React, { useEffect, useRef } from "react";
import { logoSmall } from "../../../assets";
import ChatMessage from "./ChatMessage";
import BotResponse from "./BotResponse";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatError,
  getChatResponses,
  getChatStatus,
  removeChatErrorMessage,
} from "../../../redux/slice/chatSlice";
import UserResponse from "./UserResponse";
import AlertBox from "../AlertBox";
import { fetchCartItems } from "../../../redux/slice/cartSlice";

const ChatBox = () => {
  const chatBoxRef = useRef(null);
  const dispatch = useDispatch();

  const responses = useSelector(getChatResponses);
  const status = useSelector(getChatStatus);
  const error = useSelector(getChatError);

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [responses]);

  useEffect(() => {
    if (status === "success") {
      dispatch(fetchCartItems());
    }
  }, [status]);

  return (
    <div
      className={`w-[320px] h-[400px] chatbot-container bg-white p-2 rounded-xl`}
    >
      {status === "failed" ? (
        <AlertBox
          message={error}
          type={status}
          toDispatch={removeChatErrorMessage}
        />
      ) : null}
      <div className="flex flex-col h-full">
        <div className="flex flex-row items-center gap-2 py-2 border-b border-b-greyLight">
          <img src={logoSmall} alt="" className="h-[36px]" />
          <div className="flex flex-row gap-2 items-center">
            <p className="font-medium text-sm text-uiBlack">Chatbot</p>
            <div className="w-[8px] h-[8px] rounded-full bg-green-500" />
          </div>
        </div>
        <div
          ref={chatBoxRef}
          className="flex flex-col gap-2 py-3 border-b border-b-greyLight flex-grow overflow-y-auto scrollbar"
        >
          {responses.map((entry, key) =>
            entry.sender === "bot" ? (
              <BotResponse message={entry.message} key={key} />
            ) : (
              <UserResponse message={entry.message} key={key} />
            )
          )}
          {status === "loading" ? <BotResponse message="Loading..." /> : null}
        </div>
        <ChatMessage />
      </div>
    </div>
  );
};

export default ChatBox;
