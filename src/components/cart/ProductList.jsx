import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import {
  getCartItemFetchStatus,
  getCartItems,
} from "../../redux/slice/cartSlice";

const ProductList = () => {
  const data = useSelector(getCartItems);
  const fetchStatus = useSelector(getCartItemFetchStatus);

  return (
    <div className="flex flex-col">
      {fetchStatus === "loading" ? (
        <p className="font-medium">Loading...</p>
      ) : data.length === 0 ? (
        <p className="font-medium">No items found in your cart</p>
      ) : (
        data.map((entry, key) => <ProductItem data={entry} key={key} />)
      )}
    </div>
  );
};

export default ProductList;
