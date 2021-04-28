import { API_ROOT } from "../../api-config.js";
import React, { useContext } from "react";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import CardSection from "./CardSection";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { MessageContext, sendMessage } from "../Messaging/MessageContext";

export const Checkout = (props) => {
  const history = useHistory();
  const [state, dispatch] = useContext(MessageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { stripe, oneLesson, elements, closeModal } = props;

    if (!stripe || !elements) {
      return;
    }
    // createToken also accepts an optional second parameter containing
    // additional card information collected from the customer, which is
    // not used in this example.
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      dispatch(
        sendMessage(
          `I'm sorry, your card number is either incomplete or invalid`
        )
      );
    } else {
      const stripeToken = result.token;

      const browserToken = localStorage.getItem("token");
      const user = localStorage.getItem("_id");
      const email = localStorage.getItem("email");

      const paymentData = {
        token: stripeToken.id,
        cost: oneLesson.cost,
        start: oneLesson.start,
        end: oneLesson.end,
        lesson: oneLesson.id,
        check: oneLesson.check,
        userName: oneLesson.userName,
        practiced: oneLesson.practiced,
        limitations: oneLesson.limitations,
        focus: oneLesson.focus,
        needToKnow: oneLesson.needToKnow,
        user: user,
        email: email,
      };

      const headers = {
        Authorization: `Bearer ${browserToken}`,
        "Content-Type": "application/json",
      };

      axios
        .post(
          `${API_ROOT}/charges`,
          { ...paymentData },
          {
            headers: headers,
          }
        )
        .then((resp) => {
          if (resp.status === 204) {
            dispatch(
              sendMessage(
                "Thank you! You should be emailed your access code shortly; please contact us if it hasn't arrived in the next 10 minutes"
              )
            );
            history.push({
              pathname: "/appointment/success",
              openModal: true,
            });
          } else {
            dispatch(sendMessage("Something went wrong. Please try again."));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <CardSection />
      <Button type="submit" className="payform__btn" disabled={!props.stripe}>
        Confirm Order
      </Button>
    </form>
  );
};

export default function InjectCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <Checkout
          closeModal={props.closeModal}
          oneLesson={props.oneLesson}
          stripe={stripe}
          elements={elements}
        />
      )}
    </ElementsConsumer>
  );
}
