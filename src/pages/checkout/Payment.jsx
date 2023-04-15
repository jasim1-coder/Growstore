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
  removeOrderStatus,
  setOrderStatus,
} from "../../redux/slice/orderSlice";
import AlertBox from "../../components/common/AlertBox";
import CryptoPayment from "../../components/checkout/payment/CryptoPayment";
import { ethers } from "ethers";
import { getINRvalue } from "../../redux/slice/daiSlice";

const Payment = ({ onNextStep }) => {
  const dispatch = useDispatch();

  const addressId = useSelector(getAddressId);
  const cartId = useSelector(getCartId);

  const orderStatus = useSelector(getOrderStatus);
  const orderMessage = useSelector(getOrderMessage);
  const orderError = useSelector(getOrderError);

  const [paymentValidated, setPaymentValidated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [paymentProcessor, setPaymentProcessor] = useState(null);
  const [daiProcessor, setDaiProcessor] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const userName = useSelector(getUserName);
  const totalAmount = useSelector(getCartTotal);
  const inrValue = useSelector(getINRvalue);

  const handleCardSubmit = async () => {
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
      setPaymentValidated(false);
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

  const handleCryptoSubmit = async () => {
    try {
      dispatch(
        setOrderStatus({
          status: "loading",
          message: "Please approve transaction in MetaMask wallet.",
        })
      );
      const { data } = await PRIVATE_API.post("/payment/crypto", {
        totalAmount,
      });

      const converedAmount = (totalAmount / inrValue).toString();
      const price = ethers.parseEther(converedAmount);
      const clientAddress = await paymentProcessor.getAddress();

      const approveTransaction = await daiProcessor.approve(
        clientAddress,
        price
      );
      await approveTransaction.wait();

      dispatch(
        setOrderStatus({
          status: "loading",
          message:
            "Successfully approved transaction. Please confirm transaction in MetaMask wallet",
        })
      );

      const paymentTransaction = await paymentProcessor.pay(
        price,
        data.paymentId
      );
      await paymentTransaction.wait();

      dispatch(
        setOrderStatus({
          status: "loading",
          message: "Successfully processed payment. Please wait",
        })
      );

      const sendData = {
        paymentMethod: "Cryptocurrency",
        paymentId: data.paymentId,
        addressId,
        cartId,
      };
      await dispatch(placeOrder(sendData)).unwrap();
      onNextStep();
    } catch (err) {
      dispatch(
        setOrderStatus({
          status: "failed",
          message: "",
          error:
            err.code === "ACTION_REJECTED"
              ? "Transaction rejected by user"
              : err.message,
        })
      );
      setPaymentValidated(false);
    }
  };

  return (
    <div className="sm:container py-[2rem] sm:px-[4rem]">
      {orderStatus === "failed" ? (
        <AlertBox
          type={orderStatus}
          message={orderError}
          toDispatch={removeOrderStatus}
        />
      ) : null}
      {orderStatus === "loading" ? (
        <PaymentLoading message={orderMessage} />
      ) : null}
      <div className="flex md:flex-row flex-col justify-between gap-16">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-row justify-between items-center border-b border-textDim py-4">
            <h2 className="heading2">Payment Details</h2>
          </div>
          <div className="border border-greyLight bg-formBackground">
            <div className="p-6 flex flex-col sm:w-[500px] w-full mx-auto">
              <div className="flex flex-row gap-4 justify-between border-b border-b-greyLight pb-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`m-2 py-2 w-full rounded-sm bg-white input-shadow ${
                    paymentMethod === "card"
                      ? "border border-baseGreen text-baseGreen font-medium"
                      : "border border-greyLight text-uiBlack disabled:text-textDim disabled:bg-greyLight"
                  } hover:text-baseGreen`}
                  disabled={paymentValidated}
                >
                  Pay using card
                </button>
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`m-2 py-2 w-full rounded-sm bg-white input-shadow ${
                    paymentMethod === "crypto"
                      ? "border border-baseGreen text-baseGreen font-medium"
                      : "border border-greyLight text-uiBlack disabled:text-textDim disabled:bg-greyLight"
                  } hover:text-baseGreen transition-colors duration-150`}
                  disabled={paymentValidated}
                >
                  Pay using crypto
                </button>
              </div>
              {paymentMethod === "card" ? (
                <CardCheckoutForm
                  validated={paymentValidated}
                  setValidated={setPaymentValidated}
                />
              ) : (
                <CryptoPayment
                  setPaymentProcessor={setPaymentProcessor}
                  setDaiProcessor={setDaiProcessor}
                  paymentValidated={paymentValidated}
                  inrValue={inrValue}
                  setPaymentValidated={setPaymentValidated}
                />
              )}
            </div>
          </div>
        </div>
        <CheckoutCard
          handleCheckout={
            paymentMethod === "card" ? handleCardSubmit : handleCryptoSubmit
          }
          buttonName="Place Order"
          buttonDisabled={!paymentValidated}
        />
      </div>
    </div>
  );
};

export default Payment;
