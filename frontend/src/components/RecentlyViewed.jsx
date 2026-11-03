
import { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiClock,
    FiStar,
    FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const STORAGE_KEY = "recentlyViewedProducts";
const MAX_PRODUCTS = 8;

// Save a product when a customer visits its details page
export const addToRecentlyViewed = (product) => {
    if (!product?.id) return;

    try {
        const storedProducts = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        // Remove the product if it already exists
        const updatedProducts = storedProducts.filter(
            (item) => String(item.id) !== String(product.id)
        );

        // Add the latest viewed product at the beginning
        updatedProducts.unshift(product);

        // Keep only the latest 8 products
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedProducts.slice(0, MAX_PRODUCTS))
        );
    } catch (error) {
        console.error("Unable to save recently viewed product:", error);
    }
};

const RecentlyViewed = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            const storedProducts = JSON.parse(
                localStorage.getItem(STORAGE_KEY) || "[]"
            );

            setProducts(
                Array.isArray(storedProducts) ? storedProducts : []
            );
        } catch (error) {
            console.error("Unable to load recently viewed products:", error);
            setProducts([]);
        }
    }, []);

    const removeProduct = (productId) => {
        const updatedProducts = products.filter(
            (product) => String(product.id) !== String(productId)
        );

        setProducts(updatedProducts);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedProducts)
        );
    };

    const clearHistory = () => {
        localStorage.removeItem(STORAGE_KEY);
        setProducts([]);
    };

    if (products.length === 0) return null;

    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 md:py-16 bg-white">

            {/* Section Heading */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-7">

                <div>
                    <div className="flex items-center gap-2 text-[#7652A5] mb-2">
                        <FiClock size={17} />
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
                            Your browsing history
                        </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-[#30283B]">
                        Continue Where You Left Off
                    </h2>

                    <p className="text-sm text-[#77717F] mt-2">
                        Pick up where your shopping journey stopped.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={clearHistory}
                        className="text-sm text-[#77717F] hover:text-red-500 transition-colors"
                    >
                        Clear history
                    </button>

                    <Link
                        to="/products"
                        className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89] transition-colors"
                    >
                        View All
                        <FiArrowRight />
                    </Link>
                </div>
            </div>

            {/* Recently Viewed Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">

                {products.map((product) => {
                    const image =
                        product.image ||
                        product.imageUrl ||
                        product.images?.[0]?.url ||
                        product.images?.[0] ||
                        "";

                    return (
                        <div
                            key={product.id}
                            className="group relative bg-white rounded-2xl border border-[#EEE9F4] overflow-hidden hover:shadow-lg hover:shadow-purple-100/60 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => removeProduct(product.id)}
                                aria-label="Remove from recently viewed"
                                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 text-[#77717F] flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                <FiX size={15} />
                            </button>

                            {/* Product Image */}
                            <Link
                                to={`/products/${product.id}`}
                                className="block overflow-hidden bg-[#F8F6FB] aspect-[4/4.5]"
                            >
                                {image ? (
                                    <img
                                        src={image}
                                        alt={product.name || "Product"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-sm text-[#77717F]">
                                        No image available
                                    </div>
                                )}
                            </Link>

                            {/* Product Details */}
                            <div className="p-3 sm:p-4">

                                {product.category && (
                                    <p className="text-xs text-[#9B8DAA] mb-1">
                                        {typeof product.category === "string"
                                            ? product.category
                                            : product.category.name}
                                    </p>
                                )}

                                <Link to={`/products/${product.id}`}>
                                    <h3 className="font-semibold text-sm sm:text-base text-[#30283B] truncate hover:text-[#7652A5] transition-colors">
                                        {product.name || product.title}
                                    </h3>
                                </Link>

                                {product.rating && (
                                    <div className="flex items-center gap-1 mt-2 text-xs text-[#77717F]">
                                        <FiStar
                                            size={13}
                                            className="fill-[#E8B84A] text-[#E8B84A]"
                                        />
                                        {product.rating}
                                    </div>
                                )}

                                <div className="flex items-center gap-2 mt-3 flex-wrap">
                                    <span className="font-bold text-[#7652A5]">
                                        ₹{Number(product.price).toLocaleString("en-IN")}
                                    </span>

                                    {product.oldPrice && (
                                        <span className="text-xs text-[#9B94A2] line-through">
                                            ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                                        </span>
                                    )}
                                </div>

                                <Link
                                    to={`/products/${product.id}`}
                                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#E9E0F5] text-[#7652A5] text-sm font-semibold hover:bg-[#7652A5] hover:text-white transition-all duration-300"
                                >
                                    View Product
                                    <FiArrowRight size={15} />
                                </Link>
                            </div>
                        </div>
                    );
                })}

            </div>

            <Link
                to="/products"
                className="sm:hidden flex items-center justify-center gap-2 mt-6 text-sm font-semibold text-[#7652A5]"
            >
                View All Products
                <FiArrowRight />
            </Link>

        </section>
    );
};

export default RecentlyViewed;
