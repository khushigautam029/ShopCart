import {
    FiArrowRight,
    FiHeart,
    FiShoppingCart,
    FiStar,
    FiTrendingUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { trendingProducts } from "../data/homeData";

const ProductSection = () => {
    return (
        <section
            id="products"
            className="w-full px-3 sm:px-5 lg:px-7 py-7 md:py-9 bg-white"
        >
            {/* Section Heading */}
            <div className="flex items-end justify-between gap-3 mb-5 md:mb-6 animate-[fadeUp_0.6s_ease-out_both]">
                <div>
                    <div className="inline-flex items-center gap-1.5 text-[#7652A5] font-bold text-[9px] sm:text-[10px] tracking-[1.8px] uppercase">
                        <FiTrendingUp size={13} />
                        Handpicked for you
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-[27px] font-extrabold text-[#30283B] mt-1.5">
                        Trending Products
                    </h2>

                    <p className="text-[#77717F] text-[11px] sm:text-xs mt-1">
                        Discover products everyone is loving right now.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#7652A5] hover:text-[#5E3F89] transition-colors group shrink-0"
                >
                    View All Products
                    <FiArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3.5 lg:gap-4">

                {trendingProducts.map((product, index) => (
                    <div
                        key={product.id}
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                        className="group relative bg-white border border-[#EEE8F5] rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#C9B2E8] hover:shadow-lg hover:shadow-[#7652A5]/10 hover:-translate-y-1 transition-all duration-300 animate-[fadeUp_0.55s_ease-out_both]"
                    >
                        {/* Product Image */}
                        <div className="relative aspect-[4/4.3] bg-[#F8F6FB] overflow-hidden">

                            <Link
                                to={`/products/${product.id}`}
                                className="block w-full h-full"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                            </Link>

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#30283B]/10 via-transparent to-transparent pointer-events-none" />

                            {/* Discount Badge */}
                            <div className="absolute top-2 left-2 bg-[#7652A5] text-white text-[8px] sm:text-[10px] font-extrabold px-2 py-1 rounded-md shadow-sm">
                                {product.discount}% OFF
                            </div>

                            {/* Wishlist Button */}
                            <button
                                type="button"
                                aria-label={`Add ${product.name} to wishlist`}
                                className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-white/95 text-[#77717F] shadow-sm hover:bg-[#7652A5] hover:text-white hover:scale-110 active:scale-90 transition-all duration-200"
                            >
                                <FiHeart size={14} />
                            </button>

                            {/* Quick View */}
                            <Link
                                to={`/products/${product.id}`}
                                className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm text-[#5E3F89] text-[10px] sm:text-xs font-bold py-2 rounded-lg text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden sm:block"
                            >
                                View Product
                            </Link>
                        </div>

                        {/* Product Information */}
                        <div className="p-2.5 sm:p-3">

                            <p className="text-[9px] sm:text-[10px] text-[#9992A4] font-semibold uppercase tracking-wider truncate">
                                {product.category}
                            </p>

                            <Link to={`/products/${product.id}`}>
                                <h3 className="text-[11px] sm:text-xs lg:text-sm font-bold text-[#30283B] mt-1 truncate group-hover:text-[#7652A5] transition-colors">
                                    {product.name}
                                </h3>
                            </Link>

                            {/* Rating */}
                            <div className="flex items-center gap-1.5 mt-2">
                                <div className="flex items-center gap-1 bg-[#FFF8E8] px-1.5 py-0.5 rounded">
                                    <FiStar
                                        className="text-amber-500 fill-amber-500"
                                        size={10}
                                    />
                                    <span className="text-[9px] sm:text-[10px] font-bold text-[#55505D]">
                                        {product.rating}
                                    </span>
                                </div>

                                <span className="text-[9px] text-[#9992A4]">
                                    Rating
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                <span className="font-extrabold text-[#30283B] text-xs sm:text-sm">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>

                                <span className="text-[#A49DAD] line-through text-[9px] sm:text-[10px]">
                                    ₹{product.oldPrice.toLocaleString("en-IN")}
                                </span>
                            </div>

                            {/* Add to Cart */}
                            <button
                                type="button"
                                className="w-full mt-3 bg-[#7652A5] hover:bg-[#5E3F89] active:scale-[0.97] text-white py-2 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-md hover:shadow-[#7652A5]/20"
                            >
                                <FiShoppingCart size={13} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile View All */}
            <div className="sm:hidden flex justify-center mt-5">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 border border-[#7652A5] text-[#7652A5] hover:bg-[#7652A5] hover:text-white px-5 py-2 rounded-lg text-[11px] font-bold transition-all duration-300"
                >
                    View All Products
                    <FiArrowRight size={13} />
                </Link>
            </div>
        </section>
    );
};

export default ProductSection;
