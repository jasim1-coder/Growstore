import React, { useEffect, useState } from "react";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Confirmation from "./Confirmation";
import CheckoutLayout from "../../../components/shop/checkout/CheckoutLayout";
import CartMain from "../../../components/shop/cart/CartMain";
import { getCartItemsLength } from "../../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeAddressId } from "../../../redux/slice/orderSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  FiCheckCircle,
  FiCreditCard,
  FiShoppingCart,
  FiTruck,
} from "react-icons/fi";

const steps = [
  { title: "Cart", icon: <FiShoppingCart /> },
  { title: "Shipping", icon: <FiTruck /> },
  { title: "Payment", icon: <FiCreditCard /> },
  { title: "Confirmation", icon: <FiCheckCircle /> },
];
// const steps = ["Cart", "Shipping", "Payment", "Confirmation"];

const stripePromise = loadStripe(
  "pkpk_test_51MtbcoSFTB0iFfwzKI856s72h3EJ36wDX63z2aERFrldMqpKgNyPMLkrtj0ZiqSYiEVAZ5IdMGZ46lcj0Cdvs6ES00RjeRuQQt"
);

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
        return (
          <Elements stripe={stripePromise}>
            <Payment onNextStep={handleNextStep} />
          </Elements>
        );
      case 3:
        return <Confirmation />;
      default:
        return null;
    }
  };

  return (
    <CheckoutLayout>
      <div className="flex flex-row items-center py-4 sm:w-max w-full sm:mx-auto font-medium">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-row items-center flex-grow"
          >
            <div
              className={`${
                index <= maxStep ? "text-uiBlack" : "text-textDim"
              }`}
            >
              <button
                type="button"
                className={`${
                  index === activeStep ? "text-baseGreen" : null
                } flex flex-row gap-1 items-center`}
                onClick={() => setActiveStep(index)}
                disabled={index > maxStep || activeStep === steps.length - 1}
              >
                <div
                  className={`p-2 ${
                    index === activeStep ? "bg-baseGreen/30" : null
                  } rounded-full`}
                >
                  {step.icon}
                </div>
                <span className="hidden sm:block">{step.title}</span>
              </button>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={`h-[2px] ${
                  index <= maxStep ? "bg-uiBlack" : "bg-textDim"
                } sm:w-[50px] min-w-[25px] flex-grow mx-3`}
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
