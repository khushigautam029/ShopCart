
import { useMemo, useState } from "react";
import {
    FiArrowRight,
    FiCalendar,
    FiCheck,
    FiChevronDown,
    FiChevronUp,
    FiPackage,
    FiSearch,
    FiShoppingBag,
    FiTruck
} from "react-icons/fi";
import { Link } from "react-router-dom";

const ORDER_STEPS = [
    "Placed",
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
];

const STATUS_MAP = {
    PLACED: 0,
    CONFIRMED: 1,
    PACKED: 2,
    SHIPPED: 3,
    OUT_FOR_DELIVERY: 4,
    DELIVERED: 5,
};

const getStatusIndex = (status) => {
    const normalized = String(status || "PLACED")
        .toUpperCase()
        .replaceAll(" ", "_");

    return STATUS_MAP[normalized] ?? 0;
};

const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const getPaymentLabel = (method) => {
    const methods = {
        COD: "Cash on Delivery",
        UPI: "UPI",
        CARD: "Credit / Debit Card",
        NET_BANKING: "Net Banking",
    };

    return methods[method] || method || "Not specified";
};

const getOrderItems = (order) => order.items || [];

const getOrderStatus = (order) =>
    order.status || order.orderStatus || "PLACED";

const TrackingTimeline = ({ status }) => {
    const currentStep = getStatusIndex(status);

    return (
        <div className="mt-5">
            <h4 className="mb-5 text-sm font-bold text-[#30283B]">
                Order Tracking
            </h4>

            <div className="relative">
                {ORDER_STEPS.map((step, index) => {
                    const completed = index <= currentStep;
                    const current = index === currentStep;

                    return (
                        <div key={step} className="relative flex gap-4 pb-5 last:pb-0">
                            {index !== ORDER_STEPS.length - 1 && (
                                <div
                                    className={`absolute left-[11px] top-6 h-full w-0.5 ${index < currentStep
                                            ? "bg-[#7652A5]"
                                            : "bg-[#E9E1F0]"
                                        }`}
                                />
                            )}

                            <div
                                className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${completed
                                        ? "border-[#7652A5] bg-[#7652A5] text-white"
                                        : "border-[#DDD5E6] bg-white text-transparent"
                                    }`}
                            >
                                {completed && <FiCheck size={13} />}
                            </div>

                            <div className="flex-1">
                                <p
                                    className={`text-sm ${current
                                            ? "font-bold text-[#7652A5]"
                                            : completed
                                                ? "font-semibold text-[#30283B]"
                                                : "text-[#A49DAD]"
                                        }`}
                                >
                                    {step}
                                    {current && (
                                        <span className="ml-2 rounded-full bg-[#F0E8F8] px-2 py-0.5 text-[10px] font-bold text-[#7652A5]">
                                            Current
                                        </span>
                                    )}
                                </p>

                                {current && (
                                    <p className="mt-1 text-xs text-[#77717F]">
                                        {step === "Delivered"
                                            ? "Your order has been delivered."
                                            : `Your order is currently ${step.toLowerCase()}.`}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const Order = () => {
    const [orders] = useState(() => {
        try {
            const savedOrders = JSON.parse(
                localStorage.getItem("shopcart_orders") || "[]"
            );

            return Array.isArray(savedOrders) ? savedOrders : [];
        } catch {
            return [];
        }
    });

    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [expandedOrder, setExpandedOrder] = useState(null);

    const filters = [
        "All",
        "Placed",
        "Confirmed",
        "Packed",
        "Shipped",
        "Out for Delivery",
        "Delivered",
    ];

    const filteredOrders = useMemo(() => {
        return [...orders]
            .sort(
                (a, b) =>
                    new Date(b.orderDate || b.createdAt || 0) -
                    new Date(a.orderDate || a.createdAt || 0)
            )
            .filter((order) => {
                const status = getOrderStatus(order)
                    .toUpperCase()
                    .replaceAll("_", " ");

                const matchesFilter =
                    activeFilter === "All" ||
                    status === activeFilter.toUpperCase();

                const searchText = search.toLowerCase().trim();

                const matchesSearch =
                    !searchText ||
                    String(order.orderId || "")
                        .toLowerCase()
                        .includes(searchText) ||
                    getOrderItems(order).some((item) =>
                        String(item.name || item.title || "")
                            .toLowerCase()
                            .includes(searchText)
                    );

                return matchesFilter && matchesSearch;
            });
    }, [orders, activeFilter, search]);

    const getOrderCount = (filter) => {
        if (filter === "All") return orders.length;

        return orders.filter(
            (order) =>
                getOrderStatus(order)
                    .toUpperCase()
                    .replaceAll("_", " ") === filter.toUpperCase()
        ).length;
    };

    const getTotalItems = (order) =>
        getOrderItems(order).reduce(
            (total, item) => total + Number(item.quantity || 1),
            0
        );

    return (
        <div className="min-h-screen w-full bg-[#FCFAFE]">

            {/* Page header */}
            <section className="border-b border-[#EEE8F5] bg-gradient-to-r from-[#F3ECFA] to-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="mb-1 text-xs text-[#8D7B9F]">
                            <Link to="/" className="hover:text-[#7652A5]">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="font-semibold text-[#7652A5]">
                                My Orders
                            </span>
                        </div>

                        <h1 className="text-2xl font-extrabold text-[#30283B] sm:text-3xl">
                            My Orders
                        </h1>

                        <p className="mt-1 text-sm text-[#77717F]">
                            View your purchases and track your deliveries.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-[#7652A5] shadow-sm">
                        <FiShoppingBag size={18} />
                        {orders.length} Orders
                    </div>
                </div>
            </section>

            <main className="w-full px-4 py-5 sm:px-6 lg:px-8">

                {/* Search */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <FiSearch
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B91A7]"
                            size={17}
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by order ID or product name..."
                            className="w-full rounded-lg border border-[#E9E1F0] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#7652A5] focus:ring-2 focus:ring-[#7652A5]/10"
                        />
                    </div>
                </div>

                {/* Status filters */}
                <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition ${activeFilter === filter
                                    ? "bg-[#7652A5] text-white"
                                    : "border border-[#E9E1F0] bg-white text-[#77717F] hover:border-[#C9B2E8] hover:text-[#7652A5]"
                                }`}
                        >
                            {filter}
                            <span
                                className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeFilter === filter
                                        ? "bg-white/20 text-white"
                                        : "bg-[#F3ECFA] text-[#7652A5]"
                                    }`}
                            >
                                {getOrderCount(filter)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Orders list */}
                {filteredOrders.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {filteredOrders.map((order) => {
                            const items = getOrderItems(order);
                            const status = getOrderStatus(order);
                            const statusLabel = status.replaceAll("_", " ");
                            const isExpanded = expandedOrder === order.orderId;

                            return (
                                <article
                                    key={order.orderId}
                                    className="overflow-hidden rounded-xl border border-[#EEE8F5] bg-white"
                                >
                                    {/* Order top information */}
                                    <div className="flex flex-col gap-3 border-b border-[#F0EBF5] bg-[#FCFAFE] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:items-center sm:gap-8">
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9992A4]">
                                                    Order ID
                                                </p>
                                                <p className="mt-1 text-xs font-bold text-[#30283B]">
                                                    #{order.orderId}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9992A4]">
                                                    Order Date
                                                </p>
                                                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#51475E]">
                                                    <FiCalendar size={12} />
                                                    {formatDate(order.orderDate || order.createdAt)}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9992A4]">
                                                    Total Items
                                                </p>
                                                <p className="mt-1 text-xs font-semibold text-[#51475E]">
                                                    {getTotalItems(order)} Items
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9992A4]">
                                                    Total Amount
                                                </p>
                                                <p className="mt-1 text-sm font-extrabold text-[#7652A5]">
                                                    {formatPrice(order.total)}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="w-fit rounded-full bg-[#F0E8F8] px-3 py-1.5 text-[10px] font-bold capitalize text-[#7652A5]">
                                            {statusLabel}
                                        </span>
                                    </div>

                                    {/* Product information */}
                                    <div className="p-4 sm:p-5">
                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                            <div className="flex min-w-0 flex-1 flex-col gap-3">
                                                {items.map((item, index) => (
                                                    <div
                                                        key={`${order.orderId}-${item.itemKey || item.id || index}`}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F8F6FB]">
                                                            <img
                                                                src={item.image || item.imageUrl}
                                                                alt={item.name || item.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <h3 className="truncate text-sm font-bold text-[#30283B]">
                                                                {item.name || item.title}
                                                            </h3>

                                                            <p className="mt-1 text-xs text-[#9992A4]">
                                                                Quantity: {item.quantity || 1}
                                                            </p>

                                                            <p className="mt-1 text-xs font-semibold text-[#7652A5]">
                                                                {formatPrice(item.price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                                                <button
                                                    onClick={() =>
                                                        setExpandedOrder(
                                                            isExpanded ? null : order.orderId
                                                        )
                                                    }
                                                    className="flex items-center justify-center gap-2 rounded-lg border border-[#E9E1F0] px-4 py-2.5 text-xs font-bold text-[#7652A5] hover:bg-[#F8F6FB]"
                                                >
                                                    {isExpanded ? "Hide Details" : "Track Order"}
                                                    {isExpanded ? (
                                                        <FiChevronUp size={15} />
                                                    ) : (
                                                        <FiChevronDown size={15} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Expanded tracking and details */}
                                        {isExpanded && (
                                            <div className="mt-5 grid grid-cols-1 gap-6 border-t border-[#F0EBF5] pt-5 lg:grid-cols-2">
                                                <TrackingTimeline status={status} />

                                                <div>
                                                    <h4 className="mb-3 text-sm font-bold text-[#30283B]">
                                                        Order Details
                                                    </h4>

                                                    <div className="rounded-lg bg-[#FCFAFE] p-4">
                                                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#7652A5]">
                                                            <FiTruck size={17} />
                                                            Delivery Information
                                                        </div>

                                                        <p className="text-xs font-bold text-[#30283B]">
                                                            {order.address?.name || "Delivery Address"}
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5 text-[#77717F]">
                                                            {order.address?.address || ""}
                                                            {order.address?.city
                                                                ? `, ${order.address.city}`
                                                                : ""}
                                                            {order.address?.state
                                                                ? `, ${order.address.state}`
                                                                : ""}
                                                            {order.address?.pincode
                                                                ? ` - ${order.address.pincode}`
                                                                : ""}
                                                        </p>

                                                        <div className="my-4 border-t border-[#EEE8F5]" />

                                                        <div className="flex justify-between gap-3 text-xs">
                                                            <span className="text-[#9992A4]">
                                                                Payment Method
                                                            </span>
                                                            <span className="text-right font-semibold text-[#30283B]">
                                                                {getPaymentLabel(order.paymentMethod)}
                                                            </span>
                                                        </div>

                                                        <div className="mt-3 flex justify-between gap-3 text-xs">
                                                            <span className="text-[#9992A4]">
                                                                Payment Status
                                                            </span>
                                                            <span className="font-semibold text-[#7652A5]">
                                                                {order.paymentStatus || (
                                                                    order.paymentMethod === "COD"
                                                                        ? "Pay on Delivery"
                                                                        : "Demo"
                                                                )}
                                                            </span>
                                                        </div>

                                                        <div className="mt-3 flex justify-between gap-3 text-xs">
                                                            <span className="text-[#9992A4]">
                                                                Shipping
                                                            </span>
                                                            <span className="font-semibold text-[#30283B]">
                                                                {formatPrice(order.shipping)}
                                                            </span>
                                                        </div>

                                                        <div className="mt-3 flex justify-between gap-3 text-xs">
                                                            <span className="text-[#9992A4]">
                                                                Discount
                                                            </span>
                                                            <span className="font-semibold text-[#30283B]">
                                                                {formatPrice(order.discount)}
                                                            </span>
                                                        </div>

                                                        <div className="mt-3 flex justify-between gap-3 border-t border-[#EEE8F5] pt-3 text-sm">
                                                            <span className="font-bold text-[#30283B]">
                                                                Total Paid / Payable
                                                            </span>
                                                            <span className="font-extrabold text-[#7652A5]">
                                                                {formatPrice(order.total)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-xl border border-[#EEE8F5] bg-white px-4 py-16 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3ECFA] text-[#7652A5]">
                            <FiPackage size={27} />
                        </div>

                        <h3 className="text-lg font-bold text-[#30283B]">
                            {orders.length === 0
                                ? "You haven't placed any orders yet"
                                : "No matching orders found"}
                        </h3>

                        <p className="mt-2 text-sm text-[#77717F]">
                            {orders.length === 0
                                ? "Your placed orders will appear here. Start shopping to see your order history."
                                : "Try changing your search or selecting another status."}
                        </p>

                        <Link
                            to="/products"
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#7652A5] px-5 py-3 text-sm font-bold text-white hover:bg-[#5E3F89]"
                        >
                            Explore Products
                            <FiArrowRight size={16} />
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Order;
