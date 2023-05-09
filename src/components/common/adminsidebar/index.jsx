import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { logout } from "../../../redux/slice/authSlice";
import { logoBig } from "../../../assets";
import {
  FiLogOut,
  FiPackage,
  FiSettings,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";

const AdminSideBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="flex-none sticky top-0 min-h-[100vh] sm:w-[250px] w-[65px] bg-uiBlueDark">
      <div className="flex flex-col pt-6 gap-6">
        <div className="flex items-center flex-col ">
          <div className="flex-none">
            <img src={logoBig} alt="Logo" className="sm:h-[48px] h-[32px]" />
          </div>
        </div>

        {/* Navigation */}
        <div className="">
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? "linkActiveAdmin" : "linkInactiveAdmin"
            }
          >
            <FiShoppingCart />
            <span className="sm:block hidden">Orders</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "linkActiveAdmin" : "linkInactiveAdmin"
            }
          >
            <FiUsers />
            <span className="sm:block hidden">Users</span>
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "linkActiveAdmin" : "linkInactiveAdmin"
            }
          >
            <FiPackage />
            <span className="sm:block hidden">Products</span>
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive ? "linkActiveAdmin" : "linkInactiveAdmin"
            }
          >
            <BiCategoryAlt />
            <span className="sm:block hidden">Categories</span>
          </NavLink>
          <NavLink
            to="/admin/brands"
            className={({ isActive }) =>
              isActive ? "linkActiveAdmin" : "linkInactiveAdmin"
            }
          >
            <FiTag />
            <span className="sm:block hidden">Brands</span>
          </NavLink>
          <NavLink
            to="/admin/train"
            className={({ isActive }) =>
              isActive ? "linkActiveAdmin" : "linkInactiveAdmin"
            }
          >
            <FiSettings />
            <span className="sm:block hidden">Train</span>
          </NavLink>
        </div>
        <div>
          <button
            onClick={handleLogout}
            type="button"
            className={`${"linkInactiveAdmin"}`}
          >
            <FiLogOut />
            <span className="sm:block hidden">Logout</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminSideBar;
