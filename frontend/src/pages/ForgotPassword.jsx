import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotPassword,
  getForgotPasswordError,
  getForgotPasswordStatus,
  getUser,
  removeForgotPasswordMessage,
} from "../redux/slice/authSlice";
import Layout from "../components/common/Layout";
import AlertBox from "../components/common/AlertBox";
import { ImSpinner2 } from "react-icons/im";

const ForgotPassword = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(getForgotPasswordStatus);
  const error = useSelector(getForgotPasswordError);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    var err = false;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      setEmailError("Email is required");
      err = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Not a valid email");
      err = true;
    }

    if (!err) {
      const data = { email };
      dispatch(forgotPassword(data));
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
          toDispatch={removeForgotPasswordMessage}
        />
      ) : null}
      {status === "success" ? (
        <AlertBox
          type={status}
          message="Please check your email"
          toDispatch={removeForgotPasswordMessage}
        />
      ) : null}

      <div className="flex justify-center items-center w-full sm:py-12 py-6">
        <div className="sm:w-[450px] w-[95%] p-7 bg-formBackground rounded-sm border border-greyLight">
          <div className="flex flex-col gap-6">
            <div className="">
              <h2 className="text-uiBlack text-[20px] font-semibold">
                Forgot your password?
              </h2>
              <span className="text-textDim text-xs">
                Enter your email to get a link to reset your password
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 pb-6 border-b border-uiGrey"
            >
              <div className="input-container">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  placeholder="Enter your email"
                  className="input-box"
                />
                {emailError && (
                  <span className="input-error">{emailError}</span>
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
                Already a user?
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

export default ForgotPassword;
