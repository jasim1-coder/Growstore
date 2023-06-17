import React from "react";
import AdminSideBar from "./adminsidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-row justify-start items-start w-full h-full bg-uiBlueDark">
      <AdminSideBar />
      <div className="flex-1 min-h-[100vh] sm:p-7 p-3 w-full bg-formBackground">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
