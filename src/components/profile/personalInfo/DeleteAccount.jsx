import React, { useState } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { PRIVATE_API } from "../../../api/apiIndex";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";

const DeleteAccount = () => {
  const [deactivateActive, setDeactivateActive] = useState(false);
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const handleDeactivate = async () => {
    setStatus("loading");
    try {
      await PRIVATE_API.delete("/auth");
      setStatus("idle");
      dispatch(logout());
      setDeactivateActive(false);
    } catch (error) {
      setStatus("idle");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Deactivate Account</h3>
      </div>
      <div className="flex sm:flex-row flex-col gap-6">
        <div className="sm:w-[30%]">
          <span className="text-sm text-textDim">
            Deactivating account will deactivate all the services and you may
            miss on exciting offers at Growcomers
          </span>
        </div>
        {deactivateActive ? (
          <div className="flex flex-col sm:gap-4 gap-3">
            <p className="text-uiBlack font-medium">
              Are you sure you want to deactivate your account?
            </p>
            <div className="flex flex-row gap-4 flex-1 h-min">
              <button
                type="button"
                onClick={() => setDeactivateActive(false)}
                className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
              >
                <FiXCircle />
                <span className="text-sm">Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleDeactivate}
                className="text-uiWhite border-uiRed bg-uiRed border py-2 px-4 rounded-sm transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
                disabled={status === "loading"}
              >
                {status == "loading" ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  <>
                    <FiCheckCircle />
                    <span className="text-sm">Confirm</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <button
              type="button"
              onClick={() => setDeactivateActive(true)}
              className="bg-uiRed border border-uiRed text-uiWhite text-sm py-2 px-4 rounded-sm"
            >
              Deactivate account
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccount;
