import React, { useState } from "react";
import { logoBig } from "../../../assets";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserName } from "../../../redux/slice/authSlice";
import {
  getCartItemsLength,
  getCartTotal,
} from "../../../redux/slice/cartSlice";

const MainHeader = () => {
  const [query, setQuery] = useState("");
  const name = useSelector(getUserName);
  const total = useSelector(getCartTotal);
  const itemsLength = useSelector(getCartItemsLength);

  const handleSearch = () => {
    console.log("search Clicked");
  };

  return (
    <div className="bg-formBackground sticky top-0 z-50 shadow-sm">
      <div className="container flex flex-row py-4 gap-4 items-center justify-between border-b border-greyLight flex-wrap">
        <Link to="/" className="flex-none">
          <img src={logoBig} alt="Logo" className="h-[48px]" />
        </Link>
        <div className="flex flex-row flex-wrap">
          <div className="bg-greyLight p-3 rounded-tl-sm rounded-bl-sm">
            <div className="flex flex-row items-center gap-2 text-uiBlack  max-w-full overflow-clip">
              <span className="whitespace-nowrap text-[14px] font-medium">
                All Categories
              </span>
              <FiChevronDown />
              <div className="ml-3 w-[1px] bg-uiGrey h-[20px]" />
            </div>
          </div>
          <div className="bg-greyLight p-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-uiBlack text-[14px] focus:outline-none w-[300px]"
              placeholder="Search for products..."
            />
          </div>
          <button
            type="button"
            className="bg-baseGreen text-white px-5 text-[24px] rounded-tr-sm rounded-br-sm"
            onClick={handleSearch}
          >
            <FiSearch />
          </button>
        </div>
        <div className="flex flex-row gap-10 justify-between items-center sm:flex-none flex-wrap">
          <Link to="/wishlist" className="flex flex-row items-center gap-3">
            <div className="relative">
              <FiHeart className="text-[22px] text-uiBlack" />
              <div className="absolute -top-2 -right-2 z-10 border-2 border-white bg-baseGreen rounded-full h-[18px] w-[18px]">
                <div className="flex items-center justify-center">
                  <span className="text-uiWhite text-[10px]">1</span>
                </div>
              </div>
            </div>
            <span className="text-uiBlack text-[14px]">Wishlist</span>
          </Link>

          <Link to="/cart" className="flex flex-row items-center gap-3">
            <div className="relative">
              <FiShoppingCart className="text-[22px] text-uiBlack" />
              <div className="absolute -top-2 -right-2 z-10 border-2 border-white bg-baseGreen rounded-full h-[18px] w-[18px]">
                <div className="flex items-center justify-center">
                  <span className="text-uiWhite text-[10px]">
                    {itemsLength}
                  </span>
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

          {name ? (
            <Link
              to="/profile"
              className="flex flex-row gap-2 items-center max-w-full overflow-clip"
            >
              <FaUserCircle className="text-uiBlack text-[32px] flex-none" />
              <span className="text-uiBlack font-medium text-[14px] whitespace-nowrap">
                {name.length > 16 ? name.substring(0, 13) + "..." : name}
              </span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-6 py-1 hover:bg-baseGreen text-baseGreen border border-baseGreen hover:text-uiWhite transition-all duration-100 rounded-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
