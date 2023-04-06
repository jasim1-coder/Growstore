import moment from "moment";
import React from "react";
import { formatCurrency } from "../../../utils/FormatCurrency";

const OrderSummary = ({ data }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Order Summary</h3>
      </div>

      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Order ID</p>
          <p className="font-medium text-bodyText">{data.orderId}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Order Date</p>
          <p className="font-medium text-bodyText">
            {moment(data.orderDate).format("MMMM DD YYYY, HH:MM")}
          </p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Payment Method</p>
          <p className="font-medium text-bodyText">{data.paymentMethod}</p>
        </div>
      </div>

      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Payment ID</p>
          <p className="font-medium text-bodyText">{data.paymentId}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Total Items</p>
          <p className="font-medium text-bodyText">{data.totalItems}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm">Total Amount</p>
          <p className="font-medium text-bodyText">
            {formatCurrency(data.totalAmount)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
