
import { useEffect } from "react";
import { FiCheckCircle, FiMapPin, FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const OrderSuccess = () => {
    const location = useLocation();
    const { clearCart } = useCart();

    const order = location.state?.order;

    useEffect(() => {
        if (order) {
            clearCart();
        }
    }, [order, clearCart]);

    if (!order) {
        return <Navigate to="/products" replace />;
    }

    const formatPrice = (price) =>
        `₹${Number(price || 0).toLocaleString("en-IN")}`;

    const paymentLabels = {
        COD: "Cash on Delivery",
        UPI: "UPI",
        CARD: "Credit / Debit Card",
    };

    const address = order.address;

    return (
        <div className="min-h-screen w-full bg-[#F8F6FB] px-4 py-8 sm:py-10">
            <div className="w-full max-w-5xl mx-auto">

                {/* Success Message */}
                <div className="bg-white border border-[#E9E0F5] rounded-2xl p-6 sm:p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <FiCheckCircle className="text-5xl text-green-600" />
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#30283B]">
                        Thank You for Your Order!
                    </h1>

                    <p className="text-[#77717F] mt-2">
                        Your demo order has been placed successfully.
                    </p>

                    <div className="mt-5 inline-block bg-[#F1EAF8] rounded-xl px-5 py-3">
                        <p className="text-xs text-[#77717F]">
                            Order ID
                        </p>
                        <p className="font-bold text-[#7652A5] mt-1">
                            {order.orderId}
                        </p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">

                    {/* Delivery Address */}
                    <div className="bg-white border border-[#E9E0F5] rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#F1EAF8] flex items-center justify-center text-[#7652A5]">
                                <FiMapPin size={20} />
                            </div>
                            <h2 className="font-bold text-lg text-[#30283B]">
                                Delivery Address
                            </h2>
                        </div>

                        <p className="font-semibold text-[#30283B]">
                            {address.name}
                        </p>
                        <p className="text-sm text-[#77717F] mt-1">
                            {address.address}
                        </p>
                        <p className="text-sm text-[#77717F]">
                            {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-[#77717F] mt-2">
                            Phone: {address.phone}
                        </p>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-white border border-[#E9E0F5] rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[#F1EAF8] flex items-center justify-center text-[#7652A5]">
                                <FiPackage size={20} />
                            </div>
                            <h2 className="font-bold text-lg text-[#30283B]">
                                Order Information
                            </h2>
                        </div>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between gap-3">
                                <span className="text-[#77717F]">Payment Method</span>
                                <span className="font-semibold text-[#30283B]">
                                    {paymentLabels[order.paymentMethod] || order.paymentMethod}
                                </span>
                            </div>

                            <div className="flex justify-between gap-3">
                                <span className="text-[#77717F]">Order Date</span>
                                <span className="font-semibold text-[#30283B]">
                                    {new Date(order.orderDate).toLocaleDateString("en-IN")}
                                </span>
                            </div>

                            <div className="flex justify-between gap-3">
                                <span className="text-[#77717F]">Order Status</span>
                                <span className="font-semibold text-green-600">
                                    Confirmed (Demo)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ordered Products */}
                <div className="bg-white border border-[#E9E0F5] rounded-2xl p-5 sm:p-6 mt-5">
                    <div className="flex items-center gap-3 mb-5">
                        <FiShoppingBag className="text-[#7652A5] text-xl" />
                        <h2 className="font-bold text-lg text-[#30283B]">
                            Ordered Products
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div
                                key={item.itemKey}
                                className="flex gap-4 items-center border-b border-[#F0EBF6] pb-4 last:border-0 last:pb-0"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-xl object-cover bg-[#F8F6FB]"
                                />

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-[#30283B]">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-[#77717F] mt-1">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="text-sm text-[#77717F]">
                                        Price: {formatPrice(item.price)}
                                    </p>
                                </div>

                                <p className="font-bold text-[#30283B]">
                                    {formatPrice(item.price * item.quantity)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Summary */}
                <div className="bg-white border border-[#E9E0F5] rounded-2xl p-5 sm:p-6 mt-5">
                    <h2 className="font-bold text-lg text-[#30283B] mb-4">
                        Payment Summary
                    </h2>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-[#77717F]">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.subtotal)}</span>
                        </div>

                        <div className="flex justify-between text-[#77717F]">
                            <span>Shipping</span>
                            <span>
                                {order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}
                            </span>
                        </div>

                        {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-{formatPrice(order.discount)}</span>
                            </div>
                        )}

                        <div className="border-t border-dashed border-[#E9E0F5] pt-4 flex justify-between text-lg font-bold text-[#30283B]">
                            <span>Total Amount</span>
                            <span>{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Continue Shopping */}
                <div className="flex justify-center mt-6">
                    <Link
                        to="/products"
                        className="bg-[#7652A5] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#5E3F89] transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
