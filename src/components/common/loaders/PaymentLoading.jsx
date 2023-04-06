import React from "react";
import { ImSpinner8 } from "react-icons/im";

const PaymentLoading = ({ message }) => {
  return (
    <div className="fixed w-full h-full inset-0 bg-black/10">
      <div className="flex flex-col gap-3 w-full h-full items-center justify-center">
        <ImSpinner8 className="text-[66px] animate-spin text-uiGrey" />
        <span className="text-bodyText text-[20px]">{message}</span>
      </div>
    </div>
  );
};

export default PaymentLoading;
