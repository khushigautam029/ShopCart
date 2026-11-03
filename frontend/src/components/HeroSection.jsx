import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-[#081a3b]">

            {/* Decorative backgrounds */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#081a3b] via-[#103b8b] to-[#2563eb]" />

            <div className="absolute -right-20 top-0 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-3xl" />

            <div className="absolute -left-32 bottom-0 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative max-w-7xl mx-auto min-h-[430px] md:min-h-[500px] px-6 lg:px-12 flex items-center">

                {/* Hero text */}
                <div className="relative z-10 w-full md:w-1/2 py-16">

                    <span className="inline-block text-blue-300 font-semibold tracking-[3px] text-xs md:text-sm mb-6">
                        BIG SAVINGS. BIGGER SMILES.
                    </span>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.12]">
                        Shop Smart,
                        <span className="block text-blue-400">
                            Live Better.
                        </span>
                    </h1>

                    <p className="text-gray-300 text-sm md:text-base mt-6 max-w-md leading-7">
                        Discover premium quality products at unbeatable prices.
                        Explore the latest trends and make every purchase count.
                    </p>

                    <Link
                        to="/products"
                        className="inline-flex items-center gap-3 mt-8 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold text-sm shadow-lg shadow-blue-900/40 transition duration-300"
                    >
                        Shop Now
                        <FiArrowRight />
                    </Link>

                    <div className="flex items-center gap-2 mt-10">
                        <span className="w-7 h-2 rounded-full bg-blue-400" />
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                    </div>

                </div>

                {/* Hero image */}
                <div className="hidden md:flex absolute right-0 bottom-0 top-0 w-1/2 items-center justify-center">

                    <div className="absolute w-[420px] h-[420px] bg-blue-500/20 rounded-full blur-2xl" />

                    <img
                        src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1000"
                        alt="ShopCart shopping collection"
                        className="relative z-10 w-full h-full object-cover object-center"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-[#103b8b] via-transparent to-transparent" />

                </div>

                {/* Slider arrows - visual only for now */}
                <button
                    aria-label="Previous slide"
                    className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#07142b]/80 text-white p-3 rounded-full hover:bg-blue-600 transition"
                >
                    <FiChevronLeft size={22} />
                </button>

                <button
                    aria-label="Next slide"
                    className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#07142b]/80 text-white p-3 rounded-full hover:bg-blue-600 transition"
                >
                    <FiChevronRight size={22} />
                </button>

            </div>
        </section>
    );
};

export default HeroSection;
