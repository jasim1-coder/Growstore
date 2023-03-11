import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";

const SecondaryHeader = () => {
  return (
    <nav className="flex flex-row py-4 gap-4 items-center justify-between flex-wrap">
      <Link
        to="/categories"
        className="bg-baseGreen rounded-sm py-[10px] px-4 flex flex-row gap-2 font-medium text-uiWhite items-center"
      >
        <AiOutlineAppstore className="text-[22px]" />
        <span>Browse Categories</span>
      </Link>
      <div className="flex flex-row gap-[24px] flex-wrap">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "linkActive" : "linkInactive"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "linkActive" : "linkInactive"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/brands"
          className={({ isActive }) =>
            isActive ? "linkActive" : "linkInactive"
          }
        >
          Brands
        </NavLink>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive ? "linkActive" : "linkInactive"
          }
        >
          Contact
        </NavLink>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <FiPhone className="text-baseGreen" />
        <span className="text-baseGreen">+91-000000</span>
        <span className="text-uiBlack">For support</span>
      </div>
    </nav>
  );
};

export default SecondaryHeader;
