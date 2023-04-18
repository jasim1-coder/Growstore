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
    const params = {
      orderIdQuery: e.target.value,
    };
    dispatch(fetchAdminOrders(params));
  };

  useEffect(() => {
    if (orderData.length === 0) {
      const params = {
        orderIdQuery: _orderIdQuery,
      };
      dispatch(fetchAdminOrders(params));
    }
  }, []);

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
          <OrderList />
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
