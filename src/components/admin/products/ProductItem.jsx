import React from "react";
import { formatCurrency } from "../../../utils/FormatCurrency";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ data }) => {
  const navigate = useNavigate();

  const handleProductNavigation = () => {
    navigate(`/admin/products/${data._id}`);
  };
  return (
    <tr
      className="border-b hover:bg-uiBlue/10 cursor-pointer text-sm text-bodyText"
      onClick={handleProductNavigation}
    >
      <td className="px-2 py-4 overflow-clip">
        <img className="h-[52px] object-contain" src={data.imageUrl} />
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{data.title}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{data.category}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{data.brand}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{formatCurrency(data.price)}</span>
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{data.stock}</span>
      </td>
    </tr>
  );
};

export default ProductItem;
