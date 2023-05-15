import React from "react";
import {
  FiLogOut,
  FiMapPin,
  FiShoppingBag,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/slice/authSlice";

const ProfileSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <section className="flex sm:flex-col flex-row sm:justify-start justify-between sm:gap-2 sm:w-[250px]">
      <NavLink
        to="/profile/my"
        className={({ isActive }) =>
          isActive ? "linkActiveProfile" : "linkInactiveProfile"
        }
      >
        <FiUser />
        <span className="sm:block hidden">Profile</span>
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={({ isActive }) =>
          isActive ? "linkActiveProfile" : "linkInactiveProfile"
        }
      >
        <FiShoppingBag />
        <span className="sm:block hidden">Orders</span>
      </NavLink>
      <NavLink
        to="/profile/address"
        className={({ isActive }) =>
          isActive ? "linkActiveProfile" : "linkInactiveProfile"
        }
      >
        <FiMapPin />
        <span className="sm:block hidden">Addresses</span>
      </NavLink>
      <NavLink
        to="/profile/reviews"
        className={({ isActive }) =>
          isActive ? "linkActiveProfile" : "linkInactiveProfile"
        }
      >
        <FiStar />
        <span className="sm:block hidden">Reviews</span>
      </NavLink>

      <div className="">
        <button
          onClick={handleLogout}
          type="button"
          className="sm:border sm:border-uiGrey text-uiBlack text-sm sm:py-2 rounded-sm hover:bg-baseGreen hover:text-uiWhite hover:border-baseGreen transition-all duration-150 font-medium flex flex-row gap-2 justify-center items-center mt-6 w-full"
        >
          <FiLogOut />
          <span className="sm:block hidden">Logout</span>
        </button>
      </div>
    </section>
  );
};

export default ProfileSidebar;
