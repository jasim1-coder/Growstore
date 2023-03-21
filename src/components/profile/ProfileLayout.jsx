import React from "react";
import Layout from "../common/Layout";
import ProfileSidebar from "./ProfileSidebar";

const ProfileLayout = ({ children }) => {
  return (
    <Layout>
      <div className="bg-greyLight">
        <div className="container py-[1.5rem]">
          <h1 className="heading1">My Account</h1>
        </div>
      </div>
      <div className="container py-[2rem]">
        <div className="flex sm:flex-row flex-col sm:justify-between gap-6">
          <ProfileSidebar />
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileLayout;
