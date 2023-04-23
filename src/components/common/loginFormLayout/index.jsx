import React from "react";
import { google } from "../../../assets";
import { NODE_BASE_URL } from "../../../api/apiIndex";

const LoginFormLayout = ({ children, heading }) => {
  const handleGoogleLogin = () => {
    window.open(`${NODE_BASE_URL}/google`, "_self");
  };

  return (
    <div className="flex justify-center items-center w-full sm:py-12 py-6">
      <div className="sm:w-[450px] w-[95%] p-7 bg-formBackground rounded-sm border border-greyLight">
        <div className="flex flex-col gap-6">
          {/* Heading section */}
          <h2 className="text-uiBlack text-[20px] font-semibold">{heading}</h2>

          {/* Google Login section */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="border border-uiGrey rounded-sm flex flex-row gap-[4px] justify-center items-center h-[50px] hover:bg-greyLight transition-all duration-150"
          >
            <img src={google} />
            <span className="text-textDim">Continue with Google</span>
          </button>

          {/* OR section */}
          <div className="text-center flex flex-row w-full justify-between items-center gap-3">
            <div className="h-[1px] w-full bg-uiBlack" />
            <span className="text-textDim">or</span>
            <div className="h-[1px] w-full bg-uiBlack" />
          </div>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default LoginFormLayout;
