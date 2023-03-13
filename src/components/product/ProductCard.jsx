import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { product } from "../../assets";
import StarRating from "../common/starRating/StarRating";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToCartNOUSER,
  getCartItems,
} from "../../redux/slice/cartSlice";
import { getUser } from "../../redux/slice/authSlice";
import { ImSpinner2 } from "react-icons/im";

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const cartItems = useSelector(getCartItems);
  const [existsInCart, setExistsInCart] = useState(false);
  const [addStatus, setAddStatus] = useState("idle");

  useEffect(() => {
    const exists = cartItems.find((item) => item.id === data._id);
    setExistsInCart(!!exists);
  }, [cartItems]);

  const handleAddtoCart = async () => {
    const quantity = 1;

    if (user) {
      setAddStatus("loading");
      const _data = { id: data._id, quantity };
      await dispatch(addToCart({ productData: [_data] })).unwrap();
      setAddStatus("success");
    } else {
      const _total = data.price * quantity;
      const total = _total.toFixed(2);

      const _data = {
        id: data._id,
        title: data.title,
        price: data.price,
        imageUrl: data.imageUrl,
        quantity,
        total,
      };
      dispatch(addToCartNOUSER(_data));
    }
  };

  return (
    <div className="m-auto sm:min-h-[300px] h-full max-w-[300px] w-full">
      <div className="group outline outline-1 outline-greyLight rounded-sm">
        <div className="h-[250px] w-full overflow-hidden relative bg-greyLight">
          <Link to={`/product/${data._id}`}>
            <img
              className="object-contain h-full w-full"
              src={data.imageUrl}
              alt=""
            />
          </Link>
        </div>
        <div className="p-4 flex flex-col gap-2 relative h-full">
          <div className="z-10 h-[44px] w-[44px] absolute -top-5 right-6 bg-white rounded-full border border-uiGrey">
            <button className="flex items-center justify-center h-full w-full text-[20px]">
              <AiOutlineHeart />
            </button>
          </div>
          <p className="text-textDim text-sm">{data.category}</p>

          <p className="text-uiBlack text-[18px] font-medium ">
            <Link
              to={`/product/${data._id}`}
              className="hover:text-uiOrange transition-all duration-150"
              dangerouslySetInnerHTML={{ __html: data.title }}
            />
          </p>
          <div>
            <StarRating rating={data.rating} />
            <p>
              <span className="text-textDim">By</span>&nbsp;
              <span className="text-baseGreen">{data.brand}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-auto">
            <p className="">
              <span className="text-baseGreen text-[22px] font-semibold">
                &#8377; {data.price}
              </span>
              &nbsp;
              <span className="text-textDim line-through">
                &#8377; {data.MRP}
              </span>
            </p>
            <button
              type="button"
              onClick={handleAddtoCart}
              className="flex flex-row gap-2 py-3 w-full rounded-sm text-baseGreen bg-lightGreen items-center justify-center hover:bg-baseGreen hover:text-uiWhite transition-all duration-150 disabled:bg-greyLight disabled:text-uiGrey"
              disabled={existsInCart || addStatus !== "idle"}
            >
              {addStatus === "loading" ? (
                <ImSpinner2 className="animate-spin text-[18px]" />
              ) : (
                <>
                  <FiShoppingCart />
                  <span>{existsInCart ? "Added" : "Add"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
