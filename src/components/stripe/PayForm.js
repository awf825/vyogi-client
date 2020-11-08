import React, {Component} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Checkout from './Checkout';
import axios from 'axios';

// const { REACT_APP_PUBLISHABLE_KEY_TEST } = process.env;
// const stripePromise = loadStripe(REACT_APP_PUBLISHABLE_KEY_TEST)

class PayForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stripeToken: null
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/stripe')
      .then(resp => {
        this.setState({
          stripeToken: loadStripe(resp.data)
        })
      })
  }

  componentWillUnmount() {
    this.setState({
      stripeToken: null
    })
  }

  render() {
    console.log('state when payform renders:', this.state)
    return (
      <div className="payform">
        <h1>Stripe</h1>
        <Elements stripe={this.state.stripeToken}>
          <Checkout {...this.props}/>
        </Elements>
      </div>
    )
  }
}

export default PayForm;