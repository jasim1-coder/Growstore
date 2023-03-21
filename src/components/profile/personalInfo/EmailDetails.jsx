import React from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const EmailDetails = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">E-mail Address</h3>
      </div>
      <div className="flex sm:flex-row flex-col gap-6">
        <div className="sm:sm:w-[30%]">
          <span className="text-sm text-textDim">
            E-mail address is permanent and cannot be updated
          </span>
        </div>
        <div className="flex sm:flex-row flex-col justify-between flex-1 sm:gap-6 gap-3">
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-sm">E-mail Address</p>
            <span className="font-medium text-bodyText">abc@gmail.com</span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <p className="text-sm">E-mail Verified</p>
            <div className="flex flex-row gap-2 items-center text-baseGreen p-2">
              <FiCheckCircle />
              <span className="text-sm text-bodyText">Yes</span>
            </div>
            {/* <div className="flex flex-row gap-2 items-center">
                <FiXCircle className="text-uiRed" />
                <button
                  type="button"
                  className="text-uiWhite bg-baseGreen py-2 px-4 text-sm hover:bg-darkGreen transition-all duration-150"
                >
                  Send Verification Link
                </button>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetails;
