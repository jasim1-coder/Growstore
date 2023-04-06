import React, { useState } from "react";
import CheckoutCard from "../../components/cart/CheckoutCard";
import CardCheckoutForm from "../../components/checkout/payment/CardCheckoutForm";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { getUserName } from "../../redux/slice/authSlice";
import { getCartId, getCartTotal } from "../../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { PRIVATE_API } from "../../api/apiIndex";
import PaymentLoading from "../../components/common/loaders/PaymentLoading";
import {
  getAddressId,
  getOrderError,
  getOrderMessage,
  getOrderStatus,
  placeOrder,
  setOrderStatus,
} from "../../redux/slice/orderSlice";
import AlertBox from "../../components/common/AlertBox";

const Payment = ({ onNextStep }) => {
  const dispatch = useDispatch();

  const addressId = useSelector(getAddressId);
  const cartId = useSelector(getCartId);

  const orderStatus = useSelector(getOrderStatus);
  const orderMessage = useSelector(getOrderMessage);
  const orderError = useSelector(getOrderError);

  const [cardValidated, setCardValidated] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const userName = useSelector(getUserName);
  const totalAmount = useSelector(getCartTotal);

  const handleSubmit = async () => {
    dispatch(
      setOrderStatus({
        status: "loading",
        message: "Processing your payment. Please wait",
      })
    );
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
      dispatch(
        setOrderStatus({
          status: "failed",
          message: "",
          error: result.error.message,
        })
      );
      setCardValidated(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log(result);
        const data = {
          paymentMethod: "Card",
          paymentId: result.paymentIntent.id,
          addressId,
          cartId,
        };
        await dispatch(placeOrder(data)).unwrap();
        onNextStep();
      }
    }
  };

  return (
    <div className="sm:container py-[2rem] sm:px-[4rem]">
      {orderStatus === "failed" ? (
        <AlertBox type={orderStatus} message={orderError} />
      ) : null}
      {orderStatus === "loading" ? (
        <PaymentLoading message={orderMessage} />
      ) : null}
      <div className="flex md:flex-row flex-col justify-between gap-16">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center border-b border-textDim py-4">
            <h2 className="heading2">Payment Details</h2>
          </div>
          <div className="flex flex-row gap-6 justify-between">
            <div className="">Pay using card</div>
            <div className="">Pay using Cryptocurrency</div>
          </div>
          <CardCheckoutForm
            validated={cardValidated}
            setValidated={setCardValidated}
            handleSubmit={handleSubmit}
          />
        </div>
        <CheckoutCard
          handleCheckout={handleSubmit}
          buttonName="Place Order"
          buttonDisabled={!cardValidated}
        />
      </div>
    </div>
  );
};

export default Payment;
