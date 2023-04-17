import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/pageHeaders";

const Users = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Users" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="heading3">User List</h3>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Users;
