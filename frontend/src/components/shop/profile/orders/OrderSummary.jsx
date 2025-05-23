import moment from "moment";
import React from "react";
import { formatCurrency } from "../../../../utils/FormatCurrency";

const OrderSummary = ({ data }) => {
  const totalItem = 2;
  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Order Summary</h3>
      </div>

      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Order ID</p>
          <p className="text-bodyText">{data.orderId}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Order Date</p>
          <p className="text-bodyText">
            {moment(data.orderDate).format("MMMM DD YYYY, HH:mm")}
          </p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Payment Method</p>
          <p className="text-bodyText">{data.paymentMethod}</p>
        </div>
      </div>

      <div className="grid-list-3">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Payment ID</p>
          <p className="text-bodyText">{data.paymentId}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Total Items</p>
          <p className="text-bodyText">{totalItem}</p>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-sm text-textDim">Total Amount</p>
          <p className="text-bodyText">{formatCurrency(data.totalAmount)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
