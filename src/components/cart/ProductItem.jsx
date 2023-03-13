import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/slice/authSlice";
import {
  removeFromCart,
  removeFromCartNOUSER,
} from "../../redux/slice/cartSlice";

const ProductItem = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [deleteStatus, setDeleteStatus] = useState("idle");

  const handleDelete = async () => {
    setDeleteStatus("loading");
    if (user) {
      await dispatch(removeFromCart(data.id)).unwrap();
    } else {
      dispatch(removeFromCartNOUSER(data.id));
    }
    setDeleteStatus("success");
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
          <Link to={`/product/${data.id}`}>
            <span
              className="text-sm hover:text-uiOrange"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          </Link>
        </div>
        <div className="flex flex-row">
          {deleteStatus === "loading" ? (
            <span className="text-uiRed text-[12px] pr-3 border-r-[2px] border-textDim/60">
              Deleting...
            </span>
          ) : (
            <button
              type="button"
              onClick={handleDelete}
              className="text-textDim flex flex-row gap-2 items-center pr-3 border-r-[2px] border-textDim/60 hover:text-uiRed"
            >
              <FiTrash2 /> <span className="text-[12px]">Delete</span>
            </button>
          )}
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
