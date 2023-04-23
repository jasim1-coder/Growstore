import React from "react";
import { NavLink } from "react-router-dom";

const SecondaryHeader = ({ showMenu }) => {
  return (
    <div
      className={`bg-formBackground shadow-sm ${
        showMenu ? "h-[360px] opacity-100 z-0" : "h-0 opacity-0 -z-20"
      } transition-[height] duration-500 sm:h-auto sm:block sm:opacity-100 sm:z-0`}
    >
      <nav className="container flex sm:flex-row flex-col py-2 gap-4 sm:items-center text-center justify-between">
        <div className="flex sm:flex-row sm:gap-[24px] gap-4 flex-col">
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
          {/* <NavLink
            to="/contact-us"
            className={({ isActive }) =>
              isActive ? "linkActive" : "linkInactive"
            }
          >
            Contact
          </NavLink> */}
        </div>
        <div className="flex flex-row gap-2 items-center self-center">
          <span className="text-baseGreen">Welcome</span>
          <span className="text-uiBlack">to Growcomers</span>
        </div>
      </nav>
    </div>
  );
};

export default SecondaryHeader;
