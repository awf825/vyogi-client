import React, {Component} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './Checkout';
const { REACT_APP_PUBLISHABLE_KEY_TEST } = process.env;
const stripePromise = loadStripe(REACT_APP_PUBLISHABLE_KEY_TEST)

class PayForm extends Component {
  render() {
    // console.log('props before confirmation are:', this.props)
    return (
      <div className="test">
        <h1>Stripe</h1>
        <Elements stripe={stripePromise}>
          <Checkout id={this.props.id}/>
        </Elements>
      </div>
    )
  }
}

export default PayForm;