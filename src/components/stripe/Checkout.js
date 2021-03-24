import { API_ROOT } from '../../api-config.js';
import React from 'react';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection'
import axios from 'axios'

export const Checkout = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      stripe, 
      oneLesson,
      elements,
      closeModal
    } = props;
    
    if (!stripe || !elements) {
      return;
    }
    // createToken also accepts an optional second parameter containing 
    // additional card information collected from the customer, which is 
    // not used in this example. 
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card)
    
    if (result.error) {
      alert(`I'm sorry, your card number is either incomplete or invalid`)
    } else {
      const stripeToken = result.token;
      const browserToken = localStorage.getItem('token');
      const user = localStorage.getItem('_id'); 
      const email = localStorage.getItem('email');

      const paymentData = {
        token: stripeToken.id,
        cost: oneLesson.cost,
        start: oneLesson.start,
        end: oneLesson.end,
        // lesson: oneLesson.id,
        user: user,
        email: email
      }

      const headers = {
        'Authorization': `Bearer ${browserToken}`,
        'Content-Type': 'application/json'
      }

      axios.post(`${API_ROOT}/charges`, {...paymentData}, {
        headers: headers
      }).then(resp => {
        if (resp.status === 204) {
          alert("Thank you! You should be emailed your access code shortly; please contact us if it hasn't arrived in the next 10 minutes")
        } else {
          alert('Something went wrong. Please try again.')
        }
      }).catch(err => {
        console.log(err)
      })

      closeModal()
    }
  
  };
  
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <CardSection />
      <button className="book-modal-btn" disabled={!props.stripe}>Confirm Order</button>
    </form>
  )
}

export default function InjectCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <Checkout 
          closeModal={props.closeModal}
          oneLesson={props.oneLesson}
          stripe={stripe} 
          elements={elements} 
        />
      )}
    </ElementsConsumer>
  )
}
