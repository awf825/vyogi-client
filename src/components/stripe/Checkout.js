import React, { Component } from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection'

class Checkout extends Component {
  handleSubmit = async (ev) => {
    ev.preventDefault();

    const {stripe, elements} = this.props
    
    if (!stripe || !elements) {
      return;
      //handle errors?
    }
    
    // createToken also accepts an optional second parameter containing 
    // additional card information collected from the customer, which is 
    // not used in this example. 
    const card = elements.getElement(CardElement);

    const result = await stripe.createToken(card)
    
    if (result.error) {
      console.log(result.error.message)
    } else {
      // Send the token to your server.
      // stripeTokenHandler(result.token)
      // or
      const token = result.token
      const paymentData = {token: token.id}

      const response = fetch('http://localhost:3001/api/v1/charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      return response;
    }
    
  };

  // stripeTokenHandler = (token) => {
  //   const paymentData = {token: token.id}

  //   // Use fetch to send the token ID and any other payment data to your server.
  //   const response = fetch('/charges', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(paymentData)
  //   });

  //   return response.json();
  // }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button disabled={!this.props.stripe}>Confirm Order</button>

      </form>
    )
  }
}

export default function InjectCheckoutForm() {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <Checkout stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  )
}


