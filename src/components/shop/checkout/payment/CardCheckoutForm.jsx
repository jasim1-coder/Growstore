import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const cardStyle = {
  base: {
    fontSize: "16px",
    color: "#32325d",
    "::placeholder": {
      color: "#ADADAD",
    },
  },
};

const CardCheckoutForm = ({ validated, setValidated }) => {
  const [cardNumber, setCardNumber] = useState({
    error: null,
    completed: false,
  });
  const [cardExpiry, setCardExpiry] = useState({
    error: null,
    completed: false,
  });
  const [cardCVC, setCardCVC] = useState({
    error: null,
    completed: false,
  });

  const handleCardNumberChange = (event) => {
    setValidated(false);
    if (event.error) {
      setCardNumber({ completed: false, error: event.error.message });
    } else if (event.empty) {
      setCardNumber({
        completed: false,
        error: "Your card number is incomplete.",
      });
    } else if (event.complete) {
      setCardNumber({ completed: true, error: null });
    }
  };

  const handleCardExpiryChange = (event) => {
    setValidated(false);
    if (event.error) {
      setCardExpiry({ completed: false, error: event.error.message });
    } else if (event.empty) {
      setCardExpiry({
        completed: false,
        error: "Your card's expiry date is incomplete.",
      });
    } else if (event.complete) {
      setCardExpiry({ completed: true, error: null });
    }
  };

  const handleCardCVCChange = (event) => {
    setValidated(false);
    console.log(event);
    if (event.error) {
      setCardCVC({ completed: false, error: event.error.message });
    } else if (event.empty) {
      setCardCVC({
        completed: false,
        error: "Your card's security code is incomplete.",
      });
    } else if (event.complete) {
      setCardCVC({ completed: true, error: null });
    }
  };

  const validateCard = (e) => {
    e.preventDefault();
    if (cardCVC.completed && cardExpiry.completed && cardNumber.completed) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  return (
    <form
      // onSubmit={handleSubmit}
      className="flex justify-center items-center w-full"
    >
      <div className="flex flex-col gap-4 p-6 rounded-sm w-full">
        <div className="flex flex-col gap-1">
          <label className="text-uiBlack" htmlFor="cardNumber">
            Card Number
          </label>
          <CardNumberElement
            id="cardNumber"
            options={{
              showIcon: true,
              iconStyle: "solid",
              style: cardStyle,
              disabled: validated,
            }}
            onChange={handleCardNumberChange}
            className="border border-greyLight p-3 block bg-white input-shadow"
          />
          {cardNumber.error && (
            <div className="text-red-500 text-xs">{cardNumber.error}</div>
          )}
        </div>

        <div className="grid-list-2">
          <div className="flex flex-col gap-1">
            <label className="text-uiBlack" htmlFor="cardExpiry">
              Expiration Date
            </label>
            <CardExpiryElement
              id="cardExpiry"
              options={{ style: cardStyle, disabled: validated }}
              onChange={handleCardExpiryChange}
              className="border border-greyLight p-3 block bg-white input-shadow"
            />
            {cardExpiry.error && (
              <div className="text-red-500 text-xs">{cardExpiry.error}</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-uiBlack" htmlFor="cardCvc">
              CVC
            </label>
            <CardCvcElement
              id="cardCvc"
              options={{ style: cardStyle, disabled: validated }}
              onChange={handleCardCVCChange}
              className="border border-greyLight p-3 block bg-white input-shadow"
            />
            {cardCVC.error && (
              <div className="text-red-500 text-xs">{cardCVC.error}</div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={validateCard}
          disabled={validated}
          className="border-baseGreen text-baseGreen border py-2 bg-white rounded-sm disabled:bg-greyLight disabled:border-greyLight hover:bg-lightGreen input-shadow"
        >
          {validated ? "Validated" : "Validate Card"}
        </button>
      </div>
    </form>
  );
};

export default CardCheckoutForm;
