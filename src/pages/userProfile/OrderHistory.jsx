import React from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import OrderList from "../../components/profile/orders/OrderList";

const OrderHistory = () => {
  return (
    <ProfileLayout>
      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="">
          <h2 className="heading2">My Orders</h2>
          <span className="text-sm text-textDim">
            Here you can manage all your orders.
          </span>
        </div>
        <OrderList />
      </section>
    </ProfileLayout>
  );
};

export default OrderHistory;
