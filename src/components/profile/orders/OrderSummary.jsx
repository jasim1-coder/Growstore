import React from "react";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="py-2 border-b border-b-greyLight">
        <h3 className="heading4">Order Summary</h3>
      </div>

      <div className="grid-list-3">
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Order ID</p>
          <p className="font-medium text-bodyText">abcde</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Order Date</p>
          <p className="font-medium text-bodyText">abcde</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Payment Method</p>
          <p className="font-medium text-bodyText">Debit Card</p>
        </div>
      </div>

      <div className="grid-list-3">
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Total Items</p>
          <p className="font-medium text-bodyText">abcde</p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-sm">Total Amount</p>
          <p className="font-medium text-bodyText">abcde</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
