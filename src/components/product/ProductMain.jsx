import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/authSlice";
import {
  addToCart,
  addToCartNOUSER,
  getCartItems,
} from "../../redux/slice/cartSlice";
import { getProductDetails } from "../../redux/slice/productSlice";

const ProductMain = () => {
  const data = useSelector(getProductDetails);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const cartItems = useSelector(getCartItems);
  const [existsInCart, setExistsInCart] = useState("");
  const [addStatus, setAddStatus] = useState("idle");

  useEffect(() => {
    const exists = cartItems.find((item) => item.id === data._id);
    setExistsInCart(exists);
  }, [cartItems]);

  const handleAddtoCart = async () => {
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
        imageUrl: data.imageURLHighRes[0],
        quantity,
        total,
      };
      dispatch(addToCartNOUSER(_data));
    }
  };

  const handleMinus = () => {
    setQuantity((prev) => parseInt(prev) - 1);
  };

  const handlePlus = () => {
    setQuantity((prev) => parseInt(prev) + 1);
  };

  return (
    <div className="flex flex-col gap-4 max-w-[600px]">
      <div className="">
        <p className="text-textDim">{data.mainCategory}</p>
        <h1
          className="heading2"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
        <p>
          <span className="text-textDim">By</span>&nbsp;
          <span className="text-baseGreen">{data.brand}</span>
        </p>
      </div>

      <div className="flex flec-row justify-between items-center border-b border-b-uiGrey pb-4">
        <p className="flex flex-row gap-3 items-baseline">
          <span className="text-baseGreen text-[24px] font-semibold">
            &#8377; {data.price}
          </span>
          <span className="text-textDim line-through">&#8377; {data.MRP}</span>
        </p>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-row gap-2 items-center pr-4 border-r-[2px] border-r-uiGrey/80">
            <FaStar className="text-[#FDC040]" />
            <span className="text-uiBlack font-medium">{data.rating}/5</span>
          </div>
          <p className="">
            <span className="text-uiBlack font-medium">
              {data.totalReviews}
            </span>
            &nbsp;
            <span className="text-textDim">Reviews</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-textDim font-[18px]">Categories</p>
        <div className="flex flex-row flex-wrap gap-3">
          {data.category.map((entry, key) => (
            <div
              key={key}
              className="py-2 px-4 bg-lightGreen border border-baseGreen/40 rounded-sm"
            >
              <span className="text-uiBlack">{entry}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-b-uiGrey pb-4">
        <p className="text-textDim font-[18px]">Features</p>
        <p className="text-uiBlack">{data.feature}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row px-6 justify-between items-center">
            <span className="text-textDim">MRP:</span>
            <span className="text-uiBlack font-medium">{data.MRP}</span>
          </div>
          <div className="flex flex-row px-6 justify-between items-center">
            <span className="text-textDim">Price:</span>
            <span className="text-uiBlack font-medium">{data.price}</span>
          </div>
          <div className="flex flex-row px-6 justify-between items-center">
            <span className="text-textDim">Quantity:</span>
            <span className="text-uiBlack font-medium">{quantity}</span>
          </div>
          <div className="flex flex-row px-6 justify-between items-center">
            <span className="text-uiBlack font-medium text-[20px]">Total:</span>
            <span className="text-baseGreen font-medium text-[20px]">
              {parseFloat(parseFloat(data.price) * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col gap-6 justify-between items-baseline">
          <div className="flex flex-row gap-5 items-center">
            <span className="text-textDim">Quantity:</span>
            <div className="flex flex-row gap-3">
              <button
                type="button"
                onClick={handleMinus}
                className="text-[20px] disabled:text-textDim"
                disabled={quantity <= 1}
              >
                <FiMinus />
              </button>
              <input
                type="number"
                className="w-[50px] p-2 bg-greyLight font-medium text-center"
                value={quantity}
                onChange={(e) => {
                  if (e.target.value <= data.quantity) {
                    setQuantity(e.target.value);
                  } else {
                    setQuantity(data.quantity);
                  }
                }}
              />
              <button
                type="button"
                onClick={handlePlus}
                className="text-[18px] font-bold disabled:text-textDim"
                disabled={quantity >= data.quantity}
              >
                <FiPlus />
              </button>
            </div>
            {data.quantity > 0 ? (
              <span className="text-sm text-baseGreen">In Stock</span>
            ) : (
              <span className="text-sm text-uiRed">Out of stock</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAddtoCart}
              className="flex flex-row gap-2 py-3 w-[250px] rounded-sm text-uiWhite bg-baseGreen items-center justify-center hover:bg-darkGreen hover:text-uiWhite transition-all duration-150 disabled:bg-greyLight disabled:text-uiGrey font-medium"
              disabled={addStatus === "loading"}
            >
              {addStatus === "loading" ? (
                <ImSpinner2 className="animate-spin text-[18px]" />
              ) : (
                <span>{existsInCart ? "Update Cart" : "Add To cart"}</span>
              )}
            </button>
            {existsInCart ? (
              <span className="text-[12px] italic text-uiBlack text-right">
                Available Quantity in cart: {existsInCart.quantity}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMain;
