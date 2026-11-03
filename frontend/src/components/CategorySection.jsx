
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { categories } from "../data/homeData";

const CategorySection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 md:py-16 bg-white overflow-hidden"
        >
            {/* Heading */}
            <div className={`flex items-end justify-between gap-4 mb-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
                <div>
                    <p className="text-[#7652A5] font-bold text-[10px] sm:text-xs tracking-[3px] uppercase">
                        Explore Collections
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#30283B] mt-3">
                        Shop By Category
                    </h2>

                    <p className="text-[#77717F] text-xs sm:text-sm mt-2">
                        Find everything you need in one place.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#7652A5] hover:text-[#5E3F89] group transition-colors shrink-0"
                >
                    View All Categories
                    <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
            </div>

            {/* Circular categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-8">
                {categories.map((category, index) => (
                    <Link
                        to={`/products?category=${encodeURIComponent(category.name)}`}
                        key={category.id}
                        style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
                        className={`group flex flex-col items-center text-center transition-all duration-700 ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        {/* Circle image */}
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full p-[5px] bg-gradient-to-br from-[#E9E0F5] via-[#C9B2E8] to-[#7652A5] shadow-md group-hover:shadow-xl group-hover:shadow-[#7652A5]/20 group-hover:-translate-y-2 transition-all duration-500">

                            <div className="w-full h-full rounded-full overflow-hidden bg-[#F8F6FB] border-[3px] border-white">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Arrow */}
                            <span className="absolute bottom-1 right-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#7652A5] text-white border-[3px] border-white shadow-md group-hover:bg-[#5E3F89] group-hover:rotate-45 transition-all duration-300">
                                <FiArrowUpRight size={17} />
                            </span>
                        </div>

                        {/* Category name */}
                        <h3 className="mt-4 text-sm sm:text-base font-bold text-[#30283B] group-hover:text-[#7652A5] transition-colors duration-300">
                            {category.name}
                        </h3>

                        <span className="w-0 h-[2px] bg-[#7652A5] mt-1.5 group-hover:w-10 transition-all duration-300 rounded-full" />
                    </Link>
                ))}
            </div>

            {/* Mobile view all */}
            <div className="sm:hidden flex justify-center mt-9">
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#7652A5] border border-[#E9E0F5] px-5 py-3 rounded-full hover:bg-[#7652A5] hover:text-white transition-all"
                >
                    View All Categories
                    <FiArrowUpRight />
                </Link>
            </div>
        </section>
    );
};

export default CategorySection;
