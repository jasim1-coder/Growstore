import React from "react";
import { crypto, mastercard, stripe, visa } from "../../../assets";

const SecondaryFooter = () => {
  return (
    <div className="py-[2rem] flex sm:flex-row flex-col gap-4 justify-between items-center">
      <div className="">
        <p className="text-uiBlack text-sm">
          &copy; 2023 Growcomers Pvt. Ltd. All rights reserved
        </p>
      </div>
      <div className="flex flex-row gap-3 h-[32px]">
        <img src={visa} className="h-full object-contain" />
        <img src={mastercard} className="h-full object-contain" />
        <img src={stripe} className="h-full object-contain" />
        <img src={crypto} className="h-full object-contain" />
      </div>
    </div>
  );
};

export default SecondaryFooter;
