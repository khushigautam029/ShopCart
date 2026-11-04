
import { useEffect, useMemo, useState } from "react";
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
    FiTruck
} from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { addToRecentlyViewed } from "../../components/RecentlyViewed";
import { trendingProducts } from "../../data/homeData";

const ProductDetail = () => {
    const { id } = useParams();

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

    const handleQuantity = (change) => {
        setQuantity((current) => Math.max(1, current + change));
    };

    const handleAddToCart = () => {
        // Cart integration will be connected to your cart context/API.
        alert(`${quantity} item(s) selected. Cart functionality will be connected next.`);
    };

    const handleBuyNow = () => {
        // Checkout integration will be connected after cart functionality.
        alert("Buy Now functionality will be connected with checkout.");
    };

    return (
        <div className="w-full bg-white">

            {/* Breadcrumb */}
            <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-5 bg-[#FCFAFE]">
                <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs sm:text-sm text-[#9992A4]">
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

            {/* Product details */}
            <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 md:py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">

                    {/* Image gallery */}
                    <div>
                        <div className="relative bg-[#F8F6FB] rounded-3xl overflow-hidden aspect-square">
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
                                <span className="absolute top-5 left-5 bg-[#7652A5] text-white px-4 py-2 rounded-full text-xs font-bold">
                                    {product.discount}% OFF
                                </span>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                aria-label="Toggle wishlist"
                                className={`absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-colors ${
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
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                {images.map((image, index) => (
                                    <button
                                        key={`${image}-${index}`}
                                        type="button"
                                        onClick={() => setSelectedImage(image)}
                                        className={`w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-[#F8F6FB] border-2 transition-all ${
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

                    {/* Product information */}
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm font-bold text-[#7652A5] uppercase tracking-[2px]">
                            {category}
                        </p>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#30283B] mt-3 leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex flex-wrap items-center gap-3 mt-5">
                            <div className="flex items-center gap-1 bg-[#FFF8E8] px-3 py-2 rounded-lg">
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
                        <div className="flex items-center flex-wrap gap-3 mt-7">
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

                        <p className="text-xs text-[#9992A4] mt-2">
                            Inclusive of all applicable taxes
                        </p>

                        <div className="w-full h-px bg-[#EEE8F5] my-7" />

                        {/* Description */}
                        <h2 className="text-base font-bold text-[#30283B] mb-2">
                            Product Description
                        </h2>

                        <p className="text-sm leading-7 text-[#77717F]">
                            {product.description ||
                                "Explore this product and discover its features and details. More product information will be available soon."}
                        </p>

                        {/* Attributes */}
                        {attributes.length > 0 && (
                            <div className="mt-7">
                                <h2 className="font-bold text-[#30283B] mb-4">
                                    Product Attributes
                                </h2>

                                <div className="border border-[#EEE8F5] rounded-xl overflow-hidden">
                                    {attributes.map((attribute, index) => (
                                        <div
                                            key={`${attribute.name}-${index}`}
                                            className={`grid grid-cols-2 gap-3 px-4 py-3 text-sm ${
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

                        {/* Quantity */}
                        <div className="mt-7">
                            <p className="text-sm font-bold text-[#30283B] mb-3">
                                Quantity
                            </p>

                            <div className="inline-flex items-center border border-[#E9E1F0] rounded-xl overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => handleQuantity(-1)}
                                    disabled={quantity <= 1}
                                    className="w-11 h-11 flex items-center justify-center text-[#7652A5] hover:bg-[#F3ECFA] disabled:opacity-40"
                                >
                                    <FiMinus />
                                </button>

                                <span className="w-12 text-center font-bold text-[#30283B]">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleQuantity(1)}
                                    className="w-11 h-11 flex items-center justify-center text-[#7652A5] hover:bg-[#F3ECFA]"
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>

                        {/* Purchase buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="flex items-center justify-center gap-2 bg-[#7652A5] hover:bg-[#5E3F89] text-white py-4 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#7652A5]/20"
                            >
                                <FiShoppingCart size={18} />
                                Add to Cart
                            </button>

                            <button
                                type="button"
                                onClick={handleBuyNow}
                                className="flex items-center justify-center gap-2 border-2 border-[#7652A5] text-[#7652A5] hover:bg-[#F3ECFA] py-4 rounded-xl font-bold text-sm transition-all"
                            >
                                Buy Now
                                <FiArrowRight size={17} />
                            </button>
                        </div>

                        {/* Service benefits */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-7 border-t border-[#EEE8F5]">
                            <div className="flex items-center gap-3">
                                <FiTruck className="text-[#7652A5]" size={21} />
                                <span className="text-xs font-semibold text-[#77717F]">
                                    Delivery Available
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FiShield className="text-[#7652A5]" size={21} />
                                <span className="text-xs font-semibold text-[#77717F]">
                                    Secure Payment
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FiRefreshCw className="text-[#7652A5]" size={21} />
                                <span className="text-xs font-semibold text-[#77717F]">
                                    Easy Returns
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product information tabs */}
            <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-12">
                <div className="max-w-7xl mx-auto border border-[#EEE8F5] rounded-2xl overflow-hidden">
                    <div className="flex border-b border-[#EEE8F5] overflow-x-auto">
                        {[
                            { id: "description", label: "Description" },
                            { id: "attributes", label: "Specifications" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? "text-[#7652A5] border-b-2 border-[#7652A5]"
                                        : "text-[#77717F] hover:text-[#7652A5]"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-5 sm:p-7">
                        {activeTab === "description" ? (
                            <div>
                                <h2 className="font-bold text-[#30283B] mb-3">
                                    About {product.name}
                                </h2>

                                <p className="text-sm text-[#77717F] leading-7">
                                    {product.description ||
                                        "Detailed product information will be available soon."}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="font-bold text-[#30283B] mb-4">
                                    Product Specifications
                                </h2>

                                {attributes.length > 0 ? (
                                    <div className="grid sm:grid-cols-2 gap-3">
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

            {/* Recently viewed section */}
            <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-14">
                <div className="max-w-7xl mx-auto bg-[#F8F6FB] rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#7652A5]">
                                Keep exploring
                            </p>

                            <h2 className="text-xl sm:text-2xl font-extrabold text-[#30283B] mt-2">
                                Your Shopping Journey
                            </h2>

                            <p className="text-sm text-[#77717F] mt-2">
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
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
