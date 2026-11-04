
import { useState } from "react";
import {
    FiArrowLeft,
    FiMinus,
    FiPlus,
    FiShield,
    FiShoppingBag,
    FiTrash2,
    FiTruck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const initialCartItems = [
    {
        id: 1,
        name: "Premium Casual Sneakers",
        category: "Footwear",
        variant: "Size: 8 | Color: White",
        price: 2499,
        oldPrice: 3299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
        id: 2,
        name: "Classic Women's Handbag",
        category: "Accessories",
        variant: "Color: Lavender",
        price: 1899,
        oldPrice: 2499,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    },
    {
        id: 3,
        name: "Minimal Analog Watch",
        category: "Watches",
        variant: "Color: Silver",
        price: 1599,
        oldPrice: 2199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
];

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const updateQuantity = (id, change) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: Math.max(
                              1,
                              Math.min(10, item.quantity + change)
                          ),
                      }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems((items) =>
            items.filter((item) => item.id !== id)
        );
    };

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
    const total = subtotal + shipping;

    const formatPrice = (price) =>
        `₹${price.toLocaleString("en-IN")}`;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="w-24 h-24 rounded-full bg-[#F1EAF8] flex items-center justify-center mb-6">
                    <FiShoppingBag className="text-4xl text-[#7652A5]" />
                </div>

                <h2 className="text-2xl font-bold text-[#30283B]">
                    Your cart is empty
                </h2>

                <p className="text-[#77717F] mt-2 mb-6">
                    Looks like you haven't added anything to your cart yet.
                </p>

                <Link
                    to="/products"
                    className="bg-[#7652A5] text-white px-7 py-3 rounded-xl hover:bg-[#5E3F89] transition"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F6FB] py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-[#7652A5] hover:text-[#5E3F89] mb-6"
                >
                    <FiArrowLeft />
                    Continue Shopping
                </Link>

                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#30283B]">
                        Shopping Cart
                    </h1>
                    <p className="text-[#77717F] mt-2">
                        You have {totalItems} item(s) in your cart.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">

                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-[#30283B]">
                                Cart Items
                            </h2>

                            <button
                                onClick={() => setCartItems([])}
                                className="text-sm text-red-500 hover:text-red-700"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-[#E9E0F5] p-4 sm:p-5 flex flex-col sm:flex-row gap-5"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full sm:w-32 h-36 sm:h-32 object-cover rounded-xl bg-[#F8F6FB]"
                                />

                                <div className="flex-1 flex flex-col justify-between gap-4">
                                    <div className="flex justify-between gap-3">
                                        <div>
                                            <p className="text-xs text-[#7652A5] font-medium mb-1">
                                                {item.category}
                                            </p>

                                            <h3 className="font-semibold text-[#30283B]">
                                                {item.name}
                                            </h3>

                                            <p className="text-sm text-[#77717F] mt-1">
                                                {item.variant}
                                            </p>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-[#A09AA8] hover:text-red-500 h-fit"
                                            title="Remove item"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                        <div>
                                            <span className="font-bold text-[#30283B]">
                                                {formatPrice(item.price)}
                                            </span>

                                            <span className="text-sm text-[#A09AA8] line-through ml-2">
                                                {formatPrice(item.oldPrice)}
                                            </span>
                                        </div>

                                        <div className="flex items-center border border-[#E9E0F5] rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                disabled={item.quantity <= 1}
                                                className="p-2 text-[#7652A5] disabled:opacity-30"
                                            >
                                                <FiMinus size={14} />
                                            </button>

                                            <span className="w-9 text-center text-sm font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                disabled={item.quantity >= 10}
                                                className="p-2 text-[#7652A5] disabled:opacity-30"
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white border border-[#E9E0F5] rounded-2xl p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-[#30283B] mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between text-[#77717F]">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-[#77717F]">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? "text-green-600" : ""}>
                                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                                    </span>
                                </div>

                                <div className="border-t border-dashed border-[#E9E0F5] pt-4 flex justify-between text-lg font-bold text-[#30283B]">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Link
                                to="/checkout"
                                className="mt-6 w-full bg-[#7652A5] text-white py-3.5 rounded-xl flex items-center justify-center font-semibold hover:bg-[#5E3F89] transition"
                            >
                                Proceed to Checkout
                            </Link>

                            <div className="mt-6 space-y-4 border-t border-[#F0EBF6] pt-5">
                                <div className="flex gap-3 items-center text-sm text-[#77717F]">
                                    <FiTruck className="text-[#7652A5] text-lg" />
                                    Free shipping on orders above ₹999
                                </div>

                                <div className="flex gap-3 items-center text-sm text-[#77717F]">
                                    <FiShield className="text-[#7652A5] text-lg" />
                                    Secure checkout experience
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
