import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";

const AdminManageProducts = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Manage Product" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/products" />
          </div>
          {/* <OrderList /> */}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminManageProducts;
