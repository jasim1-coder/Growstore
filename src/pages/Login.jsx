import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "../components/common/AlertBox";
import Layout from "../components/common/Layout";
import LoginForm from "../components/login/LoginForm";
import {
  getAccessToken,
  getLoginError,
  getLoginStatus,
  removeLoginMessage,
} from "../redux/slice/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  console.log(from);

  const status = useSelector(getLoginStatus);
  const error = useSelector(getLoginError);
  const token = useSelector(getAccessToken);

  useEffect(() => {
    if (status === "success" || token) {
      navigate(from ? from.pathname : "/", { replace: true });
    }
  }, [navigate, status, token]);

  return (
    <Layout>
      {status === "failed" ? (
        <AlertBox
          type={status}
          message={error}
          toDispatch={removeLoginMessage}
        />
      ) : null}

      {location?.state?.message ? (
        <AlertBox type="success" message={location?.state?.message} />
      ) : null}
      <LoginForm />
    </Layout>
  );
};

export default Login;
