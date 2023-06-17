import React, { useEffect } from "react";
import ProfileLayout from "../../../components/shop/profile/ProfileLayout";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import OrderActions from "../../../components/shop/profile/orders/OrderActions";
import OrderSummary from "../../../components/shop/profile/orders/OrderSummary";
import AddressSummary from "../../../components/shop/profile/orders/AddressSummary";
import OrderProducts from "../../../components/shop/profile/orders/OrderProducts";
import { colorCodes } from "../../../utils/DefaultValues";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleOrder,
  getSingleMyOrder,
  getSingleMyOrderError,
  getSingleMyOrderStatus,
  removeSingleOrderData,
} from "../../../redux/slice/myOrderSlice";
import { BsCalendarCheck, BsCalendarX } from "react-icons/bs";
import moment from "moment";

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

              <div className="flex flex-col gap-5">
                <div className="w-max">
                  <div
                    className={`py-1 px-4 border ${
                      colorCodes[orderData.status]
                    } rounded-sm`}
                  >
                    <span className={`font-medium `}>{orderData.status}</span>
                  </div>
                </div>
                {orderData.status === "Delivered" ? (
                  <div className="flex flex-row gap-2">
                    <BsCalendarCheck className="text-[20px]" />
                    <span className="font-semibold text-uiBlack">
                      {moment(orderData.deliveredDate).format(
                        "ddd, MMM DD YYYY, HH:mm"
                      )}
                    </span>
                  </div>
                ) : orderData.status === "Cancelled" ? (
                  <div className="flex flex-row gap-2">
                    <BsCalendarX className="text-[20px]" />
                    <span className="font-semibold text-uiBlack">
                      {moment(orderData.cancelledDate).format(
                        "ddd, MMM DD YYYY, HH:mm"
                      )}
                    </span>
                  </div>
                ) : null}
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
