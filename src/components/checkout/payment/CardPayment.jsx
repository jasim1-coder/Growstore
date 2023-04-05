import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CardCheckoutForm from "./CardCheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MtbcoSFTB0iFfwzKI856s72h3EJ36wDX63z2aERFrldMqpKgNyPMLkrtj0ZiqSYiEVAZ5IdMGZ46lcj0Cdvs6ES00RjeRuQQt"
);

const CardPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardCheckoutForm />
    </Elements>
  );
};

export default CardPayment;
