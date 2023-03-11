import React from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import { logout } from "../redux/slice/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout>
      <div>
        <p>Profile page</p>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default Profile;
