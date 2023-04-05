import React, { useEffect, useState } from "react";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Confirmation from "./Confirmation";
import CheckoutLayout from "../../components/checkout/CheckoutLayout";
import CartMain from "../../components/cart/CartMain";
import { getCartItemsLength } from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeAddressId } from "../../redux/slice/orderSlice";

const steps = ["Cart", "Shipping", "Payment", "Confirmation"];

const Checkout = () => {
  const dispatch = useDispatch();
  const itemsLength = useSelector(getCartItemsLength);

  const [activeStep, setActiveStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);

  const handleNextStep = () => {
    setMaxStep(activeStep + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    if (itemsLength === 0) {
      setActiveStep(0);
      setMaxStep(0);
    }
    return () => {
      dispatch(removeAddressId());
    };
  }, []);

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <CartMain handleCheckout={handleNextStep} />;
      case 1:
        return <Shipping onNextStep={handleNextStep} />;
      case 2:
        return <Payment onNextStep={handleNextStep} />;
      case 3:
        return <Confirmation />;
      default:
        return null;
    }
  };

  return (
    <CheckoutLayout>
      <div className="flex flex-row items-center py-4 sm:w-max w-full mx-auto font-medium">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-row items-center">
            <div
              className={`${
                index <= maxStep ? "text-uiBlack" : "text-textDim"
              }`}
            >
              <button
                type="button"
                className={`${index === activeStep ? "text-baseGreen" : null}`}
                onClick={() => setActiveStep(index)}
                disabled={index > maxStep || activeStep === steps.length - 1}
              >
                {step}
              </button>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={`h-[2px] ${
                  index <= maxStep ? "bg-uiBlack" : "bg-textDim"
                } sm:w-[50px] flex-1 mx-3`}
              />
            ) : null}
          </div>
        ))}
      </div>
      {renderStep()}
    </CheckoutLayout>
  );
};

export default Checkout;
