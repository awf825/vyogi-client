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
      userId,
      userEmail,
      account,
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
    
    if (result.error) {
      console.error(result.error.message)
      alert(`I'm sorry, your card number is either incomplete or invalid`)
    } else {
      const token = result.token

      const paymentData = {
        token: token.id,
        cost: cost,
        userId: userId,
        email: userEmail,
        start: start,
        lesson: id,
        account: account
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
          userId={props.userId}
          userEmail={props.userEmail}
          id={props.id} 
          cost={props.cost}
          start={props.start}
          account={props.account}
          stripe={stripe} 
          elements={elements} 
        />
      )}
    </ElementsConsumer>
  )
}
