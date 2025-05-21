import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import OrderList from "../../components/admin/orders/OrderList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrders,
  getAdminOrderIdQuery,
  getAdminOrdersData,
} from "../../redux/adminSlice/ordersSlice";
import AdminSearchBar from "../../components/admin/commons/AdminSearchBar";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orderData = useSelector(getAdminOrdersData);
  const _orderIdQuery = useSelector(getAdminOrderIdQuery);

  const [orderIdQuery, setOrderIdQuery] = useState(_orderIdQuery);

  const handleSearch = (e) => {
    setOrderIdQuery(e.target.value);
  };

  useEffect(() => {
    // Whenever the orderIdQuery changes, dispatch the action
    const params = {
      orderIdQuery: orderIdQuery,
    };
    dispatch(fetchAdminOrders(params));
  }, [orderIdQuery, dispatch]); // Dependency array ensures it runs when orderIdQuery changes

  useEffect(() => {
    if (!orderData || orderData.length === 0) { // Check if orderData is undefined or empty
      const params = {
        orderIdQuery: _orderIdQuery,
      };
      dispatch(fetchAdminOrders(params)); // Fetch orders when page loads if no data
    }
    console.log("orderdatas", orderData); // Log to check the fetched data
  }, [orderData, _orderIdQuery, dispatch]); // This will trigger when orderData changes

  return (
    <AdminLayout>
      <div className="adminContainer">
        <AdminPageHeader title="Orders" />

        <section className="adminMainContainer">
          <div className="flex sm:flex-row flex-col w-full justify-between sm:items-center gap-4">
            <h4 className="heading4">Orders List</h4>
            <AdminSearchBar
              value={orderIdQuery}
              onChange={handleSearch}
              placeholder="Search by orderId..."
            />
          </div>
          {/* Only render OrderList if orderData is not undefined */}
          {orderData && orderData.length > 0 ? (
            <OrderList />
          ) : (
            <div>No orders found</div>
          )}
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
