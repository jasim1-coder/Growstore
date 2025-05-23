// components/CardWrapper.js
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_...");

const CardWrapper = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default CardWrapper;
