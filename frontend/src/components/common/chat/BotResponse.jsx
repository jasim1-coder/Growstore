import React from "react";

const BotResponse = ({ message }) => {
  return (
    <div className="py-2 px-3 bg-baseGreen rounded-xl max-w-[80%] w-max ml-1">
      <p
        className="text-sm text-uiWhite"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default BotResponse;
