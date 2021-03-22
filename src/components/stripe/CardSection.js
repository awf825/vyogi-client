import React from "react";
// need to be added to the import below commented out to get rid of warnings in console CardNumberElement, CardExpiryElement, CardCvcElement
import { CardElement } from "@stripe/react-stripe-js";
import "./Styles.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardSection() {
  return (
    <div>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      {/* <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
      <CardExpiryElement />
      <CardCvcElement /> */}
    </div>
  );
}

export default CardSection;
