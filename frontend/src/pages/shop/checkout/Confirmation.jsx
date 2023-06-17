import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getOrderId } from "../../../redux/slice/orderSlice";

const Confirmation = () => {
  const orderId = useSelector(getOrderId);

  return (
    <div className="sm:container py-[2rem] sm:px-[4rem] flex-1 flex flex-col gap-5 justify-center items-center">
      <div className="py-2">
        <FiCheckCircle className="text-[108px] text-green-500" />
      </div>
      <div className="">
        <h2 className="heading2">Order Placed Successfully</h2>
        <span className="text-bodyText text-sm">
          Thankyou for shopping with us your Order Id is {orderId}
        </span>
      </div>

      <div className="my-5">
        <a href="/" className="primary-button">
          Go To Homepage
        </a>
      </div>
    </div>
  );
};

export default Confirmation;
