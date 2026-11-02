import { useState } from 'react';
import { FiCheckCircle, FiCreditCard, FiLock, FiTruck } from 'react-icons/fi';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto" />
        <h2 className="text-3xl font-extrabold text-gray-900">Order Placed Successfully!</h2>
        <p className="text-gray-500 text-sm">Thank you for your purchase. We have received your order and are getting it ready for shipment.</p>
        <div className="pt-4">
          <a href="/products" className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Form: Address & Payment */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Address Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <FiTruck className="text-indigo-600" />
              <span>Shipping Address</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">First Name</label>
                <input required type="text" placeholder="John" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name</label>
                <input required type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Street Address</label>
                <input required type="text" placeholder="123 Main St, Apt 4B" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                <input required type="text" placeholder="New York" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Postal Code</label>
                <input required type="text" placeholder="10001" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
              <FiCreditCard className="text-indigo-600" />
              <span>Payment Method</span>
            </h2>
            <div className="space-y-3">
              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-semibold text-gray-900">Credit / Debit Card</span>
                </div>
                <FiLock className="text-gray-400" />
              </label>

              <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition ${paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-semibold text-gray-900">Cash on Delivery (COD)</span>
                </div>
              </label>
            </div>

            {paymentMethod === 'card' && (
              <div className="pt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Card Number</label>
                  <input type="text" placeholder="4532 •••• •••• 8920" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">CVV</label>
                    <input type="password" placeholder="123" maxLength="4" className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 h-fit space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Order Total</h3>
          <div className="space-y-3 text-sm text-gray-600 border-t border-b border-gray-100 py-4">
            <div className="flex justify-between">
              <span>Items (3)</span>
              <span className="font-semibold text-gray-900">$377.99</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-gray-900">Free</span>
            </div>
          </div>
          <div className="flex justify-between text-base font-extrabold text-gray-900">
            <span>Total Payable</span>
            <span>$377.99</span>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-md">
            <FiLock />
            <span>Place Order</span>
          </button>
        </div>
      </form>
    </div>
  );
}