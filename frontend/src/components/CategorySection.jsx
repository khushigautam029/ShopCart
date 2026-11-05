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
            { threshold: 0.1 }
        );

        const currentSection = sectionRef.current;

        if (currentSection) {
            observer.observe(currentSection);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full px-4 sm:px-7 lg:px-12 xl:px-16 2xl:px-20 py-7 md:py-9 bg-white overflow-hidden"
        >
            {/* Heading */}
            <div
                className={`flex items-end justify-between gap-3 mb-6 md:mb-7 transition-all duration-700 ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5"
                }`}
            >
                <div>
                    <p className="text-[#7652A5] font-bold text-[9px] sm:text-[10px] tracking-[2px] uppercase">
                        Explore Collections
                    </p>

                    <h2 className="text-xl sm:text-2xl lg:text-[27px] font-extrabold text-[#30283B] mt-1.5">
                        Shop By Category
                    </h2>

                    <p className="text-[#77717F] text-[11px] sm:text-xs mt-1">
                        Find everything you need in one place.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#7652A5] hover:text-[#5E3F89] group transition-colors shrink-0"
                >
                    View All Categories
                    <FiArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                </Link>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 sm:gap-x-6 lg:gap-x-8 gap-y-5 sm:gap-y-6">

                {categories.map((category, index) => (
                    <Link
                        to={`/products?category=${encodeURIComponent(category.name)}`}
                        key={category.id}
                        style={{
                            transitionDelay: isVisible
                                ? `${index * 90}ms`
                                : "0ms",
                        }}
                        className={`group flex flex-col items-center text-center transition-all duration-700 ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                        }`}
                    >
                        {/* Category Image */}
                        <div className="relative w-[88px] h-[88px] sm:w-[100px] sm:h-[100px] lg:w-[105px] lg:h-[105px] rounded-full p-[3px] bg-gradient-to-br from-[#E9E0F5] via-[#C9B2E8] to-[#7652A5] shadow-sm group-hover:shadow-lg group-hover:shadow-[#7652A5]/20 group-hover:-translate-y-1.5 transition-all duration-300">

                            <div className="w-full h-full rounded-full overflow-hidden bg-[#F8F6FB] border-2 border-white">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                />
                            </div>

                            {/* Arrow */}
                            <span className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-[#7652A5] text-white border-2 border-white shadow-sm group-hover:bg-[#5E3F89] group-hover:rotate-45 group-hover:scale-110 transition-all duration-300">
                                <FiArrowUpRight size={14} />
                            </span>
                        </div>

                        {/* Category Name */}
                        <h3 className="mt-2.5 text-[11px] sm:text-xs lg:text-sm font-bold text-[#30283B] group-hover:text-[#7652A5] transition-colors duration-300">
                            {category.name}
                        </h3>

                        {/* Hover Underline */}
                        <span className="w-0 h-[2px] bg-[#7652A5] mt-1 group-hover:w-7 transition-all duration-300 rounded-full" />
                    </Link>
                ))}
            </div>

            {/* Mobile View All */}
            <div
                className={`sm:hidden flex justify-center mt-6 transition-all duration-700 ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                }`}
            >
                <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#7652A5] border border-[#E9E0F5] px-4 py-2 rounded-lg hover:bg-[#7652A5] hover:text-white transition-all duration-300"
                >
                    View All Categories
                    <FiArrowUpRight size={14} />
                </Link>
            </div>
        </section>
    );
};

export default CategorySection;
