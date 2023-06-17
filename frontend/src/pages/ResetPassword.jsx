import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getResetPasswordError,
  getResetPasswordStatus,
  getUser,
  removeResetPasswordError,
  resetPassword,
} from "../redux/slice/authSlice";
import AlertBox from "../components/common/AlertBox";
import { ImSpinner2 } from "react-icons/im";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const status = useSelector(getResetPasswordStatus);
  const error = useSelector(getResetPasswordError);

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [cpassword, setCpassword] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    var err = false;

    if (!password) {
      setPasswordError("Password is required");
      err = true;
    } else if (password.length < 6) {
      setPasswordError("Too short");
      err = true;
    } else if (password !== cpassword) {
      setPasswordError("Passwords do not match!");
      err = true;
    }
    if (!cpassword) {
      setCpasswordError("Confirm password is required");
      err = true;
    }

    if (!err) {
      const data = { token, data: { password } };
      const result = await dispatch(resetPassword(data)).unwrap();
      if (result) {
        navigate("/login", {
          replace: true,
          state: { message: "Password changed successfully." },
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user]);

  return (
    <Layout>
      {status === "failed" ? (
        <AlertBox
          type={status}
          message={error}
          toDispatch={removeResetPasswordError}
        />
      ) : null}

      <div className="flex justify-center items-center w-full sm:py-12 py-6">
        <div className="sm:w-[450px] w-[95%] p-7 bg-formBackground rounded-sm border border-greyLight">
          <div className="flex flex-col gap-6">
            <div className="">
              <h2 className="text-uiBlack text-[20px] font-semibold">
                Reset Password
              </h2>
              <span className="text-textDim text-xs">
                Enter your new password to reset your password
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 pb-6 border-b border-uiGrey"
            >
              <div className="input-container">
                <label htmlFor="password" className="input-label">
                  Password
                  <span className="text-uiRed"> *</span>
                </label>
                <div className="flex flex-row items-center relative">
                  <button
                    type="button"
                    onClick={() => setPasswordVisibility((prev) => !prev)}
                    className="text-textDim absolute right-5"
                    tabIndex="-1"
                  >
                    {!passwordVisibility ? (
                      <AiOutlineEyeInvisible className="text-[20px] text-uiBlack" />
                    ) : (
                      <AiOutlineEye className="text-[20px] text-uiBlack" />
                    )}
                  </button>
                  <input
                    type={passwordVisibility ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                    }}
                    placeholder="Enter your password"
                    className="input-box pr-[50px]"
                  />
                </div>
                {passwordError && (
                  <span className="input-error">{passwordError}</span>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="cPassword" className="input-label">
                  Confirm Password
                  <span className="text-uiRed"> *</span>
                </label>
                <input
                  type="password"
                  id="cPassword"
                  name="cPassword"
                  value={cpassword}
                  onChange={(e) => {
                    setCpassword(e.target.value);
                    setCpasswordError("");
                    setPasswordError("");
                  }}
                  placeholder="Enter your password"
                  className="input-box"
                />
                {cpasswordError && (
                  <span className="input-error">{cpasswordError}</span>
                )}
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={status !== "idle"}
              >
                {status == "loading" ? (
                  <ImSpinner2 className="animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
            <div className="flex flex-col gap-2">
              <p className="text-uiBlack text-[18px] font-semibold">
                Don't want to reset password?
              </p>
              <Link
                to="/login"
                className="font-medium text-center border border-uiGrey text-textDim w-full py-3 rounded-sm hover:bg-greyLight transition-all duration-150"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
