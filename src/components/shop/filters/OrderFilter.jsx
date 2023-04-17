import React from "react";

const orderData = [
  {
    title: "Rating - High to low",
    value: JSON.stringify({ rating: -1 }),
  },
  {
    title: "Rating - Low to high",
    value: JSON.stringify({ rating: 1 }),
  },
  {
    title: "Price - High to low",
    value: JSON.stringify({ price: -1 }),
  },
  {
    title: "Price - Low to high",
    value: JSON.stringify({ price: 1 }),
  },
];

const OrderFilter = ({ sortOrder, handleOrderChange }) => {
  return (
    <div>
      <select
        value={sortOrder}
        onChange={handleOrderChange}
        className="cursor-pointer text-uiBlack px-2 rounded-sm text-sm focus:outline-none"
      >
        <option value="">Featured</option>
        {orderData.map(({ title, value }) => (
          <option value={value} key={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderFilter;
