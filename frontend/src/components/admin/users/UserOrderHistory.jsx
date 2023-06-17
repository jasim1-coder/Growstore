import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/FormatCurrency";
import moment from "moment";
import { colorCodes } from "../../../utils/DefaultValues";

const OrderItem = ({ entry }) => {
  const navigate = useNavigate();

  const handleOrderNavigation = () => {
    navigate(`/admin/orders/${entry._id}`);
  };

  return (
    <tr
      className="border hover:bg-uiBlue/10 cursor-pointer text-sm text-bodyText"
      onClick={handleOrderNavigation}
    >
      <td className="px-2 py-4">
        <span>{entry.orderId}</span>
      </td>
      <td className="px-2 py-4 overflow-clip whitespace-nowrap">
        <span>{moment(entry.orderDate).format("DD MMMM YYYY, HH:mm")}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{formatCurrency(entry.totalAmount)}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span className={`${colorCodes[entry.status]}`}>{entry.status}</span>
      </td>
    </tr>
  );
};

const UserOrderHistory = ({ data }) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="pb-3 border-b border-b-greyLight">
        <h4 className="heading4">Orders</h4>
      </div>
      <div className="p-3 grid-list-2">
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Total Orders</span>
          <span className="">{data?.data?.length || 0}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-textDim">Total Amount Spent</span>
          <span className="">{formatCurrency(data?.totalExpense || 0)}</span>
        </div>
      </div>
      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto pt-3">
        {/* Table Header */}
        <table className="w-full text-left">
          <thead className="text-sm font-normal">
            <tr className="border-b p-2 border text-textDim">
              <td className="p-2">OrderId</td>
              <td className="p-2">Date</td>
              <td className="p-2">Amount</td>
              <td className="p-2">Status</td>
            </tr>
          </thead>
          <tbody className="relative h-full w-full">
            {!data || data?.data?.length === 0 ? (
              <tr className="text-center">
                <td colSpan="4" className="text-center px-2 py-4">
                  No orders found
                </td>
              </tr>
            ) : (
              data.data.map((entry) => (
                <OrderItem key={entry._id} entry={entry} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderHistory;
