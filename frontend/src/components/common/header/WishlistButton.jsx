import React, { useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/slice/authSlice";
import {
  fetchWishlist,
  getWishlistItemsLength,
} from "../../../redux/slice/wishlistSlice";

const WishlistButton = () => {
  const dispatch = useDispatch();
  const length = useSelector(getWishlistItemsLength);
  const user = useSelector(getUser);

  useEffect(() => {
    if (user && length === 0) {
      dispatch(fetchWishlist(user.id));
    }
  }, [user]);

  return (
    <Link to="/wishlist" className="flex flex-row items-center gap-2">
      <div className="relative">
        <FiHeart className="text-[22px] text-uiBlack" />
        {user ? (
          <div className="absolute -top-2 -right-2 z-10 border-2 border-white bg-baseGreen rounded-full sm:h-[18px] sm:w-[18px] h-[14px] w-[14px]">
            <div className="flex items-center justify-center">
              <span className="text-uiWhite sm:text-[10px] text-[8px]">
                {length}
              </span>
            </div>
          </div>
        ) : null}
      </div>
      <span className="text-uiBlack text-[14px] sm:block hidden">Wishlist</span>
    </Link>
  );
};

export default WishlistButton;
