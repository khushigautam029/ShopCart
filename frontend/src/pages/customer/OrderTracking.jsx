import { useMemo } from "react";
import {
    FiArrowLeft,
    FiCalendar,
    FiCheck,
    FiClock,
    FiMapPin,
    FiPackage,
    FiShoppingBag,
    FiTruck,
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

const TRACKING_STEPS = [
    {
        status: "PLACED",
        label: "Order Placed",
        description: "Your order has been placed successfully.",
    },
    {
        status: "CONFIRMED",
        label: "Order Confirmed",
        description: "Your order has been confirmed.",
    },
    {
        status: "PACKED",
        label: "Order Packed",
        description: "Your items have been packed.",
    },
    {
        status: "SHIPPED",
        label: "Order Shipped",
        description: "Your order has been handed over to the courier.",
    },
    {
        status: "OUT_FOR_DELIVERY",
        label: "Out for Delivery",
        description: "Your order is on its way to your address.",
    },
    {
        status: "DELIVERED",
        label: "Delivered",
        description: "Your order has been delivered successfully.",
    },
];

const normalizeStatus = (status) =>
    String(status || "PLACED")
        .toUpperCase()
        .trim()
        .replaceAll(" ", "_")
        .replaceAll("-", "_");

const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Not available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const formatDateTime = (date) => {
    if (!date) return null;

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return null;
    }

    return parsedDate.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const OrderTracking = () => {
    const { orderId } = useParams();

    const order = useMemo(() => {
        try {
            const savedOrders = JSON.parse(
                localStorage.getItem("shopcart_orders") || "[]"
            );

            if (!Array.isArray(savedOrders)) return null;

            return savedOrders.find(
                (item) => String(item.orderId) === String(orderId)
            ) || null;
        } catch {
            return null;
        }
    }, [orderId]);

    if (!order) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FCFAFE] px-4 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0E8F8] text-[#7652A5]">
                    <FiPackage size={28} />
                </div>

                <h2 className="text-xl font-bold text-[#30283B]">
                    Order Not Found
                </h2>

                <p className="mt-2 text-sm text-[#77717F]">
                    We couldn't find an order with this order ID.
                </p>

                <Link
                    to="/orders"
                    className="mt-5 rounded-lg bg-[#7652A5] px-5 py-3 text-sm font-bold text-white hover:bg-[#5E3F89]"
                >
                    Back to My Orders
                </Link>
            </div>
        );
    }

    const currentStatus = normalizeStatus(order.status || order.orderStatus);
    const currentStepIndex = TRACKING_STEPS.findIndex(
        (step) => step.status === currentStatus
    );

    const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

    const statusHistory = Array.isArray(order.statusHistory)
        ? order.statusHistory
        : [];

    const getStepHistory = (status) =>
        statusHistory.find(
            (history) => normalizeStatus(history.status) === status
        );

    const shippingDetails = order.shippingDetails || {};

    const items = Array.isArray(order.items) ? order.items : [];

    return (
        <div className="min-h-screen w-full bg-[#FCFAFE]">

            {/* Header */}
            <section className="border-b border-[#EEE8F5] bg-gradient-to-r from-[#F3ECFA] to-white px-4 py-6 sm:px-6 lg:px-8">
                <Link
                    to="/orders"
                    className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89]"
                >
                    <FiArrowLeft size={16} />
                    Back to My Orders
                </Link>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#8D7B9F]">
                            ShopCart / My Orders / Track Order
                        </p>

                        <h1 className="mt-1 text-2xl font-extrabold text-[#30283B] sm:text-3xl">
                            Track Your Order
                        </h1>

                        <p className="mt-2 text-sm text-[#77717F]">
                            Order ID: <span className="font-bold text-[#7652A5]">#{order.orderId}</span>
                        </p>
                    </div>

                    <div className="w-fit rounded-full bg-[#F0E8F8] px-4 py-2 text-xs font-bold text-[#7652A5]">
                        {TRACKING_STEPS[activeIndex].label}
                    </div>
                </div>
            </section>

            <main className="w-full px-4 py-6 sm:px-6 lg:px-8">

                {/* Estimated delivery */}
                <section className="mb-5 rounded-xl border border-[#E9E0F5] bg-white p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0E8F8] text-[#7652A5]">
                                <FiTruck size={23} />
                            </div>

                            <div>
                                <p className="text-xs font-medium text-[#9992A4]">
                                    Estimated Delivery
                                </p>

                                <h2 className="mt-1 text-lg font-extrabold text-[#30283B]">
                                    {formatDate(order.estimatedDelivery)}
                                </h2>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#77717F]">
                            <FiCalendar className="text-[#7652A5]" size={16} />
                            Ordered on {formatDate(order.orderDate)}
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                    {/* Tracking timeline */}
                    <section className="rounded-xl border border-[#EEE8F5] bg-white p-5 sm:p-6 lg:col-span-2">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E8F8] text-[#7652A5]">
                                <FiPackage size={20} />
                            </div>

                            <div>
                                <h2 className="font-bold text-[#30283B]">
                                    Shipment Progress
                                </h2>
                                <p className="text-xs text-[#9992A4]">
                                    Follow your order from placement to delivery.
                                </p>
                            </div>
                        </div>

                        <div>
                            {TRACKING_STEPS.map((step, index) => {
                                const completed = index <= activeIndex;
                                const current = index === activeIndex;
                                const history = getStepHistory(step.status);

                                return (
                                    <div
                                        key={step.status}
                                        className="relative flex gap-4 pb-8 last:pb-0"
                                    >
                                        {index !== TRACKING_STEPS.length - 1 && (
                                            <div
                                                className={`absolute left-[15px] top-8 h-full w-0.5 ${
                                                    index < activeIndex
                                                        ? "bg-[#7652A5]"
                                                        : "bg-[#E9E1F0]"
                                                }`}
                                            />
                                        )}

                                        <div
                                            className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                                                completed
                                                    ? "border-[#7652A5] bg-[#7652A5] text-white"
                                                    : "border-[#DDD5E6] bg-white text-transparent"
                                            }`}
                                        >
                                            {completed ? (
                                                <FiCheck size={16} />
                                            ) : (
                                                <span className="h-2 w-2 rounded-full bg-[#DDD5E6]" />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1 pt-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3
                                                    className={`text-sm ${
                                                        current
                                                            ? "font-extrabold text-[#7652A5]"
                                                            : completed
                                                                ? "font-bold text-[#30283B]"
                                                                : "font-semibold text-[#A49DAD]"
                                                    }`}
                                                >
                                                    {step.label}
                                                </h3>

                                                {current && (
                                                    <span className="rounded-full bg-[#F0E8F8] px-2 py-1 text-[10px] font-bold text-[#7652A5]">
                                                        Current Status
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 text-xs text-[#77717F]">
                                                {history?.description || step.description}
                                            </p>

                                            {completed && (
                                                <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#7652A5]">
                                                    <FiClock size={12} />
                                                    {formatDateTime(history?.timestamp) ||
                                                        (step.status === "PLACED"
                                                            ? formatDateTime(order.orderDate)
                                                            : "Timestamp not available")}
                                                </p>
                                            )}

                                            {!completed && (
                                                <p className="mt-2 text-[11px] text-[#AAA3B1]">
                                                    Awaiting update
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Shipping information */}
                    <div className="space-y-5">

                        <section className="rounded-xl border border-[#EEE8F5] bg-white p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <FiTruck className="text-[#7652A5]" size={19} />
                                <h2 className="font-bold text-[#30283B]">
                                    Shipping Information
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-[#9992A4]">
                                        Courier Partner
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-[#30283B]">
                                        {shippingDetails.courier || "Not assigned yet"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#9992A4]">
                                        Tracking Number
                                    </p>
                                    <p className="mt-1 break-all text-sm font-semibold text-[#30283B]">
                                        {shippingDetails.trackingNumber || "Not available yet"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-[#9992A4]">
                                        Shipping Method
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-[#30283B]">
                                        {shippingDetails.shippingMethod || "Standard Delivery"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-xl border border-[#EEE8F5] bg-white p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <FiMapPin className="text-[#7652A5]" size={19} />
                                <h2 className="font-bold text-[#30283B]">
                                    Delivery Address
                                </h2>
                            </div>

                            <p className="text-sm font-bold text-[#30283B]">
                                {order.address?.name || "Customer"}
                            </p>

                            <p className="mt-2 text-xs leading-6 text-[#77717F]">
                                {order.address?.address || ""}
                                {order.address?.city ? `, ${order.address.city}` : ""}
                                {order.address?.state ? `, ${order.address.state}` : ""}
                                {order.address?.pincode ? ` - ${order.address.pincode}` : ""}
                            </p>

                            {order.address?.phone && (
                                <p className="mt-2 text-xs text-[#77717F]">
                                    Phone: {order.address.phone}
                                </p>
                            )}
                        </section>

                    </div>
                </div>

                {/* Ordered products */}
                <section className="mt-5 rounded-xl border border-[#EEE8F5] bg-white p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-2">
                        <FiShoppingBag className="text-[#7652A5]" size={19} />
                        <h2 className="font-bold text-[#30283B]">
                            Ordered Products
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div
                                key={item.itemKey || item.id || index}
                                className="flex items-center gap-3"
                            >
                                <img
                                    src={item.image || item.imageUrl}
                                    alt={item.name || item.title || "Product"}
                                    className="h-16 w-16 rounded-lg bg-[#F8F6FB] object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-sm font-bold text-[#30283B]">
                                        {item.name || item.title}
                                    </h3>

                                    <p className="mt-1 text-xs text-[#9992A4]">
                                        Quantity: {item.quantity || 1}
                                    </p>
                                </div>

                                <p className="shrink-0 text-sm font-bold text-[#7652A5]">
                                    {formatPrice(
                                        Number(item.price || 0) *
                                        Number(item.quantity || 1)
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 border-t border-[#EEE8F5] pt-4">
                        <div className="flex justify-between text-sm text-[#77717F]">
                            <span>Subtotal</span>
                            <span>{formatPrice(order.subtotal)}</span>
                        </div>

                        <div className="mt-2 flex justify-between text-sm text-[#77717F]">
                            <span>Shipping</span>
                            <span>{formatPrice(order.shipping)}</span>
                        </div>

                        <div className="mt-2 flex justify-between text-sm text-[#77717F]">
                            <span>Discount</span>
                            <span>-{formatPrice(order.discount)}</span>
                        </div>

                        <div className="mt-4 flex justify-between border-t border-dashed border-[#EEE8F5] pt-4">
                            <span className="font-bold text-[#30283B]">
                                Order Total
                            </span>
                            <span className="text-lg font-extrabold text-[#7652A5]">
                                {formatPrice(order.total)}
                            </span>
                        </div>
                    </div>
                </section>

                <div className="mt-5">
                    <Link
                        to="/orders"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#E9E1F0] bg-white px-5 py-3 text-sm font-bold text-[#7652A5] hover:bg-[#F8F6FB]"
                    >
                        <FiArrowLeft size={15} />
                        Back to My Orders
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default OrderTracking;