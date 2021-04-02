import React from "react";
// need to be added to the import below commented out to get rid of warnings in console CardNumberElement, CardExpiryElement, CardCvcElement
import { CardElement } from "@stripe/react-stripe-js";
import "./Styles.css";

// https://stripe.com/docs/stripe-js/react#element-props-options
// https://stripe.com/docs/js/appendix/style?type=card
// https://stripe.com/docs/js/elements_object/create_element?type=card#elements_create-options
// https://stripe.com/docs/stripe-js/react Developer Tools > Customization and Styling

// Maybe lay out options for each individual component?
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
      width: "60%",
    },
  },
};

function CardSection() {
  return (
    <CardElement options={CARD_ELEMENT_OPTIONS} />
    // <CardNumberElement />
    // <CardExpiryElement />
    // <CardCvcElement />
    // <>
    //   <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
    //   <CardExpiryElement />
    //   <CardCvcElement />
    // </>
  );
}

export default CardSection;
