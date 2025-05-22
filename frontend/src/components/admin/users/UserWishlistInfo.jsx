import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/FormatCurrency";
import moment from "moment";

const ProductItem = ({ entry }) => {
  const navigate = useNavigate();

  const handleProductNavigation = () => {
    navigate(`/admin/products/${entry._id}`);
  };

  return (
    <tr
      className="border hover:bg-uiBlue/10 cursor-pointer text-sm text-bodyText"
      onClick={handleProductNavigation}
    >
      <td className="px-2 py-4 overflow-clip flex flex-row items-center gap-2 text-bodyText">
        <img
          src={entry.image}
          className="h-[50px] w-[50px] object-contain"
        />
        <span
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: entry.name }}
        />
      </td>
      <td className="px-2 py-4 overflow-clip">
        <span>{formatCurrency(entry.price)}</span>
      </td>
      <td className="px-2 py-4 overflow-clip whitespace-nowrap">
        <span>{moment(entry.addedOn).format("DD MMMM YYYY")}</span>
      </td>
    </tr>
  );
};

const UserWishlistInfo = ({ data }) => {
  return (
    <div className="flex flex-col mb-6">
      <div className="pb-3 border-b border-b-greyLight">
        <h4 className="heading4">Wishlist</h4>
      </div>
      <div className="sm:w-full w-[calc(100vw-120px)] overflow-x-auto pt-3">
        {/* Table Header */}
        <table className="w-full text-left">
          <thead className="text-sm font-normal">
            <tr className="border-b p-2 border text-textDim">
              <td className="p-2">Product</td>
              <td className="p-2">Price</td>
              <td className="p-2">Added On</td>
            </tr>
          </thead>
          <tbody className="relative h-full w-full">
            {!data || data?.length === 0 ? (
              <tr className="text-center">
                <td colSpan="4" className="text-center px-2 py-4">
                  No items in wishlist
                </td>
              </tr>
            ) : (
              data.map((entry) => <ProductItem key={entry._id} entry={entry} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserWishlistInfo;
