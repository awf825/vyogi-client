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
      userEmail,
      closeModal
    } = this.props
    
    if (!stripe || !elements) {
      return;
    }

    // createToken also accepts an optional second parameter containing 
    // additional card information collected from the customer, which is 
    // not used in this example. 
    const card = elements.getElement(CardElement);

    const result = await stripe.createToken(card)
    
    if (result.error) {
      console.error(result.error.message)
      alert(`I'm sorry, your card number is either incomplete or invalid`)
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
        lesson: id
      }

      fetch('http://localhost:3001/api/v1/charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      }).then(function(resp){
        if (resp.ok) {
          alert("Thank you! You should be emailed your access code shortly; please contact us if it hasn't arrived in the next 10 minutes")
        } else {
          alert('Something went wrong.')
        }
        return resp
      })

      closeModal()

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
          closeModal={props.closeModal}
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
