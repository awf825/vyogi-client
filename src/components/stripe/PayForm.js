import { API_ROOT } from "../../api-config.js";
import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout";
import axios from "axios";

// const { REACT_APP_PUBLISHABLE_KEY_TEST } = process.env;
// const stripePromise = loadStripe(REACT_APP_PUBLISHABLE_KEY_TEST)

const PayForm = (props) => {
  const [stripeToken, setStripeToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_ROOT}/stripe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setStripeToken(loadStripe(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stripeToken]);

  return (
    <div className="payform">
      <h1>Stripe</h1>
      <Elements stripe={stripeToken}>
        <Checkout {...props} />
      </Elements>
    </div>
  );
};

export default PayForm;

// class PayForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       stripeToken: null,
//     };
//   }

//   componentDidMount() {
//     const token = localStorage.getItem("token");
//     axios
//       .get(`${API_ROOT}/stripe`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((resp) => {
//         this.setState({
//           stripeToken: loadStripe(resp.data),
//         });
//       });
//   }

//   componentWillUnmount() {
//     this.setState({
//       stripeToken: null,
//     });
//   }

//   render() {
//     return (
//       <div className="payform">
//         <h1>Stripe</h1>
//         <Elements stripe={this.state.stripeToken}>
//           <Checkout {...this.props} />
//         </Elements>
//       </div>
//     );
//   }
// }
