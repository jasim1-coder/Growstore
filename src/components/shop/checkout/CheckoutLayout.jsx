import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import SecondaryFooter from "../../common/footer/SecondaryFooter";
import { logoBig } from "../../../assets";

const CheckoutLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen container">
      <div className="py-6 flex flex-row w-full items-center justify-between border-b border-b-greyLight">
        <div className="font-medium">
          <a
            href="/cart"
            className="flex flex-row items-center gap-2 text-uiBlack"
          >
            <FiChevronLeft />
            <span className="">Back to store</span>
          </a>
        </div>
        <div className="">
          <img src={logoBig} alt="Logo" className="sm:h-[48px] h-[32px]" />
        </div>
      </div>
      <main className="my-6 flex-1 flex flex-col">{children}</main>
      <div className="mt-auto border-t border-t-greyLight">
        <SecondaryFooter />
      </div>
    </div>
  );
};

export default CheckoutLayout;
