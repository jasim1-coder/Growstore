import React from "react";
import { useSelector } from "react-redux";
import {
  getWishlist,
  getWishlistItemFetchStatus,
} from "../../../redux/slice/wishlistSlice";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const data = useSelector(getWishlist);
  const fetchStatus = useSelector(getWishlistItemFetchStatus);

  return (
    <table className="table-auto">
      <thead className="">
        <tr className="p-2 border-b border-greyLight">
          <th className="heading3 p-2 overflow-clip">Product</th>
          <th className="heading3 p-2 overflow-clip text-center">Price</th>
          <th className="heading3 p-2 overflow-clip text-center">Quantity</th>
          <th className="heading3 p-2 overflow-clip text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {fetchStatus === "loading" ? (
          <tr className="py-2 border-b border-greyLight">
            <td colSpan={4} className="text-center px-2 py-4 font-medium">
              Loading...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr className="py-2 border-b border-greyLight">
            <td colSpan={4} className="text-center px-2 py-4 font-medium">
              No items found in your wishlist
            </td>
          </tr>
        ) : (
          data.map((entry, key) => <ProductItem data={entry} key={key} />)
        )}
      </tbody>
    </table>
  );
};

export default ProductList;
