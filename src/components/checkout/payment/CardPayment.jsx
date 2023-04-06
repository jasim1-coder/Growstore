import React from "react";
import {
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CardCheckoutForm from "./CardCheckoutForm";
import { PRIVATE_API } from "../../../api/apiIndex";
import { useSelector } from "react-redux";
import { getUserName } from "../../../redux/slice/authSlice";
import { getCartTotal } from "../../../redux/slice/cartSlice";

const stripePromise = loadStripe(
  "pk_test_51MtbcoSFTB0iFfwzKI856s72h3EJ36wDX63z2aERFrldMqpKgNyPMLkrtj0ZiqSYiEVAZ5IdMGZ46lcj0Cdvs6ES00RjeRuQQt"
);

const CardPayment = ({ validated, setValidated }) => {
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
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log(result);
      }
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <CardCheckoutForm
        validated={validated}
        setValidated={setValidated}
        handleSubmit={handleSubmit}
      />
    </Elements>
  );
};

export default CardPayment;
