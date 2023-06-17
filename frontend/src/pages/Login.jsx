import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AlertBox from "../components/common/AlertBox";
import Layout from "../components/common/Layout";
import LoginForm from "../components/login/LoginForm";
import {
  getLoginError,
  getLoginStatus,
  getUser,
  removeLoginMessage,
} from "../redux/slice/authSlice";
import { addToCart } from "../redux/slice/cartSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const dispatch = useDispatch();

  const status = useSelector(getLoginStatus);
  const error = useSelector(getLoginError);
  const user = useSelector(getUser);

  const addToCartLocalStorage = async (localCart) => {
    await dispatch(addToCart({ productData: localCart })).unwrap();
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    if (status === "success" || user) {
      const localCart = JSON.parse(localStorage.getItem("cart"));

      if (localCart && localCart.length > 0) {
        addToCartLocalStorage(localCart);
      }
      navigate(from ? from.pathname : "/", { replace: true });
    }
  }, [navigate, status, user]);

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
