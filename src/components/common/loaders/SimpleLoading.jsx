import React from "react";
import { ImSpinner8 } from "react-icons/im";

const SimpleLoading = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-greyLight/50 z-50">
      <div className="flex w-full h-full justify-center items-center">
        <ImSpinner8 className="text-[66px] animate-spin text-uiBlue" />
      </div>
    </div>
  );
};

export default SimpleLoading;
