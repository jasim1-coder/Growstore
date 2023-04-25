import React, { useEffect } from "react";
import AdminLayout from "../../components/common/AdminLayout";
import AdminPageHeader from "../../components/admin/commons/AdminPageHeader";
import AdminBackButton from "../../components/admin/commons/AdminBackButton";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminSingleOrder,
  getAdminSingleOrderFetchError,
  getAdminSingleOrderFetchStatus,
  getAdminSingleOrdersData,
  removeAdminSingleOrder,
} from "../../redux/adminSlice/ordersSlice";
import OrderDetails from "../../components/admin/orders/OrderDetails";
import OrderProducts from "../../components/admin/orders/OrderProducts";
import AlertBox from "../../components/common/AlertBox";
import SimpleLoading from "../../components/common/loaders/SimpleLoading";
import { colorCodes } from "../../utils/DefaultValues";
import DownloadInvoiceButton from "../../components/admin/orders/DownloadInvoiceButton";

const AdminManageOrder = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const data = useSelector(getAdminSingleOrdersData);
  const status = useSelector(getAdminSingleOrderFetchStatus);
  const error = useSelector(getAdminSingleOrderFetchError);

  useEffect(() => {
    dispatch(fetchAdminSingleOrder(id));

    return () => {
      dispatch(removeAdminSingleOrder());
    };
  }, []);

  return (
    <AdminLayout>
      {status == "failed" ? <AlertBox message={error} type={status} /> : null}
      <div className="adminContainer">
        <AdminPageHeader title="Manage Order" />

        <section className="adminMainContainer">
          <div className="flex flex-row w-full justify-between items-center">
            <AdminBackButton to="/admin/orders" />

            <div className="flex flex-row gap-4">
              <div
                className={`px-4 py-1 rounded-sm border ${
                  colorCodes[data.status]
                }`}
              >
                <span className="text-[18px] font-semibold">
                  {data?.status}
                </span>
              </div>
              {data.status !== "Cancelled" ? (
                <DownloadInvoiceButton id={id} />
              ) : null}
            </div>
          </div>
          <div className="flex flex-col relative">
            {status === "loading" ? (
              <div className="w-full">
                <SimpleLoading />
              </div>
            ) : null}

            <OrderDetails />
            <OrderProducts />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminManageOrder;
