import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  getAccessToken,
  getLoginWithTokenStatus,
  getUser,
  loginwithtoken,
  removeLoginWithTokenMessage,
} from "../redux/slice/authSlice";

const RequireAuth = ({ allowedRole }) => {
  const dispatch = useDispatch();
  const token = useSelector(getAccessToken);
  const location = useLocation();
  const user = useSelector(getUser);
  const status = useSelector(getLoginWithTokenStatus);

  useEffect(() => {
    if (token && !user) {
      dispatch(loginwithtoken(token));
    }
  }, []);

  if (status === "failed") {
    dispatch(removeLoginWithTokenMessage());
    return <Navigate to="/login" />;
  }

  if (token) {
    if (!user?.role) {
      return <p>Loading</p>;
    } else {
      if (allowedRole === user.role) {
        return <Outlet />;
      } else if (user.role === "ADMIN") {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
