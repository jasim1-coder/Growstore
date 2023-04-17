import React from "react";
import OrderCard from "./OrderCard";

const OrderList = ({ data }) => {
  return (
    <div className="grid-list-3">
      {data.map((entry, key) => (
        <OrderCard data={entry} key={key} />
      ))}
    </div>
  );
};

export default OrderList;
