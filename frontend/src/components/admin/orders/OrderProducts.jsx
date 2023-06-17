import React from "react";
import { useSelector } from "react-redux";
import { getAdminSingleOrdersData } from "../../../redux/adminSlice/ordersSlice";
import { formatCurrency } from "../../../utils/FormatCurrency";

const OrderProducts = () => {
  const data = useSelector(getAdminSingleOrdersData);

  return (
    <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto">
      {/* Table Header */}
      <table className="w-full text-left">
        <thead className="text-sm font-normal">
          <tr className="border p-2 text-textDim">
            <td className="p-2">Product</td>
            <td className="p-2">Quantity</td>
            <td className="p-2">Price</td>
            <td className="p-2">Total</td>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((entry, key) => (
            <tr key={key} className="border">
              <td className="px-2 py-4 overflow-clip flex flex-row items-center gap-2 text-bodyText">
                <img
                  src={entry.imageUrl}
                  className="h-[50px] w-[50px] object-contain"
                />
                <span
                  className="font-medium text-sm"
                  dangerouslySetInnerHTML={{ __html: entry.title }}
                />
              </td>
              <td className="px-2 py-4 overflow-clip text-bodyText">
                {entry.quantity}
              </td>
              <td className="px-2 py-4 overflow-clip text-bodyText">
                {formatCurrency(entry.price)}
              </td>
              <td className="px-2 py-4 overflow-clip text-bodyText">
                {formatCurrency(entry.subTotal)}
              </td>
            </tr>
          ))}
          <tr className="border">
            <td colSpan="4">
              <div className="flex justify-end px-2 py-4">
                <div className="w-max text-right">
                  <p className="grid grid-cols-2 gap-4 items-center">
                    <span className="text-textDim text-sm">Subtotal: </span>
                    <span className="font-semibold">
                      {formatCurrency(data?.totalAmount)}
                    </span>
                  </p>
                  <p className="grid grid-cols-2 gap-4 items-center">
                    <span className="text-textDim text-sm">Discount: </span>
                    <span className="font-semibold">{formatCurrency(0)}</span>
                  </p>
                  <p className="grid grid-cols-2 gap-4 items-center">
                    <span className="text-textDim text-sm">Grand Total: </span>
                    <span className="font-semibold text-[20px]">
                      {formatCurrency(data?.totalAmount)}
                    </span>
                  </p>
                  <div className="flex justify-end">
                    <p className="mt-2 py-2 px-4 bg-green-200 rounded-[30px] text-green-600 text-sm">
                      Paid
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderProducts;
