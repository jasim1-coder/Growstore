import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";
import { useSelector } from "react-redux";
import { getUserName } from "../../../redux/slice/authSlice";
import { PRIVATE_API } from "../../../api/apiIndex";
import { getCartTotal } from "../../../redux/slice/cartSlice";

const CardCheckoutForm = () => {
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
    <form onSubmit={handleSubmit}>
      <div className="grid-list-2">
        <label className="text-sm">
          Card Number
          <CardNumberElement />
        </label>
        <label className="text-sm">
          Expiration Date
          <CardExpiryElement />
        </label>
      </div>
      <div className="grid-list-2">
        <label className="text-sm">
          CVC
          <CardCvcElement />
        </label>
      </div>
      {/* <button disabled={!stripe}>Confirm order</button> */}
    </form>
  );
};

export default CardCheckoutForm;
