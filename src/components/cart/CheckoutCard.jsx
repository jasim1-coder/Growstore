import React from "react";
import { useSelector } from "react-redux";
import { crypto, stripe } from "../../assets";
import { getCartTotal } from "../../redux/slice/cartSlice";

const CheckoutCard = ({ handleCheckout, buttonName, buttonDisabled }) => {
  const total = useSelector(getCartTotal);

  return (
    <div className="md:w-[420px] max-w-[350px] bg-greyLight p-8 rounded-sm flex flex-col h-max">
      <div className="flex flex-col gap-4 border-b border-uiGrey pb-6">
        <div className="flex flex-row justify-between items-center">
          <span className="text-textDim text-sm">Subtotal</span>
          <span className="text-baseGreen font-medium">
            &#8377; {parseFloat(total).toFixed(2)}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-textDim text-sm">Discount</span>
          <span className="text-baseGreen font-medium">&#8377; 0.00</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-textDim text-sm">Shipping Costs</span>
          <span className="text-baseGreen font-medium">&#8377; 0.00</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <div className="flex flex-row justify-between items-center">
          <span className="text-uiBlack text-[20px] font-medium">Total</span>
          <span className="text-uiBlack text-[20px] font-medium">
            &#8377; {parseFloat(total).toFixed(2)}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span className="text-textDim text-sm">You save</span>
          <span className="text-textDim font-medium">&#8377; 0.00</span>
        </div>
      </div>

      <div className="pt-6 pb-8 border-b border-uiGrey">
        <button
          type="button"
          onClick={handleCheckout}
          className="primary-button flex justify-center items-center disabled:bg-baseGreen/60 disabled:border-baseGreen/30 w-full"
          disabled={buttonDisabled}
        >
          {buttonName}
        </button>
      </div>

      <div className="flex flex-col gap-4 pt-6">
        <p className="text-textDim uppercase text-sm">
          Secure payments provided by
        </p>
        <div className="flex flex-row gap-3">
          <img
            src={stripe}
            alt=""
            className="w-[56px] h-[32px] object-contain bg-white rounded-[4px]"
          />
          <img
            src={crypto}
            alt=""
            className="w-[56px] h-[32px] object-contain bg-white rounded-[4px]"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCard;
