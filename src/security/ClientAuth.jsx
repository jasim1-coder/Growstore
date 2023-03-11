import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {
  getAccessToken,
  getLoginWithTokenStatus,
  getUserRole,
  loginwithtoken,
  removeLoginWithTokenMessage,
} from "../redux/slice/authSlice";

const ClientAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const userRole = useSelector(getUserRole);
  const status = useSelector(getLoginWithTokenStatus);

  useEffect(() => {
    if (token && !userRole) {
      dispatch(loginwithtoken(token));
    }
  }, []);

  if (status === "failed") {
    dispatch(removeLoginWithTokenMessage());
    return <Navigate to="/" replace />;
  }

  return userRole === "ADMIN" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Outlet />
  );
};

export default ClientAuth;
