
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
            className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 md:py-16 bg-white"
        >
            {/* Section heading */}
            <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
                <div>
                    <div className="inline-flex items-center gap-2 text-[#7652A5] font-bold text-[10px] sm:text-xs tracking-[2.5px] uppercase">
                        <FiTrendingUp size={15} />
                        Handpicked for you
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#30283B] mt-3">
                        Trending Products
                    </h2>

                    <p className="text-[#77717F] text-xs sm:text-sm mt-2">
                        Discover products everyone is loving right now.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-[#7652A5] hover:text-[#5E3F89] transition-all group shrink-0"
                >
                    View All Products
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
                {trendingProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group relative bg-white border border-[#EEE8F5] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[#C9B2E8] hover:shadow-xl hover:shadow-[#7652A5]/10 transition-all duration-300"
                    >
                        {/* Product image */}
                        <div className="relative aspect-[4/4.5] bg-[#F8F6FB] overflow-hidden">
                            <Link
                                to={`/products/${product.id}`}
                                className="block w-full h-full"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </Link>

                            {/* Image overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#30283B]/10 via-transparent to-transparent pointer-events-none" />

                            {/* Discount badge */}
                            <div className="absolute top-3 left-3 bg-[#7652A5] text-white text-[9px] sm:text-[11px] font-extrabold px-2.5 sm:px-3 py-1.5 rounded-full shadow-md">
                                {product.discount}% OFF
                            </div>

                            {/* Wishlist button */}
                            <button
                                type="button"
                                aria-label={`Add ${product.name} to wishlist`}
                                className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/95 backdrop-blur-sm text-[#77717F] shadow-md hover:bg-[#7652A5] hover:text-white transition-all duration-300"
                            >
                                <FiHeart size={16} />
                            </button>

                            {/* Quick view link */}
                            <Link
                                to={`/products/${product.id}`}
                                className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm text-[#5E3F89] text-xs sm:text-sm font-bold py-2.5 rounded-xl text-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden sm:block"
                            >
                                View Product
                            </Link>
                        </div>

                        {/* Product information */}
                        <div className="p-3 sm:p-4 lg:p-5">
                            <p className="text-[10px] sm:text-xs text-[#9992A4] font-semibold uppercase tracking-wider truncate">
                                {product.category}
                            </p>

                            <Link to={`/products/${product.id}`}>
                                <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#30283B] mt-1.5 truncate group-hover:text-[#7652A5] transition-colors">
                                    {product.name}
                                </h3>
                            </Link>

                            {/* Rating */}
                            <div className="flex items-center gap-1.5 mt-2.5">
                                <div className="flex items-center gap-1 bg-[#FFF8E8] px-2 py-1 rounded-md">
                                    <FiStar
                                        className="text-amber-500 fill-amber-500"
                                        size={11}
                                    />
                                    <span className="text-[10px] sm:text-xs font-bold text-[#55505D]">
                                        {product.rating}
                                    </span>
                                </div>

                                <span className="text-[10px] sm:text-xs text-[#9992A4]">
                                    Customer rating
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex flex-wrap items-center gap-2 mt-3">
                                <span className="font-extrabold text-[#30283B] text-sm sm:text-base lg:text-lg">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>

                                <span className="text-[#A49DAD] line-through text-[10px] sm:text-xs">
                                    ₹{product.oldPrice.toLocaleString("en-IN")}
                                </span>
                            </div>

                            {/* Add to cart */}
                            <button
                                type="button"
                                className="w-full mt-4 bg-[#7652A5] hover:bg-[#5E3F89] active:scale-[0.98] text-white py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-[#7652A5]/20"
                            >
                                <FiShoppingCart size={15} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile view all button */}
            <div className="sm:hidden flex justify-center mt-7">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 border border-[#7652A5] text-[#7652A5] hover:bg-[#7652A5] hover:text-white px-6 py-3 rounded-full text-xs font-bold transition-all"
                >
                    View All Products
                    <FiArrowRight />
                </Link>
            </div>
        </section>
    );
};

export default ProductSection;
