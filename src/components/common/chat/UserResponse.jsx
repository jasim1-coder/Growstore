import React from "react";

const UserResponse = ({ message }) => {
  return (
    <div className="py-1 px-3 bg-uiGrey/30 rounded-xl max-w-[80%] w-max self-end mr-2">
      <p
        className="text-sm text-uiBlack"
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default UserResponse;
