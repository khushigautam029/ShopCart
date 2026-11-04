
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
    FiArrowLeft,
    FiArrowRight,
    FiHeart,
    FiMinus,
    FiPlus,
    FiRefreshCw,
    FiShield,
    FiShoppingCart,
    FiStar,
    FiTruck,
} from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";

import { addToRecentlyViewed } from "../../components/RecentlyViewed";
import { useCart } from "../../context/CartContext";
import { trendingProducts } from "../../data/homeData";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addToCart } = useCart();

    const product = useMemo(
        () =>
            trendingProducts.find(
                (item) => String(item.id) === String(id)
            ),
        [id]
    );

    const images = useMemo(() => {
        if (!product) return [];

        const productImages = product.images || [];

        const normalizedImages = productImages
            .map((image) =>
                typeof image === "string" ? image : image?.url
            )
            .filter(Boolean);

        const allImages = [
            product.image,
            ...normalizedImages,
        ].filter(Boolean);

        return [...new Set(allImages)];
    }, [product]);

    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (product) {
            addToRecentlyViewed(product);
            setSelectedImage(product.image || "");
            setQuantity(1);
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 text-center bg-[#FCFAFE]">
                <div className="w-20 h-20 rounded-full bg-[#F0E8F8] text-[#7652A5] flex items-center justify-center mb-5">
                    <FiShoppingCart size={30} />
                </div>

                <h1 className="text-2xl font-extrabold text-[#30283B]">
                    Product Not Found
                </h1>

                <p className="text-sm text-[#77717F] mt-2">
                    This product may have been removed or is unavailable.
                </p>

                <Link
                    to="/products"
                    className="mt-6 inline-flex items-center gap-2 bg-[#7652A5] hover:bg-[#5E3F89] text-white px-6 py-3 rounded-xl text-sm font-bold"
                >
                    <FiArrowLeft />
                    Explore Products
                </Link>
            </div>
        );
    }

    const category =
        typeof product.category === "string"
            ? product.category
            : product.category?.name || "General";

    const attributes = product.attributes
        ? Array.isArray(product.attributes)
            ? product.attributes
            : Object.entries(product.attributes).map(([name, value]) => ({
                name,
                value,
            }))
        : [];

    const availableStock =
        product.stock ?? product.availableStock ?? Infinity;

    const isOutOfStock = availableStock <= 0;

    const handleQuantity = (change) => {
        setQuantity((current) =>
            Math.min(
                availableStock,
                Math.max(1, current + change)
            )
        );
    };

    // Add product to the shared cart
    const handleAddToCart = () => {
        if (isOutOfStock) {
            toast.error("This product is currently out of stock.");
            return;
        }

        addToCart(product, quantity);

        toast.success(
            `${quantity} ${quantity === 1 ? "item" : "items"} added to cart!`
        );
    };

    // Add product and go directly to checkout
    const handleBuyNow = () => {
        if (isOutOfStock) {
            toast.error("This product is currently out of stock.");
            return;
        }

        addToCart(product, quantity);
        navigate("/checkout");
    };

    return (
        <div className="w-full bg-white">

            {/* Breadcrumb */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-3 bg-[#FCFAFE]">
                <div className="w-full flex items-center gap-2 text-xs sm:text-sm text-[#9992A4]">
                    <Link to="/" className="hover:text-[#7652A5]">
                        Home
                    </Link>

                    <FiArrowRight size={13} />

                    <Link to="/products" className="hover:text-[#7652A5]">
                        Products
                    </Link>

                    <FiArrowRight size={13} />

                    <span className="text-[#7652A5] font-semibold truncate">
                        {product.name}
                    </span>
                </div>
            </div>

            {/* Product Details */}
            <section className="w-full px-4 sm:px-6 lg:px-8 py-5 md:py-7">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

                    {/* Image Gallery */}
                    <div>
                        <div className="relative bg-[#F8F6FB] rounded-2xl overflow-hidden aspect-square max-h-[580px]">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-5 sm:p-8"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#9992A4]">
                                    Product image unavailable
                                </div>
                            )}

                            {product.discount > 0 && (
                                <span className="absolute top-4 left-4 bg-[#7652A5] text-white px-3 py-1.5 rounded-full text-xs font-bold">
                                    {product.discount}% OFF
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                aria-label="Toggle wishlist"
                                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${
                                    isWishlisted
                                        ? "bg-[#7652A5] text-white"
                                        : "bg-white text-[#7652A5] hover:bg-[#7652A5] hover:text-white"
                                }`}
                            >
                                <FiHeart
                                    size={19}
                                    className={isWishlisted ? "fill-current" : ""}
                                />
                            </button>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => setSelectedImage(image)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden bg-[#F8F6FB] border-2 transition-all ${
                                            selectedImage === image
                                                ? "border-[#7652A5]"
                                                : "border-transparent hover:border-[#C9B2E8]"
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm font-bold text-[#7652A5] uppercase tracking-wider">
                            {category}
                        </p>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#30283B] mt-2 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                            <div className="flex items-center gap-1 bg-[#FFF8E8] px-3 py-1.5 rounded-lg">
                                <FiStar
                                    size={15}
                                    className="fill-amber-400 text-amber-400"
                                />

                                <span className="text-sm font-bold text-[#51475E]">
                                    {product.rating || "Not rated"}
                                </span>
                            </div>

                            {product.reviewCount != null && (
                                <span className="text-sm text-[#77717F]">
                                    {product.reviewCount} customer reviews
                                </span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-center flex-wrap gap-3 mt-5">
                            <span className="text-3xl font-extrabold text-[#7652A5]">
                                ₹{Number(product.price).toLocaleString("en-IN")}
                            </span>

                            {product.oldPrice && (
                                <>
                                    <span className="text-lg text-[#A49DAD] line-through">
                                        ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                                    </span>

                                    {product.discount > 0 && (
                                        <span className="text-sm font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                                            Save {product.discount}%
                                        </span>
                                    )}
                                </>
                            )}
                        </div>

                        <p className="text-xs text-[#9992A4] mt-1">
                            Inclusive of all applicable taxes
                        </p>

                        <div className="w-full h-px bg-[#EEE8F5] my-5" />

                        {/* Description */}
                        <h2 className="text-base font-bold text-[#30283B] mb-2">
                            Product Description
                        </h2>

                        <p className="text-sm leading-6 text-[#77717F]">
                            {product.description ||
                                "Explore this product and discover its features and details. More product information will be available soon."}
                        </p>

                        {/* Attributes */}
                        {attributes.length > 0 && (
                            <div className="mt-5">
                                <h2 className="font-bold text-[#30283B] mb-3">
                                    Product Attributes
                                </h2>

                                <div className="border border-[#EEE8F5] rounded-xl overflow-hidden">
                                    {attributes.map((attribute, index) => (
                                        <div
                                            key={`${attribute.name}-${index}`}
                                            className={`grid grid-cols-2 gap-3 px-4 py-2.5 text-sm ${
                                                index % 2 === 0
                                                    ? "bg-[#FCFAFE]"
                                                    : "bg-white"
                                            }`}
                                        >
                                            <span className="text-[#77717F]">
                                                {attribute.name}
                                            </span>

                                            <span className="font-semibold text-[#30283B]">
                                                {attribute.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stock */}
                        <div className="mt-4">
                            {isOutOfStock ? (
                                <p className="text-sm font-semibold text-red-500">
                                    Currently out of stock
                                </p>
                            ) : (
                                <p className="text-sm font-semibold text-green-700">
                                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2" />
                                    In Stock
                                </p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="mt-4">
                            <p className="text-sm font-bold text-[#30283B] mb-2">
                                Quantity
                            </p>

                            <div className="inline-flex items-center border border-[#E9E1F0] rounded-xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => handleQuantity(-1)}
                                    disabled={quantity <= 1 || isOutOfStock}
                                    className="w-10 h-10 flex items-center justify-center text-[#7652A5] hover:bg-[#F3ECFA] disabled:opacity-40"
                                >
                                    <FiMinus />
                                </button>

                                <span className="w-12 text-center font-bold text-[#30283B]">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleQuantity(1)}
                                    disabled={quantity >= availableStock || isOutOfStock}
                                    className="w-10 h-10 flex items-center justify-center text-[#7652A5] hover:bg-[#F3ECFA] disabled:opacity-40"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>

                        {/* Purchase Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                className="flex items-center justify-center gap-2 bg-[#7652A5] hover:bg-[#5E3F89] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-all"
                            >
                                <FiShoppingCart size={18} />
                                Add to Cart
                            </button>

                            <button
                                type="button"
                                onClick={handleBuyNow}
                                disabled={isOutOfStock}
                                className="flex items-center justify-center gap-2 border-2 border-[#7652A5] text-[#7652A5] hover:bg-[#F3ECFA] disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed py-3.5 rounded-xl font-bold text-sm transition-all"
                            >
                                Buy Now
                                <FiArrowRight size={17} />
                            </button>
                        </div>

                        {/* Service Benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-[#EEE8F5]">
                            <div className="flex items-center gap-2">
                                <FiTruck className="text-[#7652A5]" size={20} />
                                <span className="text-xs font-semibold text-[#77717F]">
                                    Delivery Available
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FiShield className="text-[#7652A5]" size={20} />
                                <span className="text-xs font-semibold text-[#77717F]">
                                    Secure Payment
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <FiRefreshCw className="text-[#7652A5]" size={20} />
                                <span className="text-xs font-semibold text-[#77717F]">
                                    Easy Returns
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Information Tabs */}
            <section className="w-full px-4 sm:px-6 lg:px-8 pb-7">
                <div className="w-full border border-[#EEE8F5] rounded-xl overflow-hidden">
                    <div className="flex border-b border-[#EEE8F5] overflow-x-auto">
                        {[
                            { id: "description", label: "Description" },
                            { id: "attributes", label: "Specifications" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-5 py-3 text-sm font-bold whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? "text-[#7652A5] border-b-2 border-[#7652A5]"
                                        : "text-[#77717F] hover:text-[#7652A5]"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 sm:p-5">
                        {activeTab === "description" ? (
                            <div>
                                <h2 className="font-bold text-[#30283B] mb-2">
                                    About {product.name}
                                </h2>

                                <p className="text-sm text-[#77717F] leading-6">
                                    {product.description ||
                                        "Detailed product information will be available soon."}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="font-bold text-[#30283B] mb-3">
                                    Product Specifications
                                </h2>

                                {attributes.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {attributes.map((attribute, index) => (
                                            <div
                                                key={`${attribute.name}-${index}`}
                                                className="flex justify-between gap-3 bg-[#FCFAFE] rounded-lg px-4 py-3 text-sm"
                                            >
                                                <span className="text-[#77717F]">
                                                    {attribute.name}
                                                </span>

                                                <span className="font-semibold text-[#30283B] text-right">
                                                    {attribute.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[#77717F]">
                                        No additional specifications available for this product yet.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Recently Viewed */}
            <section className="w-full px-4 sm:px-6 lg:px-8 pb-7">
                <div className="w-full bg-[#F8F6FB] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#7652A5]">
                            Keep exploring
                        </p>

                        <h2 className="text-lg font-extrabold text-[#30283B] mt-1">
                            Your Shopping Journey
                        </h2>

                        <p className="text-sm text-[#77717F] mt-1">
                            Your recently viewed products are saved for your next visit.
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#7652A5]"
                    >
                        Explore More
                        <FiArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
