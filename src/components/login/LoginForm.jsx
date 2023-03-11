import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginFormLayout from "../common/loginFormLayout";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, login } from "../../redux/slice/authSlice";
import { ImSpinner2 } from "react-icons/im";

const LoginForm = () => {
  const dispatch = useDispatch();
  const status = useSelector(getLoginStatus);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var err = false;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!password || !password.trim()) {
      setPasswordError("Password is required");
      err = true;
    }
    if (!email || !email.trim()) {
      setEmailError("Email is required");
      err = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      err = true;
    }
    if (!err) {
      const data = { email, password };

      dispatch(login(data));
    }
  };
  return (
    <LoginFormLayout heading="Already a customer? Login">
      <div className="flex flex-col gap-6">
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
            {emailError && <span className="input-error">{emailError}</span>}
          </div>

          <div className="input-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="flex flex-row items-center relative">
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-textDim absolute right-5"
                tabIndex="-1"
              >
                {!showPassword ? (
                  <AiOutlineEyeInvisible className="text-[20px] text-uiBlack" />
                ) : (
                  <AiOutlineEye className="text-[20px] text-uiBlack" />
                )}
              </button>
              <input
                type={showPassword ? "text" : "password"}
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
            <div
              className="flex sm:flex-row
            flex-col justify-between items-center gap-2"
            >
              <div className="">
                <Link to="#" className="text-uiRed text-sm">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={status !== "idle"}
          >
            {status == "loading" ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <div className="flex flex-col gap-2">
          <p className="text-uiBlack text-[18px] font-semibold">
            New customer?
          </p>
          <Link
            to="/signup"
            className="font-medium text-center border border-uiGrey text-textDim w-full py-3 rounded-sm hover:bg-greyLight transition-all duration-150"
          >
            Create Account
          </Link>
        </div>
      </div>
    </LoginFormLayout>
  );
};

export default LoginForm;
