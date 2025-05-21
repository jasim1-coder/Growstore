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
  const from = location.state?.from || "/"; // Fallback to home if 'from' is undefined
  const dispatch = useDispatch();

  const status = useSelector(getLoginStatus);
  const error = useSelector(getLoginError);
  const user = useSelector(getUser);

  const addToCartLocalStorage = async (localCart) => {
    await dispatch(addToCart({ productData: localCart })).unwrap();
    localStorage.removeItem("cart");
  };

useEffect(() => {
  console.log("Login effect triggered");
  console.log("Login status:", status);
  console.log("User object:", user);

  if (status === "success" || user) {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    console.log("Local cart:", localCart);

    if (localCart && localCart.length > 0) {
      console.log("Adding local cart items to server cart");
      addToCartLocalStorage(localCart);
    }

    if (user?.role === "ADMIN") {
      console.log("User is admin. Redirecting to /admin...");
      navigate("/admin", { replace: true });
    } else {
      console.log("User is not admin. Redirecting to:", from);
      navigate(from, { replace: true });
    }
  }
}, [navigate, status, user, from]);




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
