import { useEffect, useState } from "react";
import {
    FiArrowLeft,
    FiCheckCircle,
    FiMessageSquare,
    FiStar,
} from "react-icons/fi";
import { Link, Navigate, useParams } from "react-router-dom";

const ORDERS_KEY = "shopcart_orders";
const REVIEWS_KEY = "shopcart_reviews";

const getProductId = (item) =>
    String(item.productId || item.id || item.product?.id || "");

const getProductImage = (item) =>
    item.image ||
    item.imageUrl ||
    item.product?.image ||
    item.product?.imageUrl ||
    item.images?.[0]?.url ||
    item.images?.[0] ||
    "";

const getProductName = (item) =>
    item.name || item.title || item.product?.name || "Product";

const getOrderStatus = (order) =>
    String(order?.status || order?.orderStatus || "PLACED")
        .toUpperCase()
        .replaceAll(" ", "_");

const Review = () => {
    const { orderId } = useParams();

    const [order, setOrder] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        try {
            const savedOrders = JSON.parse(
                localStorage.getItem(ORDERS_KEY) || "[]"
            );

            const savedReviews = JSON.parse(
                localStorage.getItem(REVIEWS_KEY) || "[]"
            );

            const selectedOrder = savedOrders.find(
                (item) => String(item.orderId) === String(orderId)
            );

            setOrder(selectedOrder || null);
            setReviews(Array.isArray(savedReviews) ? savedReviews : []);
        } catch (error) {
            console.error("Unable to load order reviews:", error);
            setOrder(null);
            setReviews([]);
        }
    }, [orderId]);

    const getReview = (item) => {
        const productId = getProductId(item);

        return reviews.find(
            (review) =>
                String(review.orderId) === String(orderId) &&
                String(review.productId) === productId
        );
    };

    const updateForm = (item, field, value) => {
        const productId = getProductId(item);

        setFormData((previous) => ({
            ...previous,
            [productId]: {
                rating: previous[productId]?.rating || 0,
                comment: previous[productId]?.comment || "",
                ...previous[productId],
                [field]: value,
            },
        }));
    };

    const submitReview = (item) => {
        const productId = getProductId(item);
        const currentForm = formData[productId] || {};
        const rating = Number(currentForm.rating);
        const comment = (currentForm.comment || "").trim();

        if (!rating) {
            alert("Please select a star rating.");
            return;
        }

        if (!comment) {
            alert("Please write your review.");
            return;
        }

        const newReview = {
            id: `${orderId}-${productId}-${Date.now()}`,
            orderId: String(orderId),
            productId,
            productName: getProductName(item),
            rating,
            comment,
            createdAt: new Date().toISOString(),
        };

        const updatedReviews = [...reviews, newReview];

        try {
            localStorage.setItem(
                REVIEWS_KEY,
                JSON.stringify(updatedReviews)
            );

            setReviews(updatedReviews);
        } catch (error) {
            console.error("Unable to save review:", error);
            alert("Unable to save your review. Please try again.");
        }
    };

    if (!order) {
        return <Navigate to="/orders" replace />;
    }

    if (getOrderStatus(order) !== "DELIVERED") {
        return <Navigate to="/orders" replace />;
    }

    const items = Array.isArray(order.items) ? order.items : [];

    return (
        <section className="w-full min-h-screen bg-[#F8F6FB] px-4 sm:px-7 md:px-12 lg:px-16 xl:px-24 py-6 sm:py-8">

            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                    <Link
                        to="/orders"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7652A5] hover:text-[#5E3F89] mb-3"
                    >
                        <FiArrowLeft size={14} />
                        Back to My Orders
                    </Link>

                    <h1 className="text-xl sm:text-2xl font-extrabold text-[#30283B]">
                        Rate & Review Your Products
                    </h1>

                    <p className="text-xs sm:text-sm text-[#77717F] mt-1">
                        Share your experience and help other shoppers.
                    </p>
                </div>

                <div className="bg-white border border-[#EEE8F5] rounded-lg px-3 py-2">
                    <p className="text-[10px] text-[#9992A4] uppercase font-semibold">
                        Order ID
                    </p>
                    <p className="text-xs font-bold text-[#7652A5]">
                        {order.orderId}
                    </p>
                </div>
            </div>

            {/* Delivered Message */}
            <div className="flex items-center gap-2 bg-[#EAF6EE] border border-[#D6EBDD] rounded-xl px-4 py-3 mb-5">
                <FiCheckCircle className="text-green-600 shrink-0" size={18} />
                <p className="text-xs sm:text-sm text-green-800 font-medium">
                    Your order has been delivered. You can now review your products.
                </p>
            </div>

            {/* Product Reviews */}
            <div className="space-y-4">
                {items.map((item, index) => {
                    const productId = getProductId(item);
                    const image = getProductImage(item);
                    const submittedReview = getReview(item);
                    const currentForm = formData[productId] || {};

                    return (
                        <div
                            key={item.itemKey || productId || index}
                            className="bg-white border border-[#EEE8F5] rounded-xl p-4 sm:p-5"
                        >
                            <div className="flex gap-3 sm:gap-4">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-[#F8F6FB]">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={getProductName(item)}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#9992A4]">
                                            No image
                                        </div>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h2 className="text-sm sm:text-base font-bold text-[#30283B]">
                                        {getProductName(item)}
                                    </h2>

                                    <p className="text-xs text-[#77717F] mt-1">
                                        Quantity: {item.quantity || 1}
                                    </p>

                                    {submittedReview && (
                                        <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                                            <FiCheckCircle size={12} />
                                            Review submitted
                                        </span>
                                    )}
                                </div>
                            </div>

                            {submittedReview ? (
                                <div className="mt-4 bg-[#F8F6FB] rounded-lg p-3">
                                    <div className="flex items-center gap-1 mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <FiStar
                                                key={i}
                                                size={15}
                                                className={
                                                    i < submittedReview.rating
                                                        ? "fill-[#E8B84A] text-[#E8B84A]"
                                                        : "text-[#D9D3E0]"
                                                }
                                            />
                                        ))}
                                        <span className="ml-1 text-xs font-bold text-[#30283B]">
                                            {submittedReview.rating}/5
                                        </span>
                                    </div>

                                    <p className="text-xs text-[#77717F] leading-5">
                                        {submittedReview.comment}
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-4 border-t border-[#F0ECF4] pt-4">
                                    <p className="text-xs font-bold text-[#30283B] mb-2">
                                        How would you rate this product?
                                    </p>

                                    <div className="flex items-center gap-1.5 mb-4">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() =>
                                                    updateForm(item, "rating", i + 1)
                                                }
                                                aria-label={`Rate ${i + 1} out of 5`}
                                                className="p-0.5 hover:scale-110 transition-transform"
                                            >
                                                <FiStar
                                                    size={25}
                                                    className={
                                                        i < (currentForm.rating || 0)
                                                            ? "fill-[#E8B84A] text-[#E8B84A]"
                                                            : "text-[#D9D3E0] hover:text-[#E8B84A]"
                                                    }
                                                />
                                            </button>
                                        ))}

                                        <span className="text-[11px] text-[#77717F] ml-2">
                                            {currentForm.rating
                                                ? `${currentForm.rating} out of 5`
                                                : "Select rating"}
                                        </span>
                                    </div>

                                    <label className="block text-xs font-bold text-[#30283B] mb-2">
                                        Write your review
                                    </label>

                                    <textarea
                                        rows={3}
                                        maxLength={1000}
                                        value={currentForm.comment || ""}
                                        onChange={(e) =>
                                            updateForm(item, "comment", e.target.value)
                                        }
                                        placeholder="What did you like or dislike about this product?"
                                        className="w-full resize-y rounded-lg border border-[#E8E0F0] bg-white px-3 py-2.5 text-xs text-[#30283B] outline-none focus:border-[#7652A5] focus:ring-2 focus:ring-[#7652A5]/10"
                                    />

                                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                                        <span className="text-[10px] text-[#9992A4]">
                                            {(currentForm.comment || "").length}/1000 characters
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => submitReview(item)}
                                            className="inline-flex items-center justify-center gap-2 bg-[#7652A5] hover:bg-[#5E3F89] text-white rounded-lg px-4 py-2 text-xs font-semibold transition-colors"
                                        >
                                            <FiMessageSquare size={14} />
                                            Submit Review
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {items.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center border border-[#EEE8F5]">
                    <p className="text-sm text-[#77717F]">
                        No products were found in this order.
                    </p>
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-center mt-6">
                <Link
                    to="/orders"
                    className="text-xs font-semibold text-[#7652A5] hover:text-[#5E3F89]"
                >
                    Return to My Orders
                </Link>
            </div>
        </section>
    );
};

export default Review;