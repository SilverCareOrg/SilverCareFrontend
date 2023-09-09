import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios_api from '../api/axios_api';

const CheckoutDetails = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
  
    const {paymentMethod, error} = await stripe.createPaymentMethod({
        type: 'card',
        card: card
    });

    if (error) {
      console.error("Error creating payment method:", error);
      return;
    } else {
      console.log("Payment method created:", paymentMethod);
    }

    axios_api.post("/save_stripe_info", {
      email, payment_method_id: paymentMethod.id
    },
    {sameSite: 'none', withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
  }}).then((response) => {
      if (response) {
      }
    }).catch((error) => {
        console.log("Error:", error);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full p-6">
        <form onSubmit={handleSubmit} className="border rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jenny.rosen@example.com"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-input px-3 py-2 mt-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="card-element" className="block text-gray-700 text-sm font-semibold">Credit or Debit Card</label>
            <div className="border rounded-md shadow-sm p-3">
              <CardElement
                id="card-element"
                onChange={handleChange}
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#32325d',
                      fontFamily: 'Arial, sans-serif',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#fa755a',
                    },
                  },
                }}
              />
            </div>
            {error && <div className="text-red-500 text-sm mt-2" role="alert">{error}</div>}
          </div>
          <button type="submit" className="btn bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none">
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutDetails;
