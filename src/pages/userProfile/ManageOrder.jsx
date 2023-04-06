import React, { useEffect } from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import OrderActions from "../../components/profile/orders/OrderActions";
import OrderSummary from "../../components/profile/orders/OrderSummary";
import AddressSummary from "../../components/profile/orders/AddressSummary";
import OrderProducts from "../../components/profile/orders/OrderProducts";
import { colorCodes } from "../../utils/DefaultValues";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleOrder,
  getSingleMyOrder,
  getSingleMyOrderError,
  getSingleMyOrderStatus,
  removeSingleOrderData,
} from "../../redux/slice/myOrderSlice";

const ManageOrder = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const orderData = useSelector(getSingleMyOrder);
  const status = useSelector(getSingleMyOrderStatus);
  const error = useSelector(getSingleMyOrderError);

  useEffect(() => {
    dispatch(fetchSingleOrder(id));
    return () => {
      dispatch(removeSingleOrderData());
    };
  }, []);

  return (
    <ProfileLayout>
      <section className="p-4 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Link
            to="/profile/orders"
            className="flex flex-row items-center gap-2 text-uiBlack"
          >
            <FiChevronLeft />
            <span className="">Back</span>
          </Link>
          <h2 className="heading2">Manage Order</h2>
        </div>
        {status === "loading" ? (
          <p className="text-bodyText">Loading...</p>
        ) : null}
        {status === "failed" ? (
          <p className="text-red-500">Error: {error}</p>
        ) : null}

        {status === "success" ? (
          <>
            <div className="flex flex-col gap-3">
              <div className="py-2 border-b border-b-greyLight">
                <h3 className="heading4">Order Status</h3>
              </div>

              <div className="w-max">
                <div
                  className={`py-1 px-4 border ${
                    colorCodes[orderData.status]
                  } rounded-sm`}
                >
                  <span className={`font-medium `}>{orderData.status}</span>
                </div>
              </div>
            </div>
            <OrderSummary
              data={{
                orderId: orderData.orderId,
                orderDate: orderData.orderDate,
                paymentMethod: orderData.paymentMethod,
                paymentId: orderData.paymentId,
                totalItems: orderData.totalItems,
                totalAmount: orderData.totalAmount,
              }}
            />
            <OrderProducts data={orderData.products} />
            <AddressSummary data={orderData.address} />
            <OrderActions orderStatus={orderData.status} id={orderData._id} />
          </>
        ) : null}
      </section>
    </ProfileLayout>
  );
};

export default ManageOrder;
