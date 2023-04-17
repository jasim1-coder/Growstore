import React from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import OrderList from "../../components/admin/orders/OrderList";

const AdminOrders = () => {
  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Orders" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <h4 className="heading4">Orders List</h4>
          </div>
          <OrderList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
