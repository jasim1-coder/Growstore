import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoBig } from "../../../assets";

const MainFooter = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="flex flex-row justify-between flex-wrap gap-6 sm:py-[4rem] py-[3rem] border-uiGrey border-b">
      <div className="flex flex-col gap-4">
        <div className="h-[48px]">
          <img src={logoBig} className="h-full" />
        </div>
        <ul className="list-none text-[14px]">
          <li className="flex flex-row gap-2">
            <span className="text-black/80 font-medium">Address:</span>
            <span className="text-uiBlack">
              Growcomers Building, <br /> Vellore, Tamilnadu, 632014, India
            </span>
          </li>
          <li className="flex flex-row gap-2">
            <span className="text-black/80 font-medium">Phone:</span>
            <span className="text-uiBlack">+91-890000000</span>
          </li>
          <li className="flex flex-row gap-2">
            <span className="text-black/80 font-medium">Email:</span>
            <span className="text-uiBlack">info@growcomers.com</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <span className="footerHeading">Account</span>
        <ul className="list-none text-[14px] flex flex-col gap-2">
          <li className="footer-item">
            <Link to="/">Profile</Link>
          </li>
          <li className="footer-item">
            <Link to="/">Wishlist</Link>
          </li>
          <li className="footer-item">
            <Link to="/">Cart</Link>
          </li>
          <li className="footer-item">
            <Link to="/">Purchase history</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <span className="footerHeading">Info</span>
        <ul className="list-none text-[14px] flex flex-col gap-2">
          <li className="footer-item">
            <Link to="/">Delivery and returns</Link>
          </li>
          <li className="footer-item">
            <Link to="/">FAQ</Link>
          </li>
          <li className="footer-item">
            <Link to="/">Contact us</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <span className="footerHeading">Subscribe to our newsletter</span>
        <div className="flex flex-row gap-3">
          <input
            type="text"
            className="bg-uiGrey/20 p-3 focus:outline-none text-sm rounded-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
          <button className="bg-baseGreen text-white sm:text-sm px-3 rounded-sm text-[12px]">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
