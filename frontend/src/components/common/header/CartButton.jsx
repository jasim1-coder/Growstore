import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/slice/authSlice";
import {
  fetchCartItems,
  getCartItemsLength,
  getCartTotal,
} from "../../../redux/slice/cartSlice";
import { formatCurrency } from "../../../utils/FormatCurrency";

const CartButton = () => {
  const dispatch = useDispatch();

  const total = useSelector(getCartTotal);
  const itemsLength = useSelector(getCartItemsLength);
  const user = useSelector(getUser);

  useEffect(() => {
    if (user && itemsLength === 0) {
      dispatch(fetchCartItems());
    }
  }, []);

  return (
    <Link to="/cart" className="flex flex-row items-center gap-3">
      <div className="relative">
        <FiShoppingCart className="text-[22px] text-uiBlack" />
        <div className="absolute -top-2 -right-2 z-10 border-2 border-white bg-baseGreen rounded-full sm:h-[18px] sm:w-[18px] h-[14px] w-[14px]">
          <div className="flex items-center justify-center">
            <span className="text-uiWhite sm:text-[10px] text-[8px]">
              {itemsLength}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-col sm:flex hidden">
        <span className="text-uiBlack text-[14px]">My Cart</span>
        <span className="text-baseGreen text-xs">{formatCurrency(total)}</span>
      </div>
    </Link>
  );
};

export default CartButton;
