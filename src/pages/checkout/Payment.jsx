import React from "react";
import CheckoutCard from "../../components/cart/CheckoutCard";
import CardPayment from "../../components/checkout/payment/CardPayment";

const Payment = ({ onNextStep }) => {
  return (
    <div className="container py-[2rem] sm:px-[4rem]">
      <div className="flex md:flex-row flex-col justify-between gap-16">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center border-b border-textDim py-4">
            <h2 className="heading2">Payment Details</h2>
          </div>
          <div className="flex flex-row gap-6 justify-between">
            <div className="">Pay using card</div>
            <div className="">Pay using Cryptocurrency</div>
          </div>
          <CardPayment />
        </div>
        <CheckoutCard
          handleCheckout={onNextStep}
          buttonName="Place Order"
          buttonDisabled={false}
        />
      </div>
    </div>
  );
};

export default Payment;
