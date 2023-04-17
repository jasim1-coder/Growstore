import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {
  getAccessToken,
  getLoginWithTokenStatus,
  getUserRole,
} from "../redux/slice/authSlice";

const ClientAuth = () => {
  const userRole = useSelector(getUserRole);
  const status = useSelector(getLoginWithTokenStatus);
  const token = useSelector(getAccessToken);

  if ((token && status === "idle" && !userRole) || status === "loading") {
    return <p>Loading ...</p>;
  }

  return userRole === "ADMIN" ? (
    <Navigate to="/admin/orders" replace />
  ) : (
    <Outlet />
  );
};

export default ClientAuth;
