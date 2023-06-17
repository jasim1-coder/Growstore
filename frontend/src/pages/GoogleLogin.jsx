import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../redux/slice/authSlice";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tryGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      navigate("/", { replace: true });
    } catch (err) {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    tryGoogleLogin();
  }, []);

  return <div>Loading...</div>;
};

export default GoogleLogin;
