import React, { useState } from "react";
import { FiSave, FiXCircle } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { PRIVATE_API } from "../../../api/apiIndex";

const PasswordDetails = () => {
  const [changeActive, setChangeActive] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [cNewPassword, setCNewPassword] = useState("");
  const [cNewPasswordError, setCNewPasswordError] = useState("");

  const [status, setStatus] = useState("idle");

  const handlePassword = () => {
    setChangeActive(true);
  };

  const handleChangePassword = async () => {
    let err = false;

    if (!oldPassword || !oldPassword.trim()) {
      setOldPasswordError("Required");
      err = true;
    }
    if (!newPassword || !newPassword.trim()) {
      setNewPasswordError("Required");
      err = true;
    } else if (newPassword.length < 6) {
      setNewPasswordError("password should contain atleast 6 characters");
      err = true;
    } else if (newPassword !== cNewPassword) {
      setNewPasswordError("Passwords do not match!");
      err = true;
    }
    if (!cNewPassword || !cNewPassword.trim()) {
      setCNewPasswordError("Required");
      err = true;
    }
    if (!err) {
      setStatus("loading");
      try {
        const data = { oldPassword, newPassword };
        await PRIVATE_API.put("/auth/change-password", data);
        setStatus("idle");
        resetData();
        setChangeActive(false);
      } catch (error) {
        setOldPasswordError(
          error.response ? error.response.data.message : error.message
        );
        setStatus("idle");
        console.log(err);
      }
    }
  };

  const resetData = () => {
    setNewPassword("");
    setNewPasswordError("");
    setOldPassword("");
    setOldPasswordError("");
    setCNewPassword("");
    setCNewPasswordError("");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Password</h3>
      </div>
      <div className="flex sm:flex-row flex-col gap-6">
        <div className="sm:w-[30%]">
          <span className="text-sm text-textDim">
            It is recommended to change password frequently and use a strong
            password
          </span>
        </div>
        {changeActive ? (
          <div className="flex flex-col justify-between flex-1 sm:gap-6 gap-3">
            <div className="flex flex-col gap-2 sm:w-[48%] w-full">
              <label htmlFor="oldPass" className="text-sm">
                Old Password
              </label>
              <input
                type="password"
                name="oldPass"
                id="oldPass"
                value={oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setOldPasswordError("");
                }}
                className="p-2 border border-uiGrey bg-greyLight text-sm rounded-sm"
                placeholder="Enter old password"
              />
              {oldPasswordError && (
                <span className="input-error">{oldPasswordError}</span>
              )}
            </div>
            <div className="flex sm:flex-row flex-col justify-between flex-1 sm:gap-6 gap-3">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="newPass" className="text-sm">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPass"
                  id="newPass"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setNewPasswordError("");
                  }}
                  className="p-2 border border-uiGrey bg-greyLight text-sm rounded-sm"
                  placeholder="Enter new password"
                />
                {newPasswordError && (
                  <span className="input-error">{newPasswordError}</span>
                )}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="confirmPass" className="text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPass"
                  id="confirmPass"
                  value={cNewPassword}
                  onChange={(e) => {
                    setCNewPassword(e.target.value);
                    setCNewPasswordError("");
                  }}
                  className="p-2 border border-uiGrey bg-greyLight text-sm rounded-sm"
                  placeholder="Confirm your new password"
                />
                {cNewPasswordError && (
                  <span className="input-error">{cNewPasswordError}</span>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4 flex-1 h-min self-end">
              <button
                type="button"
                onClick={() => {
                  setChangeActive(false);
                  resetData();
                }}
                className="text-uiBlack border-uiGrey border py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150 flex items-center justify-center gap-2"
              >
                <FiXCircle />
                <span className="text-sm">Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleChangePassword}
                className="text-uiWhite border-baseGreen bg-baseGreen border py-2 px-4 rounded-sm hover:bg-darkGreen transition-all duration-150 flex items-center justify-center gap-2 min-w-[100px]"
                disabled={status === "loading"}
              >
                {status == "loading" ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  <>
                    <FiSave />
                    <span className="text-sm">Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <button
              type="button"
              onClick={handlePassword}
              className="text-uiBlack border-uiGrey border text-sm py-2 px-4 rounded-sm hover:bg-greyLight transition-all duration-150"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordDetails;
