import React, { Component } from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection'

class Checkout extends Component {
  constructor(props) {
    console.log('props at checkout', props)
    super(props)
    this.state = {
      test: 'test'
    }
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();
    
    const {
      id,
      cost,
      start,
      stripe, 
      elements,
      userId,
      userEmail
    } = this.props
    
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
      const paymentData = {
        token: token.id,
        cost: cost,
        userId: userId,
        email: userEmail,
        start: start,
        lesson: id,
        accessCode: "build in backend and mail to user",
        status: "gonna need to find a way to send back data from the back end to mark fully booked events"
      }

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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button disabled={!this.props.stripe}>Confirm Order</button>

      </form>
    )
  }
}

export default function InjectCheckoutForm(props) {
  // cost={this.props.cost}
  // description={this.props.description}
  // start={this.props.start}
  // title={this.props.title}
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <Checkout 
          userId={props.userId}
          userEmail={props.userEmail}
          id={props.id} 
          cost={props.cost}
          start={props.start}
          stripe={stripe} 
          elements={elements} 
        />
      )}
    </ElementsConsumer>
  )
}
