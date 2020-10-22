import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import Checkout from './Checkout';

class PayForm extends Component {
  render() {
    const { REACT_APP_PUBLISHABLE_KEY_TEST } = process.env;
    console.log('props before confirmation are:', this.props)
    return (
      <StripeProvider apiKey={REACT_APP_PUBLISHABLE_KEY_TEST}>
        <div className="test">
          <h1>Stripe</h1>
          <Elements>
            <Checkout id={this.props.id}/>
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default PayForm;