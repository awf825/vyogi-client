import { API_ROOT } from "../../api-config.js";
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import axios from "axios";

// const { REACT_APP_PUBLISHABLE_KEY_TEST } = process.env;
// const stripePromise = loadStripe(REACT_APP_PUBLISHABLE_KEY_TEST)

const PayForm = (props) => {
  const [stripeToken, setStripeToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_ROOT}/stripe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setStripeToken(loadStripe(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stripeToken]);

  return (
    <div className="payform">
      <p>
        Please enter your payment information. Your information will not be
        stored.
      </p>
      <Elements stripe={stripeToken}>
        <Checkout {...props} />
      </Elements>
    </div>
  );
};

export default PayForm;
