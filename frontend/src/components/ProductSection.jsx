import {
    FiArrowRight,
    FiHeart,
    FiShoppingCart,
    FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { trendingProducts } from "../data/homeData";

const ProductSection = () => {
    return (
        <section
            id="products"
            className="max-w-7xl mx-auto px-5 lg:px-8 pb-20"
        >

            <div className="flex items-end justify-between mb-9">

                <div>
                    <p className="text-[#7652A5] font-bold text-xs tracking-[3px] uppercase">
                        Handpicked for you
                    </p>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#30283B] mt-3">
                        Trending Products
                    </h2>

                    <p className="text-[#77717F] text-sm mt-3">
                        Explore our most popular picks.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89] hover:gap-3 transition-all"
                >
                    View All Products <FiArrowRight />
                </Link>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                {trendingProducts.map((product) => (

                    <div
                        key={product.id}
                        className="group bg-white border border-[#EEE8F5] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#7652A5]/10 transition duration-300"
                    >

                        {/* Product image */}
                        <div className="relative h-48 sm:h-60 md:h-72 bg-[#F8F6FB] overflow-hidden">

                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </Link>

                            <span className="absolute top-3 left-3 bg-[#7652A5] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                                -{product.discount}%
                            </span>

                            <button
                                aria-label="Add to wishlist"
                                className="absolute top-3 right-3 bg-white text-[#77717F] p-2.5 rounded-full shadow-sm hover:text-[#7652A5] hover:bg-[#E9E0F5] transition"
                            >
                                <FiHeart size={17} />
                            </button>

                        </div>

                        {/* Product information */}
                        <div className="p-3 md:p-4">

                            <p className="text-xs text-[#9992A4] font-medium">
                                {product.category}
                            </p>

                            <Link to={`/products/${product.id}`}>
                                <h3 className="font-bold text-[#30283B] text-sm md:text-base mt-1 truncate hover:text-[#7652A5] transition">
                                    {product.name}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-1 mt-2">
                                <FiStar className="text-amber-400 fill-amber-400" size={13} />
                                <span className="text-xs font-semibold text-[#55505D]">
                                    {product.rating}
                                </span>
                                <span className="text-xs text-[#9992A4]">
                                    (Customer rating)
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-3">

                                <span className="font-extrabold text-[#30283B] text-sm md:text-base">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>

                                <span className="text-[#9992A4] line-through text-xs">
                                    ₹{product.oldPrice.toLocaleString("en-IN")}
                                </span>

                            </div>

                            <button
                                className="w-full mt-4 bg-[#7652A5] hover:bg-[#5E3F89] text-white py-3 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition duration-300"
                            >
                                <FiShoppingCart size={16} />
                                Add to Cart
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default ProductSection;
