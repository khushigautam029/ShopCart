
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
import { useCart } from "../../context/CartContext";

const Cart = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
    } = useCart();

    const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
    const total = subtotal + shipping;

    const formatPrice = (price) =>
        `₹${Number(price || 0).toLocaleString("en-IN")}`;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 text-center bg-[#F8F6FB]">
                <div className="w-24 h-24 rounded-full bg-[#F1EAF8] flex items-center justify-center mb-5">
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
        <div className="min-h-screen w-full bg-[#F8F6FB] py-6 sm:py-8">
            <div className="w-full px-4 sm:px-6 lg:px-8">

                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-[#7652A5] hover:text-[#5E3F89] mb-5"
                >
                    <FiArrowLeft />
                    Continue Shopping
                </Link>

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-[#30283B]">
                        Shopping Cart
                    </h1>
                    <p className="text-[#77717F] mt-1">
                        You have {totalItems} item(s) in your cart.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">

                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg text-[#30283B]">
                                Cart Items
                            </h2>

                            <button
                                onClick={clearCart}
                                className="text-sm text-red-500 hover:text-red-700"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {cartItems.map((item) => (
                            <div
                                key={item.itemKey}
                                className="bg-white rounded-2xl border border-[#E9E0F5] p-4 flex flex-col sm:flex-row gap-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full sm:w-32 h-36 sm:h-32 object-cover rounded-xl bg-[#F8F6FB]"
                                />

                                <div className="flex-1 flex flex-col justify-between gap-4">

                                    <div className="flex justify-between gap-3">
                                        <div>
                                            {item.category && (
                                                <p className="text-xs text-[#7652A5] font-medium mb-1">
                                                    {item.category}
                                                </p>
                                            )}

                                            <h3 className="font-semibold text-[#30283B]">
                                                {item.name}
                                            </h3>

                                            {item.variantId && (
                                                <p className="text-sm text-[#77717F] mt-1">
                                                    Variant: {item.variantId}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.itemKey)}
                                            className="text-[#A09AA8] hover:text-red-500 h-fit"
                                            title="Remove item"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                        <span className="font-bold text-[#30283B]">
                                            {formatPrice(item.price)}
                                        </span>

                                        <div className="flex items-center border border-[#E9E0F5] rounded-lg">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.itemKey,
                                                        item.quantity - 1
                                                    )
                                                }
                                                disabled={item.quantity <= 1}
                                                className="p-2 text-[#7652A5] disabled:opacity-30"
                                            >
                                                <FiMinus size={14} />
                                            </button>

                                            <span className="w-9 text-center text-sm font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.itemKey,
                                                        item.quantity + 1
                                                    )
                                                }
                                                disabled={item.quantity >= item.stock}
                                                className="p-2 text-[#7652A5] disabled:opacity-30"
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-sm text-[#77717F]">
                                        Item total: {formatPrice(item.price * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="bg-white border border-[#E9E0F5] rounded-2xl p-5 sm:p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-[#30283B] mb-5">
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
