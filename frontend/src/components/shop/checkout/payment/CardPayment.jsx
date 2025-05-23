import React, { useState } from "react";
import {
  Elements,
  useElements,
  useStripe,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CardCheckoutForm from "./CardCheckoutForm";
import { PRIVATE_API } from "../../../../api/apiIndex";
import { useSelector } from "react-redux";
import { getUserName } from "../../../../redux/slice/authSlice";
import { getCartTotal } from "../../../../redux/slice/cartSlice";

const stripePromise = loadStripe(
  "pkkkpk_test_51MtbcoSFTB0iFfwzKI856s72h3EJ36wDX63z2aERFrldMqpKgNyPMLkrtj0ZiqSYiEVAZ5IdMGZ46lcj0Cdvs6ES00RjeRuQQt"
);

// Inner component: has access to Stripe context via hooks
const CheckoutFormWrapper = ({ validated, setValidated }) => {
  const stripe = useStripe();
  const elements = useElements();
  const userName = useSelector(getUserName);
  const totalAmount = useSelector(getCartTotal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await PRIVATE_API.post("/payment/stripe", {
      totalAmount,
    });

    if (!stripe || !elements) {
      console.log("Stripe.js has not loaded yet.");
      return;
    }

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: userName,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!", result);
      // You can add more success logic here
    }
  };

  return (
    <CardCheckoutForm
      validated={validated}
      setValidated={setValidated}
      handleSubmit={handleSubmit}
    />
  );
};

// Outer component: loads Stripe and provides Elements context
const CardPayment = ({ validated, setValidated }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormWrapper validated={validated} setValidated={setValidated} />
    </Elements>
  );
};

export default CardPayment;
