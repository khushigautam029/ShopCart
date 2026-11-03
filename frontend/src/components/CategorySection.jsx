import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { categories } from "../data/homeData";

const CategorySection = () => {
    return (
        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 md:py-20">

            <div className="flex items-end justify-between mb-9">

                <div>
                    <p className="text-[#7652A5] font-bold text-xs tracking-[3px] uppercase">
                        Explore Collections
                    </p>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#30283B] mt-3">
                        Shop By Category
                    </h2>

                    <p className="text-[#77717F] text-sm mt-3">
                        Find everything you need in one place.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89] hover:gap-3 transition-all"
                >
                    View All Categories <FiArrowUpRight />
                </Link>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

                {categories.map((category) => (
                    <Link
                        to={`/products?category=${encodeURIComponent(category.name)}`}
                        key={category.id}
                        className="group relative h-52 md:h-60 rounded-2xl overflow-hidden bg-[#7652A5] shadow-md hover:shadow-xl hover:shadow-[#7652A5]/20 transition duration-300"
                    >

                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-60 transition duration-700"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#30283B]/90 via-transparent to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">

                            <h3 className="text-white font-semibold text-sm md:text-base">
                                {category.name}
                            </h3>

                            <span className="bg-[#E9E0F5] text-[#7652A5] rounded-full p-2 group-hover:bg-white group-hover:text-[#5E3F89] transition">
                                <FiArrowUpRight />
                            </span>

                        </div>

                    </Link>
                ))}

            </div>
        </section>
    );
};

export default CategorySection;
