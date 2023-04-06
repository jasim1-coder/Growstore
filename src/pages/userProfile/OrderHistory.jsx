import React, { useEffect } from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import OrderList from "../../components/profile/orders/OrderList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyOrders,
  getMyOrderFetchError,
  getMyOrderFetchStatus,
  getMyOrders,
} from "../../redux/slice/myOrderSlice";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const myOrders = useSelector(getMyOrders);
  const fetchStatus = useSelector(getMyOrderFetchStatus);
  const fetchError = useSelector(getMyOrderFetchError);

  useEffect(() => {
    if (myOrders.length === 0) {
      dispatch(fetchMyOrders());
    }
  }, []);

  console.log(myOrders);

  return (
    <ProfileLayout>
      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="">
          <h2 className="heading2">My Orders</h2>
          <span className="text-sm text-textDim">
            Here you can manage all your orders.
          </span>
        </div>
        {fetchStatus === "loading" ? (
          <p className="text-bodyText">Loading...</p>
        ) : null}
        {fetchStatus === "failed" ? (
          <p className="text-uiRed">Error: {fetchError}</p>
        ) : null}

        {fetchStatus === "success" ? (
          myOrders.length > 0 ? (
            <OrderList data={myOrders} />
          ) : (
            <p className="text-bodyText">No orders found</p>
          )
        ) : null}
      </section>
    </ProfileLayout>
  );
};

export default OrderHistory;
