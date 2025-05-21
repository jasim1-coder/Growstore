import moment from "moment";
import React from "react";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { useNavigate } from "react-router-dom";
import { colorCodes } from "../../../utils/DefaultValues";

const OrderItem = ({ data }) => {
  const navigate = useNavigate();
  const date = moment(data.orderDate).format("DD MMM YY, HH:mm");

  const handleOrderNavigation = () => {
    navigate(`/admin/orders/${data.id}`);
  };

  return (
    <tr
      className="border-b hover:bg-uiBlue/10 cursor-pointer text-sm text-bodyText"
      onClick={handleOrderNavigation}
    >
      <td className="px-2 py-4 overflow-clip">
        <span>{data.orderId}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{data.userName}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{date}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{formatCurrency(data.totalAmount)}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span className={`${colorCodes[data.status]}`}>{data.status}</span>
      </td>
    </tr>
  );
};

export default OrderItem;
