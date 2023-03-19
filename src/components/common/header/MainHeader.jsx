import React from "react";
import { logoBig } from "../../../assets";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserName } from "../../../redux/slice/authSlice";
import CartButton from "./CartButton";
import SearchBar from "./SearchBar";
import WishlistButton from "./WishlistButton";
import { FiLogIn, FiMenu } from "react-icons/fi";

const MainHeader = ({ handleMenu }) => {
  const name = useSelector(getUserName);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login", { state: { from: location } });
  };

  return (
    <div className="bg-formBackground sticky top-0 z-50 shadow-sm flex flex-col border-b border-greyLight">
      <div className="container flex flex-row py-4 gap-4 items-center justify-between ">
        <div className="flex flex-row gap-4 items-center">
          <button onClick={handleMenu} className="sm:hidden block">
            <FiMenu className="text-[20px]" />
          </button>
          <Link to="/" className="flex-none">
            <img src={logoBig} alt="Logo" className="sm:h-[48px] h-[32px]" />
          </Link>
        </div>
        <div className="sm:block hidden">
          <SearchBar />
        </div>
        <div className="flex flex-row sm:gap-10 gap-6 justify-between items-center sm:flex-none">
          <WishlistButton />
          <CartButton />

          {name ? (
            <Link
              to="/profile"
              className="flex flex-row gap-2 items-center max-w-full overflow-clip"
            >
              <FaUserCircle className="text-uiBlack text-[32px] flex-none" />
              <span className="text-uiBlack font-medium text-[14px] whitespace-nowrap sm:block hidden">
                {name.length > 16 ? name.substring(0, 13) + "..." : name}
              </span>
            </Link>
          ) : (
            <button
              onClick={handleLogin}
              className="sm:px-6 px-3 py-1 hover:bg-baseGreen text-baseGreen border border-baseGreen hover:text-uiWhite transition-all duration-100 rounded-sm font-medium"
            >
              <span className="sm:block hidden">Login</span>
              <span className="sm:hidden block">
                <FiLogIn />
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="sm:hidden block w-full pt-2 pb-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default MainHeader;
