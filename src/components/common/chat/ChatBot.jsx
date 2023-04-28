import React, { useState } from "react";
import { FiMessageSquare, FiX } from "react-icons/fi";
import ChatBox from "./ChatBox";

const ChatBot = () => {
  const [opened, setOpened] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-10">
      <div className="flex flex-col gap-4">
        {opened ? <ChatBox opened={opened} /> : null}
        <div className="self-end">
          <button
            className="text-uiWhite bg-baseGreen border border-baseGreen rounded-full p-[0.8rem] text-[28px]"
            onClick={() => setOpened((prev) => !prev)}
          >
            {opened ? <FiX /> : <FiMessageSquare />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
