import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slice/cartSlice";

const ProductItem = ({ data }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeFromCart(data._id));
  };

  const handleWishlist = () => {
    console.log("handle wishlist cart item");
  };

  return (
    <tr className="py-2 border-b border-greyLight">
      <td className="px-2 py-4 overflow-clip flex flex-col gap-3">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="h-[100px] object-cover w-[100px] rounded-sm"
            src={data.imageUrl}
            alt=""
          />
          <span className="" dangerouslySetInnerHTML={{ __html: data.title }} />
        </div>
        <div className="flex flex-row">
          <button
            type="button"
            onClick={handleDelete}
            className="text-textDim flex flex-row gap-2 items-center pr-3 border-r-[2px] border-textDim/60 hover:text-uiRed"
          >
            <FiTrash2 /> <span className="text-[12px]">Delete</span>
          </button>
          <button
            type="button"
            onClick={handleWishlist}
            className="text-textDim flex flex-row gap-2 items-center pl-3 hover:text-baseGreen"
          >
            <RiHeartLine />
            <span className="text-[12px]">Add to my wishlist</span>
          </button>
        </div>
      </td>
      <td className="px-2 py-4 overflow-clip text-center">
        <span className="">&#8377; {data.price}</span>
      </td>
      <td className="px-2 py-4 overflow-clip text-center">
        <span>{data.quantity}</span>
      </td>
      <td className="px-2 py-4 overflow-clip text-center">
        <span className="font-medium text-baseGreen">&#8377; {data.total}</span>
      </td>
    </tr>
  );
};

export default ProductItem;
