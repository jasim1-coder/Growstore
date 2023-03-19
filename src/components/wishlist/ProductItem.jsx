import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCartItems } from "../../redux/slice/cartSlice";
import { removeWishlistItem } from "../../redux/slice/wishlistSlice";

const ProductItem = ({ data }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);

  const [addStatus, setAddStatus] = useState("idle");
  const [deleteStatus, setDeleteStatus] = useState("idle");
  const [quantity, setQuantity] = useState(1);
  const [existsInCart, setExistsInCart] = useState(false);

  const addedOn = moment(data.addedOn).format("DD MMM, YYYY");

  const handleDelete = async () => {
    setDeleteStatus("loading");
    await dispatch(removeWishlistItem(data._id)).unwrap();
    setDeleteStatus("idle");
  };

  const handleAddtoCart = async () => {
    setAddStatus("loading");
    const _data = { id: data.productId, quantity };
    await dispatch(addToCart({ productData: [_data] })).unwrap();
    setAddStatus("success");
  };

  useEffect(() => {
    const exists = cartItems.find((item) => item.id === data.productId);
    setExistsInCart(!!exists);
  }, [cartItems]);

  return (
    <tr className="py-2 border-b border-greyLight">
      <td className="px-2 py-4 overflow-clip flex flex-col gap-3">
        <div className="flex flex-row gap-3 items-center">
          <img
            className="h-[100px] object-cover w-[100px] rounded-sm"
            src={data.imageUrl}
            alt=""
          />
          <Link to={`/product/${data.productId}`}>
            <span
              className="text-sm hover:text-uiOrange"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          </Link>
        </div>
        <div className="flex flex-row">
          {deleteStatus === "loading" ? (
            <span className="text-uiRed text-[12px] pr-3 border-r-[2px] border-textDim/60">
              Removing...
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
          <p className="pl-3 text-textDim text-[12px]">Added on: {addedOn}</p>
        </div>
      </td>
      <td className="px-2 py-4 overflow-clip text-center">
        <span className="">&#8377; {data.price}</span>
      </td>
      <td className="px-2 py-4 overflow-clip text-center">
        <select
          className="px-2 border-b border-uiBlack focus:outline-none"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          {[...Array(data.quantity)].map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1}
            </option>
          ))}
        </select>
      </td>
      <td className="px-2 py-4 overflow-clip text-center">
        <button
          type="button"
          onClick={handleAddtoCart}
          className="text-[12px] p-3 w-full rounded-sm text-uiWhite bg-baseGreen items-center justify-center hover:bg-darkGreen hover:text-uiWhite transition-all duration-150 disabled:bg-greyLight disabled:text-uiGrey text-center"
          disabled={existsInCart || addStatus !== "idle"}
        >
          {addStatus === "loading" ? (
            <ImSpinner2 className="animate-spin text-[18px]" />
          ) : (
            "Add to cart"
          )}
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
