import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create order
      const orderData = {
        items: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity
        })),
        shippingAddress
      };

      const orderResponse = await orderAPI.create(orderData);
      const order = orderResponse.data;
      // Create payment intent
      const paymentResponse = await orderAPI.createPaymentIntent(order._id);
      const { clientSecret } = paymentResponse.data;

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user.name,
              email: user.email
            }
          }
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Update order to paid
        await orderAPI.updateToPaid(order._id);

        // Clear cart
        clearCart();

        // Navigate to success page
        navigate(`/order-success/${order._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            required
            value={shippingAddress.street}
            onChange={handleAddressChange}
            className="input-field"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              value={shippingAddress.city}
              onChange={handleAddressChange}
              className="input-field"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              required
              value={shippingAddress.state}
              onChange={handleAddressChange}
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              required
              value={shippingAddress.zipCode}
              onChange={handleAddressChange}
              className="input-field"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              required
              value={shippingAddress.country}
              onChange={handleAddressChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
        <div className="p-4 border border-gray-300 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#9e2146'
                }
              }
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-2">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span className="text-gray-600">
                {item.name} x {item.quantity}
              </span>
              <span className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-blue-600">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;
