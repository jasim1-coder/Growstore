import React from "react";
import { logoBig } from "../../../assets";
import { FiHeart } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserName } from "../../../redux/slice/authSlice";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";

const MainHeader = () => {
  const name = useSelector(getUserName);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  return (
    <div className="bg-formBackground sticky top-0 z-50 shadow-sm">
      <div className="container flex flex-row py-4 gap-4 items-center justify-between border-b border-greyLight flex-wrap">
        <Link to="/" className="flex-none">
          <img src={logoBig} alt="Logo" className="h-[48px]" />
        </Link>
        <SearchBar />
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
          <CartButton />

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
            <button
              onClick={handleLogin}
              className="px-6 py-1 hover:bg-baseGreen text-baseGreen border border-baseGreen hover:text-uiWhite transition-all duration-100 rounded-sm font-medium"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
