import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  getAccessToken,
  getLoginWithTokenStatus,
  getUser,
  removeLoginWithTokenMessage,
} from "../redux/slice/authSlice";

const RequireAuth = ({ allowedRole }) => {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const location = useLocation();
  const user = useSelector(getUser);
  const status = useSelector(getLoginWithTokenStatus);

  if (status === "failed") {
    dispatch(removeLoginWithTokenMessage());
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (token && !user?.role) {
    return <p>Loading...</p>;
  }

  return token ? (
    allowedRole === user.role ? (
      <Outlet />
    ) : user.role === "CUSTOMER" ? (
      <Navigate to="/" />
    ) : (
      <Navigate to="/admin/orders" />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
