
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCreditCard,
  FiMapPin,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiSmartphone,
  FiTag,
  FiTruck,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const initialAddresses = [
    {
        id: 1,
        name: "Khushi Gautam",
        phone: "9876543210",
        address: "House No. 24, Vaishali Nagar",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302021",
        type: "Home",
    },
    {
        id: 2,
        name: "Khushi Gautam",
        phone: "9876543210",
        address: "Flat No. 302, Malviya Nagar",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302017",
        type: "Work",
    },
];

const Checkout = () => {
    const navigate = useNavigate();

    const { cartItems, subtotal } = useCart();

    const [addresses, setAddresses] = useState(initialAddresses);
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const [newAddress, setNewAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        type: "Home",
    });

    const [couponInput, setCouponInput] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const shipping = subtotal >= 999 ? 0 : 79;

    // Calculate discount from the current cart subtotal.
    const discount =
        appliedCoupon === "SHOP10"
            ? Math.min(subtotal * 0.1, 500)
            : 0;

    const total = subtotal - discount + shipping;

    const formatPrice = (price) =>
        `₹${Number(price || 0).toLocaleString("en-IN")}`;

    const applyCoupon = () => {
        const code = couponInput.trim().toUpperCase();

        if (!code) {
            toast.error("Please enter a coupon code");
            return;
        }

        if (code === "SHOP10") {
            setAppliedCoupon(code);
            setCouponInput(code);
            toast.success("Coupon applied successfully!");
        } else {
            toast.error("Invalid coupon code");
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon("");
        setCouponInput("");
        toast.success("Coupon removed");
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setNewAddress((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const saveAddress = (e) => {
        e.preventDefault();

        const address = {
            ...newAddress,
            id: Date.now(),
        };

        setAddresses((previous) => [...previous, address]);
        setSelectedAddress(address.id);
        setShowAddressForm(false);

        setNewAddress({
            name: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            type: "Home",
        });

        toast.success("Address added successfully");
    };

    const placeOrder = () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            navigate("/cart");
            return;
        }

        const deliveryAddress = addresses.find(
            (address) => address.id === selectedAddress
        );

        if (!deliveryAddress) {
            toast.error("Please select a delivery address");
            return;
        }

        // Demo order details are passed to the success page.
        const orderDetails = {
            orderId: `SC${Date.now()}`,
            items: cartItems,
            address: deliveryAddress,
            paymentMethod,
            subtotal,
            shipping,
            discount,
            total,
            orderDate: new Date().toISOString(),
        };

        navigate("/order-success", {
            state: { order: orderDetails },
        });
    };

    const inputClass =
        "w-full border border-[#E9E0F5] rounded-xl px-4 py-3 text-sm text-[#30283B] outline-none focus:border-[#7652A5] focus:ring-2 focus:ring-[#E9E0F5]";

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center bg-[#F8F6FB]">
                <FiShoppingBag className="text-5xl text-[#7652A5] mb-4" />
                <h2 className="text-2xl font-bold text-[#30283B]">
                    Your cart is empty
                </h2>
                <p className="text-[#77717F] mt-2 mb-5">
                    Add products before proceeding to checkout.
                </p>
                <Link
                    to="/products"
                    className="bg-[#7652A5] text-white px-6 py-3 rounded-xl"
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
                    to="/cart"
                    className="inline-flex items-center gap-2 text-[#7652A5] hover:text-[#5E3F89] mb-5"
                >
                    <FiArrowLeft />
                    Back to Cart
                </Link>

                <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#30283B]">
                        Checkout
                    </h1>
                    <p className="text-[#77717F] mt-2">
                        Complete your order by providing the details below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Left: Checkout Details */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Delivery Address */}
                        <section className="bg-white border border-[#E9E0F5] rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center justify-between gap-3 mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-[#F1EAF8] flex items-center justify-center text-[#7652A5]">
                                        <FiMapPin size={20} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-lg text-[#30283B]">
                                            Delivery Address
                                        </h2>
                                        <p className="text-xs text-[#77717F]">
                                            Select where you want your order delivered.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                    className="flex items-center gap-1 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89]"
                                >
                                    <FiPlus />
                                    Add New
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {addresses.map((address) => (
                                    <button
                                        key={address.id}
                                        type="button"
                                        onClick={() => setSelectedAddress(address.id)}
                                        className={`text-left border rounded-xl p-4 transition ${
                                            selectedAddress === address.id
                                                ? "border-[#7652A5] bg-[#F8F5FC] ring-1 ring-[#7652A5]"
                                                : "border-[#E9E0F5] hover:border-[#C9B2E8]"
                                        }`}
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-semibold text-[#30283B]">
                                                {address.type}
                                            </span>

                                            {selectedAddress === address.id && (
                                                <FiCheckCircle className="text-[#7652A5]" />
                                            )}
                                        </div>

                                        <p className="font-medium text-sm text-[#30283B]">
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
                                    </button>
                                ))}
                            </div>

                            {showAddressForm && (
                                <form
                                    onSubmit={saveAddress}
                                    className="mt-6 border-t border-[#E9E0F5] pt-5"
                                >
                                    <h3 className="font-semibold text-[#30283B] mb-4">
                                        Add Delivery Address
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            name="name"
                                            value={newAddress.name}
                                            onChange={handleAddressChange}
                                            placeholder="Full Name"
                                            className={inputClass}
                                            required
                                        />

                                        <input
                                            name="phone"
                                            value={newAddress.phone}
                                            onChange={handleAddressChange}
                                            placeholder="Phone Number"
                                            type="tel"
                                            pattern="[0-9]{10}"
                                            className={inputClass}
                                            required
                                        />

                                        <input
                                            name="address"
                                            value={newAddress.address}
                                            onChange={handleAddressChange}
                                            placeholder="House No., Street, Area"
                                            className={`${inputClass} sm:col-span-2`}
                                            required
                                        />

                                        <input
                                            name="city"
                                            value={newAddress.city}
                                            onChange={handleAddressChange}
                                            placeholder="City"
                                            className={inputClass}
                                            required
                                        />

                                        <input
                                            name="state"
                                            value={newAddress.state}
                                            onChange={handleAddressChange}
                                            placeholder="State"
                                            className={inputClass}
                                            required
                                        />

                                        <input
                                            name="pincode"
                                            value={newAddress.pincode}
                                            onChange={handleAddressChange}
                                            placeholder="PIN Code"
                                            pattern="[0-9]{6}"
                                            className={inputClass}
                                            required
                                        />

                                        <select
                                            name="type"
                                            value={newAddress.type}
                                            onChange={handleAddressChange}
                                            className={inputClass}
                                        >
                                            <option value="Home">Home</option>
                                            <option value="Work">Work</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            type="submit"
                                            className="bg-[#7652A5] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5E3F89]"
                                        >
                                            Save Address
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setShowAddressForm(false)}
                                            className="border border-[#E9E0F5] text-[#77717F] px-5 py-2.5 rounded-xl text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </section>

                        {/* Payment Method */}
                        <section className="bg-white border border-[#E9E0F5] rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-[#F1EAF8] flex items-center justify-center text-[#7652A5]">
                                    <FiCreditCard size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-[#30283B]">
                                        Payment Method
                                    </h2>
                                    <p className="text-xs text-[#77717F]">
                                        Choose your preferred payment option.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    {
                                        value: "COD",
                                        title: "Cash on Delivery",
                                        description: "Pay when your order arrives.",
                                        icon: <FiTruck />,
                                    },
                                    {
                                        value: "UPI",
                                        title: "UPI",
                                        description: "Google Pay, PhonePe, Paytm, etc.",
                                        icon: <FiSmartphone />,
                                    },
                                    {
                                        value: "CARD",
                                        title: "Credit / Debit Card",
                                        description: "Visa, Mastercard and more.",
                                        icon: <FiCreditCard />,
                                    },
                                ].map((method) => (
                                    <label
                                        key={method.value}
                                        className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition ${
                                            paymentMethod === method.value
                                                ? "border-[#7652A5] bg-[#F8F5FC]"
                                                : "border-[#E9E0F5]"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value={method.value}
                                            checked={paymentMethod === method.value}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="accent-[#7652A5]"
                                        />
                                        <span className="text-[#7652A5] text-xl">
                                            {method.icon}
                                        </span>
                                        <div>
                                            <p className="font-semibold text-sm text-[#30283B]">
                                                {method.title}
                                            </p>
                                            <p className="text-xs text-[#77717F]">
                                                {method.description}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>

                        {/* Coupon */}
                        <section className="bg-white border border-[#E9E0F5] rounded-2xl p-5 sm:p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#F1EAF8] flex items-center justify-center text-[#7652A5]">
                                    <FiTag size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg text-[#30283B]">
                                        Apply Coupon
                                    </h2>
                                    <p className="text-xs text-[#77717F]">
                                        Have a discount code? Apply it here.
                                    </p>
                                </div>
                            </div>

                            {appliedCoupon ? (
                                <div className="flex items-center justify-between gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                                    <div>
                                        <p className="text-sm font-semibold text-green-700">
                                            {appliedCoupon} applied!
                                        </p>
                                        <p className="text-xs text-green-600 mt-1">
                                            You saved {formatPrice(discount)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={removeCoupon}
                                        className="text-sm text-red-500 font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className={inputClass}
                                    />

                                    <button
                                        onClick={applyCoupon}
                                        className="bg-[#7652A5] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#5E3F89] transition"
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}

                            <p className="text-xs text-[#A09AA8] mt-3">
                                Demo coupon: SHOP10 (10% off, maximum ₹500).
                            </p>
                        </section>
                    </div>

                    {/* Right: Order Summary */}
                    <div>
                        <div className="bg-white border border-[#E9E0F5] rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24">
                            <h2 className="text-xl font-bold text-[#30283B] mb-5">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-5">
                                {cartItems.map((item) => (
                                    <div key={item.itemKey} className="flex gap-3">
                                        <div className="relative shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-xl object-cover bg-[#F8F6FB]"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-[#7652A5] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-[#30283B] line-clamp-2">
                                                {item.name}
                                            </p>
                                            <p className="text-sm font-semibold text-[#30283B] mt-1">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[#E9E0F5] pt-4 space-y-3 text-sm">
                                <div className="flex justify-between text-[#77717F]">
                                    <span>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-[#77717F]">
                                    <span>Shipping</span>
                                    <span className="text-green-600">
                                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                                    </span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Coupon Discount</span>
                                        <span>-{formatPrice(discount)}</span>
                                    </div>
                                )}

                                <div className="border-t border-dashed border-[#E9E0F5] pt-4 flex justify-between text-lg font-bold text-[#30283B]">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <button
                                onClick={placeOrder}
                                className="w-full mt-6 bg-[#7652A5] text-white py-3.5 rounded-xl font-semibold hover:bg-[#5E3F89] transition flex items-center justify-center gap-2"
                            >
                                <FiShoppingBag />
                                Place Order
                            </button>

                            <div className="flex gap-2 items-start mt-5 text-xs text-[#77717F]">
                                <FiShield className="text-[#7652A5] text-base shrink-0" />
                                <p>This is a demo checkout. No real payment or order is created.</p>
                            </div>

                            <Link
                                to="/cart"
                                className="block text-center text-sm text-[#7652A5] font-medium mt-5 hover:text-[#5E3F89]"
                            >
                                Return to Cart
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
