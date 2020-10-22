import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false
    }
    console.log('props when Stripe appears:', props)
  }

  submit = async () => {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let {response} = await fetch('http//localhost:3001/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token.id,
        orderId: this.props.id
      })
    })

    if (response.ok) {
      this.setState({
        complete: true
        // create lesson_payment and booking?
      })
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete!</h1>

    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Book</button>
      </div>
    )
  }
}

// The injectStripe is a higher-order component (HOC), which is a function that takes 
// in a component and returns a new component containing a Stripe object. You must 
// use the wrapped component in your application instead of the original CheckoutForm.

export default injectStripe(Checkout);