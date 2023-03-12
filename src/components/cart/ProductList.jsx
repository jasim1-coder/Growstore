import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import { getCartItems } from "../../redux/slice/cartSlice";

const ProductList = () => {
  const data = useSelector(getCartItems);
  return (
    <table className="table-auto">
      <thead className="">
        <tr className="p-2 border-b border-greyLight">
          <th className="heading3 p-2 overflow-clip">Products</th>
          <th className="heading3 p-2 overflow-clip text-center">Price</th>
          <th className="heading3 p-2 overflow-clip text-center">Quantity</th>
          <th className="heading3 p-2 overflow-clip text-center">Total</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className="py-2 border-b border-greyLight">
            <td colSpan={4} className="text-center px-2 py-4 font-medium">
              No items found in your cart
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
