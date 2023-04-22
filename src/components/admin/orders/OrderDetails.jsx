import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminSingleOrdersData,
  updateAdminOrder,
} from "../../../redux/adminSlice/ordersSlice";
import moment from "moment/moment";
import { FiCalendar, FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";
import { BsCalendarCheck, BsCalendarX } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

const statusData = ["Processing", "Delivered", "Cancelled"];

const OrderDetails = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const data = useSelector(getAdminSingleOrdersData);
  const orderDate = moment(data.orderDate).format("ddd, MMM DD YYYY, HH:mm");
  const deliveredDate = moment(data.deliveredDate).format(
    "ddd, MMM DD YYYY, HH:mm"
  );
  const cancelledDate = moment(data.cancelledDate).format(
    "ddd, MMM DD YYYY, HH:mm"
  );

  const [status, setStatus] = useState("");

  const handleChangeStatus = () => {
    const toSendData = { id, params: { status } };
    dispatch(updateAdminOrder(toSendData));
  };

  return (
    <div className="flex flex-col mb-5">
      <div className="flex sm:flex-row flex-col justify-between sm:items-center pb-4 border-b border-b-greyLight">
        <div className="flex flex-row gap-2">
          <FiCalendar className="text-[22px]" />
          <div className="flex flex-col">
            <span className="font-semibold text-uiBlack">{orderDate}</span>
            <span className="text-textDim text-sm">#{data.orderId}</span>
          </div>
        </div>

        {data.status === "Delivered" ? (
          <div className="flex flex-row gap-2">
            <BsCalendarCheck className="text-[22px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-uiBlack">
                {deliveredDate}
              </span>
              <span className="text-textDim text-sm">#Delivered</span>
            </div>
          </div>
        ) : data?.status === "Cancelled" ? (
          <div className="flex flex-row gap-2">
            <BsCalendarX className="text-[22px]" />
            <div className="flex flex-col">
              <span className="font-semibold text-uiBlack">
                {cancelledDate}
              </span>
              <span className="text-textDim text-sm">#Cancelled</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-4 items-center">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="cursor-pointer text-uiBlack px-2 rounded-sm text-sm focus:outline-none border border-greyLight py-2"
            >
              <option value="">Change Status</option>
              {statusData.map((entry) => (
                <option value={entry} key={entry}>
                  {entry}
                </option>
              ))}
            </select>

            <button
              className="primary-button py-2 px-8 font-normal text-sm"
              onClick={handleChangeStatus}
            >
              Save
            </button>
          </div>
        )}
      </div>

      <div className="pt-4 grid-list-3">
        <div className="flex flex-row gap-4">
          <div className="p-3 bg-uiBlue/40 rounded-full h-max">
            <FiUser className="text-uiBlueDark text-[20px]" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-semibold text-uiBlack">Customer</p>
            <div className="text-bodyText text-sm">
              <p>{data?.user?.name}</p>
              <p>{data?.user?.email}</p>
              <p>{data?.user?.mobileNumber}</p>
            </div>
            <Link
              to={`/admin/users/${data?.user?._id}`}
              className="text-uiOrange text-sm"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="p-3 bg-uiBlue/40 rounded-full h-max">
            <FiCreditCard className="text-uiBlueDark text-[20px]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-uiBlack">Payment Info</p>
            <div className="text-bodyText text-sm">
              <p>
                <span className="text-textDim text-xs">Payment ID: </span>
                {data?.paymentId}
              </p>
              <p>
                <span className="text-textDim text-xs">Payment Method: </span>
                {data?.paymentMethod}
              </p>
              <p>
                <span className="text-textDim text-xs">Status: </span>
                Paid
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="p-3 bg-uiBlue/40 rounded-full h-max">
            <FiMapPin className="text-uiBlueDark text-[20px]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-uiBlack">Shipping Address</p>
            <div className="text-bodyText text-sm">
              <p>
                <span className="text-textDim text-xs">Mobile No.: </span>
                {data?.address?.mobileNumber}
              </p>
              <p>
                <span className="text-textDim text-xs">Street: </span>
                {data?.address?.street}
              </p>
              <p>
                <span className="text-textDim text-xs">City: </span>
                {data?.address?.city} {data?.address?.zipCode}
              </p>
              <p>
                <span className="text-textDim text-[12px]">State: </span>
                {data?.address?.state}, {data?.address?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
