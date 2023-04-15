import React from "react";
import { ImSpinner8 } from "react-icons/im";

const PaymentLoading = ({ message }) => {
  return (
    <div className="fixed w-full h-full inset-0 bg-black/10 z-20">
      <div className="flex w-full h-full items-center justify-center">
        <div className="flex flex-col gap-6 items-center justify-center sm:w-[550px] w-full m-2 bg-uiWhite py-12 px-6 rounded-md shadow-sm border border-greyLight text-center">
          <ImSpinner8 className="text-[66px] animate-spin text-uiBlue" />
          <span className="text-bodyText">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentLoading;
