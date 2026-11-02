import { useState } from 'react';
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const INITIAL_CART_ITEMS = [
    {
        id: 1,
        product: {
            id: '1',
            name: 'Wireless Noise-Canceling Premium Headphones',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
            category: 'Electronics'
        },
        variant: 'Matte Black / Standard',
        quantity: 1
    },
    {
        id: 2,
        product: {
            id: '2',
            name: 'Minimalist Leather Wrist Watch',
            price: 89.00,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
            category: 'Accessories'
        },
        variant: 'Brown Leather',
        quantity: 2
    }
];

export default function Cart() {
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            })
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const applyCoupon = (e) => {
        e.preventDefault();
        if (couponCode.toUpperCase() === 'SAVE10') {
            setDiscount(10); // $10 off
        } else {
            alert('Invalid coupon code. Try SAVE10');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const total = Math.max(0, subtotal - discount + (cartItems.length > 0 ? shipping : 0));

    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                    <FiShoppingBag />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h2>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Explore our catalog and find something you love!</p>
                <Link to="/products" className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart ({cartItems.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Item List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 gap-4">
                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100" />
                                <div>
                                    <span className="text-xs text-indigo-600 font-semibold">{item.product.category}</span>
                                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                                    <span className="text-sm font-extrabold text-gray-900 sm:hidden mt-2 block">${item.product.price}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
                                <div className="hidden sm:block text-base font-extrabold text-gray-900">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 space-x-3">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-gray-800">
                                        <FiMinus className="text-xs" />
                                    </button>
                                    <span className="text-sm font-bold text-gray-800">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-gray-800">
                                        <FiPlus className="text-xs" />
                                    </button>
                                </div>

                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition">
                                    <FiTrash2 className="text-lg" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary & Checkout Sidebar */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 h-fit space-y-6">
                    <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>

                    {/* Coupon Form */}
                    <form onSubmit={applyCoupon} className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Coupon (e.g. SAVE10)"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-indigo-500"
                        />
                        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                            Apply
                        </button>
                    </form>

                    <div className="space-y-3 text-sm text-gray-600 border-t border-b border-gray-100 py-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Estimated Shipping</span>
                            <span className="font-semibold text-gray-900">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-base font-extrabold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout" className="w-full bg-indigo-600 text-white font-bold py-3.5 px-4 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-md">
                        <span>Proceed to Checkout</span>
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}