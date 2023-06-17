import React from "react";
import { useEffect } from "react";

const ConfirmBox = ({ setShowBox, onConfirm, message }) => {
  useEffect(() => {
    let element = document.querySelector("#edit-product");
    if (!element) {
      element = document.querySelector("body");
    }
    element.style.overflow = "hidden";

    return () => {
      element.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 bg-uiBlack/20 backdrop-blur-[1px] h-full w-full">
      <div
        onClick={() => setShowBox(false)}
        className="fixed w-full h-full inset-0"
      />

      <div className="flex items-center justify-center w-full h-full">
        <div className="bg-[#fff] border border-greyLight shadow-md rounded-sm flex flex-col justify-center items-center w-max h-max gap-5 p-6 z-20">
          <div className="text-center">
            <span className="text-[18px] font-semibold pb-1">{message}</span>
            <p className="text-textDim text-sm text-center">
              Are you sure you want to {message}?
            </p>
          </div>

          <div className="flex sm:flex-row gap-y-5 flex-col sm:justify-between justify-center sm:w-full gap-6">
            <button
              type="button"
              className="py-2 w-[140px] border border-green-500 text-green-500 hover:bg-green-200 text-sm rounded-sm transition-all duration-150"
              onClick={() => setShowBox(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="py-2 w-[140px] border border-red-500 bg-red-500 hover:bg-red-600 text-white rounded-sm text-sm transition-all duration-150"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;
