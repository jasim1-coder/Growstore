import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getUser } from "../../redux/slice/authSlice";
import {
  removeFromCart,
  removeFromCartNOUSER,
} from "../../redux/slice/cartSlice";
import { addWishlistItem, getWishlist } from "../../redux/slice/wishlistSlice";

const ProductItem = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const wishlistItems = useSelector(getWishlist);

  const [existsInWishlist, setExistsInWishlist] = useState(false);
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
    if (user) {
      const _data = { userId: user.id, productId: data.id };
      dispatch(addWishlistItem(_data));
    } else {
      Navigate("/login");
    }
  };

  useEffect(() => {
    const exists = wishlistItems.find((item) => item.productId === data.id);
    setExistsInWishlist(!!exists);
  }, [wishlistItems]);

  return (
    <div className="flex sm:flex-row flex-col sm:gap-8 gap-5 py-5 border-b border-b-greyLight">
      <div className="h-[100px] w-[100px] flex-none">
        <img
          className="object-cover h-full w-full rounded-sm"
          src={data.imageUrl}
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <Link to={`/product/${data.id}`}>
          <span
            className="text-sm hover:text-uiOrange"
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
        </Link>
        <div className="flex flex-col pt-2">
          <span className="text-textDim line-through text-[12px]">
            &#8377; 1222.22
          </span>
          <span className="text-baseGreen font-semibold">
            &#8377; {data.price}
          </span>
        </div>
        <div className="flex flex-row gap-3 items-center pt-4">
          <span className="text-sm">Quantity:</span>
          <div className="flex flex-row bg-greyLight rounded-[30px] px-4">
            <button
              type="button"
              // onClick={handleMinus}
              className="text-textDim"
              // disabled={quantity <= 1}
            >
              <FiMinus />
            </button>
            <input
              type="number"
              className="w-[40px] p-2 bg-greyLight text-sm font-medium text-center"
              value={data.quantity}
              // onChange={(e) => {
              //   if (e.target.value <= data.quantity) {
              //     setQuantity(e.target.value);
              //   } else {
              //     setQuantity(data.quantity);
              //   }
              // }}
            />
            <button
              type="button"
              // onClick={handlePlus}
              className="text-textDim"
              // disabled={quantity >= data.quantity}
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <p className="pt-4">
          <span className="text-sm">Amount: </span>
          <span className="font-medium text-baseGreen">
            &#8377; {data.total}
          </span>
        </p>
        <div className="flex flex-row pt-6">
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
              <FiTrash2 /> <span className="text-[12px]">Remove</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleWishlist}
            className="text-textDim flex flex-row gap-2 items-center pl-3 hover:text-baseGreen"
            disabled={existsInWishlist}
          >
            {existsInWishlist ? (
              <>
                <RiHeartFill className="text-uiRed" />
                <span className="text-[12px]">Added to wishlist</span>
              </>
            ) : (
              <>
                <RiHeartLine />
                <span className="text-[12px]">Add to my wishlist</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
