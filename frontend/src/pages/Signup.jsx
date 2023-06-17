import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertBox from "../components/common/AlertBox";
import Layout from "../components/common/Layout";
import SignupForm from "../components/login/SignupForm";
import {
  getsignupError,
  getsignupStatus,
  getUser,
  removeSignupMessage,
} from "../redux/slice/authSlice";

const Signup = () => {
  const navigate = useNavigate();

  const status = useSelector(getsignupStatus);
  const error = useSelector(getsignupError);
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Layout>
      {status === "failed" ? (
        <AlertBox
          type={status}
          message={error}
          toDispatch={removeSignupMessage}
        />
      ) : null}
      <SignupForm />
    </Layout>
  );
};

export default Signup;
