import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";

const SecondaryHeader = () => {
  return (
    <div className="bg-formBackground shadow-sm">
      <nav className="container  flex flex-row py-2 gap-4 items-center justify-between flex-wrap">
        {/* <Link
          to="/categories"
          className="primary-button flex flex-row gap-2 font-medium text-uiWhite items-center"
        >
          <AiOutlineAppstore className="text-[22px]" />
          <span>Browse Categories</span>
        </Link> */}
        <div className="flex flex-row gap-[24px] flex-wrap self-end">
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
            to="/categories"
            className={({ isActive }) =>
              isActive ? "linkActive" : "linkInactive"
            }
          >
            Categories
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
    </div>
  );
};

export default SecondaryHeader;
