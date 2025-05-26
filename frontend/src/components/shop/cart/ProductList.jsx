import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import {
  getCartItemFetchStatus,
  getCartItems,
} from "../../../redux/slice/cartSlice";

const ProductList = () => {
  const data = useSelector(getCartItems);
  const fetchStatus = useSelector(getCartItemFetchStatus);
console.log("data for the cart item:",data)
  return (
    <div className="flex flex-col">
      {fetchStatus === "loading" ? (
        <p className="font-medium">Loading...</p>
      ) : data.length === 0 ? (
        <p className="font-medium">No items found in your cart</p>
      ) : (
        data.map((entry) => <ProductItem data={entry} key={entry._id} />)
      )}
    </div>
  );
};

export default ProductList;
