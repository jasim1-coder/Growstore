import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginFormLayout from "../common/loginFormLayout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { getsignupStatus, signup } from "../../redux/slice/authSlice";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(getsignupStatus);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [cpassword, setCpassword] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var err = false;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const nameRegex = /^\w+\s\w+$/;
    const mobileRegex = /^\d{10}$/;
    if (!name || !name.trim()) {
      setNameError("Name is required");
    } else if (!nameRegex.test(name)) {
      setNameError("Enter valid full name");
      err = true;
    }
    if (!password || !password.trim()) {
      setPasswordError("Password is required");
      err = true;
    } else if (password.length < 6) {
      setPasswordError("password should contain atleast 6 characters");
      err = true;
    } else if (password !== cpassword) {
      setPasswordError("Passwords do not match!");
      err = true;
    }
    if (!cpassword || !cpassword.trim()) {
      setCpasswordError("Confirm password id required");
      err = true;
    }
    if (!email || !email.trim()) {
      setEmailError("Email is required");
      err = true;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      err = true;
    }

    if (mobileNumber && !mobileRegex.test(mobileNumber)) {
      setMobileNumberError("Enter a valid mobile number");
      err = true;
    }

    if (!err) {
      const data = { name, email, password, mobileNumber };

      const res = await dispatch(signup(data)).unwrap();
      if (res) {
        navigate("/login", {
          replace: true,
          state: { message: "Please check your email to verify your account!" },
        });
      }
    }
  };
  return (
    <LoginFormLayout heading="New Customer? Sign up">
      <div className="flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 pb-6 border-b border-uiGrey"
        >
          <div className="input-container">
            <label htmlFor="name" className="input-label">
              Name
              <span className="text-uiRed"> *</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              placeholder="Enter your name"
              className="input-box"
            />
            {nameError && <span className="input-error">{nameError}</span>}
          </div>

          <div className="input-container">
            <label htmlFor="email" className="input-label">
              Email
              <span className="text-uiRed"> *</span>
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
            <label htmlFor="phone" className="input-label">
              Mobile Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                setMobileNumberError("");
              }}
              placeholder="Enter your mobile number"
              className="input-box"
            />
            {mobileNumberError && (
              <span className="input-error">{mobileNumberError}</span>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="password" className="input-label">
              Password
              <span className="text-uiRed"> *</span>
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
              "Create Account"
            )}
          </button>
        </form>

        <div className="flex flex-col gap-2">
          <p className="text-uiBlack text-[18px] font-semibold">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="font-medium text-center border border-uiGrey text-textDim w-full py-3 rounded-sm hover:bg-greyLight transition-all duration-150"
          >
            Log in
          </Link>
        </div>
      </div>
    </LoginFormLayout>
  );
};

export default SignupForm;
