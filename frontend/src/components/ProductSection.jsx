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
                    <p className="text-[#477568] font-bold text-xs tracking-[3px] uppercase">
                        Handpicked for you
                    </p>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#39372F] mt-3">
                        Trending Products
                    </h2>

                    <p className="text-[#77766F] text-sm mt-3">
                        Explore our most popular picks.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#477568] hover:text-[#365D52] hover:gap-3 transition-all"
                >
                    View All Products <FiArrowRight />
                </Link>

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                {trendingProducts.map((product) => (

                    <div
                        key={product.id}
                        className="group bg-white border border-[#E9E5DC] rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#365D52]/10 transition duration-300"
                    >

                        {/* Product image */}
                        <div className="relative h-48 sm:h-60 md:h-72 bg-[#F1F0E9] overflow-hidden">

                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                />
                            </Link>

                            <span className="absolute top-3 left-3 bg-[#D98968] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                                -{product.discount}%
                            </span>

                            <button
                                aria-label="Add to wishlist"
                                className="absolute top-3 right-3 bg-white text-[#77766F] p-2.5 rounded-full shadow-sm hover:text-[#D98968] hover:bg-[#F6F3EC] transition"
                            >
                                <FiHeart size={17} />
                            </button>

                        </div>

                        {/* Product information */}
                        <div className="p-3 md:p-4">

                            <p className="text-xs text-[#99958C] font-medium">
                                {product.category}
                            </p>

                            <Link to={`/products/${product.id}`}>
                                <h3 className="font-bold text-[#39372F] text-sm md:text-base mt-1 truncate hover:text-[#477568] transition">
                                    {product.name}
                                </h3>
                            </Link>

                            <div className="flex items-center gap-1 mt-2">
                                <FiStar className="text-amber-400 fill-amber-400" size={13} />
                                <span className="text-xs font-semibold text-[#55534C]">
                                    {product.rating}
                                </span>
                                <span className="text-xs text-[#99958C]">
                                    (Customer rating)
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 mt-3">

                                <span className="font-extrabold text-[#39372F] text-sm md:text-base">
                                    ₹{product.price.toLocaleString("en-IN")}
                                </span>

                                <span className="text-[#99958C] line-through text-xs">
                                    ₹{product.oldPrice.toLocaleString("en-IN")}
                                </span>

                            </div>

                            <button
                                className="w-full mt-4 bg-[#477568] hover:bg-[#365D52] text-white py-3 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition duration-300"
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