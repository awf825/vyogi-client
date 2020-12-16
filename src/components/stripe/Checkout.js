import { API_ROOT } from '../../api-config.js';
import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection'

export const Checkout = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      cost,
      start,
      stripe, 
      elements,
      closeModal
    } = props
    
    if (!stripe || !elements) {
      return;
    }

    // createToken also accepts an optional second parameter containing 
    // additional card information collected from the customer, which is 
    // not used in this example. 
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card)
    const userId = props.user.id
    const email = props.user.email
    const account = props.account
    
    if (result.error) {
      console.error(result.error.message)
      alert(`I'm sorry, your card number is either incomplete or invalid`)
    } else {
      const token = result.token

      const paymentData = {
        token: token.id,
        cost: cost,
        start: start,
        lesson: id,
        userId: userId,
        email: email,
        account: account
      }

      fetch(`${API_ROOT}/charges`, {
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
  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <CardSection />
      <button disabled={!props.stripe}>Confirm Order</button>
    </form>
  )
}

export default function InjectCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <Checkout 
          closeModal={props.closeModal}
          id={props.id} 
          cost={props.cost}
          start={props.start}
          stripe={stripe} 
          elements={elements} 
          user={props.user}
          account={props.account}
        />
      )}
    </ElementsConsumer>
  )
}
