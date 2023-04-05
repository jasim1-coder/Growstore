import React from "react";
import OrderCard from "./OrderCard";

const data = [
  {
    _id: "abcde",
    orderDate: new Date().toISOString(),
    products: [
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
    ],
    totalItems: "3",
    totalAmount: "1500.55",
    status: "Processing",
  },
  {
    _id: "abcde",
    orderDate: new Date().toISOString(),
    products: [
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
    ],
    totalItems: "3",
    totalAmount: "1500.55",
    status: "Placed",
  },
  {
    _id: "abcde",
    orderDate: new Date().toISOString(),
    products: [
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
    ],
    totalItems: "3",
    totalAmount: "1500.55",
    status: "Delivered",
  },
  {
    _id: "abcde",
    orderDate: new Date().toISOString(),
    products: [
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
    ],
    totalItems: "3",
    totalAmount: "1500.55",
    status: "Placed",
  },
  {
    _id: "abcde",
    orderDate: new Date().toISOString(),
    products: [
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
      {
        id: "abcde",
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31V3NfjNACL.jpg",
        title: "Product Title",
        price: "500.15",
        quantity: "2",
      },
    ],
    totalItems: "3",
    totalAmount: "1500.55",
    status: "Cancelled",
  },
];

const OrderList = () => {
  return (
    <div className="grid-list-3">
      {data.map((entry, key) => (
        <OrderCard data={entry} key={key} />
      ))}
    </div>
  );
};

export default OrderList;
