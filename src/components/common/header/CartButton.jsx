import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCartItemsLength,
  getCartTotal,
} from "../../../redux/slice/cartSlice";

const CartButton = () => {
  const total = useSelector(getCartTotal);
  const itemsLength = useSelector(getCartItemsLength);

  return (
    <Link to="/cart" className="flex flex-row items-center gap-3">
      <div className="relative">
        <FiShoppingCart className="text-[22px] text-uiBlack" />
        <div className="absolute -top-2 -right-2 z-10 border-2 border-white bg-baseGreen rounded-full h-[18px] w-[18px]">
          <div className="flex items-center justify-center">
            <span className="text-uiWhite text-[10px]">{itemsLength}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-uiBlack text-[14px]">My Cart</span>
        <span className="text-baseGreen text-[12px]">
          &#8377; {parseFloat(total).toFixed(2)}
        </span>
      </div>
    </Link>
  );
};

export default CartButton;
