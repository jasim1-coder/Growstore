import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/pageHeaders";

const Orders = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Orders" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h3 className="heading3">Orders List</h3>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default Orders;
