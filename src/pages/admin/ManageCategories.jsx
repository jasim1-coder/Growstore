import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";

const AdminManageCategories = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Manage Categories" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/categories" />
          </div>
          {/* <OrderList /> */}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminManageCategories;
