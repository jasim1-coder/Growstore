import React from "react";
import { Link } from "react-router-dom";
import { logoBig } from "../../../assets";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const MainFooter = () => {
  return (
    <div className="flex flex-row justify-between flex-wrap gap-6 sm:py-[4rem] py-[3rem] border-uiGrey border-b">
      <div className="flex flex-col gap-4">
        <div className="h-[48px]">
          <img src={logoBig} className="h-full" />
        </div>
        <ul className="list-none text-[14px] flex flex-col gap-1">
          <li className="flex flex-row gap-2 items-center">
            <FiMapPin className="text-black/80" />
            <span className="text-uiBlack">
              Growcomers Building, <br /> City name, Tamilnadu, India
            </span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <FiPhone className="text-black/80" />
            <span className="text-uiBlack">+91-890000000</span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <FiMail className="text-black/80" />
            <span className="text-uiBlack">info@growcomers.com</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <span className="footerHeading">Account</span>
        <ul className="list-none text-[14px] flex flex-col gap-2">
          <li className="footer-item">
            <Link to="/profile/my">Profile</Link>
          </li>
          <li className="footer-item">
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li className="footer-item">
            <Link to="/cart">Cart</Link>
          </li>
          <li className="footer-item">
            <Link to="/profile/orders">Purchase history</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <span className="footerHeading">Shop</span>
        <ul className="list-none text-[14px] flex flex-col gap-2">
          <li className="footer-item">
            <Link to="/products">Browse Products</Link>
          </li>
          <li className="footer-item">
            <Link to="/categories">Browse Categories</Link>
          </li>
          <li className="footer-item">
            <Link to="/brands">Browse Brands</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <span className="footerHeading">Links</span>
        <ul className="list-none text-[14px] flex flex-col gap-2">
          <li className="footer-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="footer-item">
            <Link to="/signup">Create Account</Link>
          </li>
          <li className="footer-item">
            <Link to="/forgot-password">Forgot your password?</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainFooter;
