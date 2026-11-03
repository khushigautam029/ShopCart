
import { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const slides = [
    {
        tag: "BIG SAVINGS. BIGGER SMILES.",
        title: "Shop Smart,",
        highlight: "Live Better.",
        description:
            "Discover premium quality products at unbeatable prices. Explore the latest trends and make every purchase count.",
        buttonText: "Shop Now",
        link: "/products",
        image:
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1000",
        imageAlt: "Shopping collection",
    },
    {
        tag: "FRESH STYLES. NEW POSSIBILITIES.",
        title: "Find Your",
        highlight: "Perfect Style.",
        description:
            "Explore the latest fashion trends and discover products that match your personality and lifestyle.",
        buttonText: "Explore Fashion",
        link: "/products?category=Fashion",
        image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000",
        imageAlt: "Fashion store collection",
    },
    {
        tag: "UPGRADE YOUR EVERYDAY.",
        title: "Everything You",
        highlight: "Need, In One Place.",
        description:
            "From everyday essentials to your favourite lifestyle products, find everything you love at ShopCart.",
        buttonText: "Explore Products",
        link: "/products",
        image:
            "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1000",
        imageAlt: "Online shopping products",
    },
    {
        tag: "GREAT DEALS. GREAT CHOICES.",
        title: "More Shopping,",
        highlight: "More Savings.",
        description:
            "Enjoy exciting offers on selected products and bring home your favourites for less.",
        buttonText: "Discover Deals",
        link: "/products?deals=true",
        image:
            "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1000",
        imageAlt: "Shopping offers and discounts",
    },
];

const HeroSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentSlide = slides[activeSlide];

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
    };

    const previousSlide = () => {
        setActiveSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <section
            className="relative w-full overflow-hidden bg-[#30283B]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#30283B] via-[#5E3F89] to-[#7652A5]" />

            <div className="absolute -right-32 -top-40 w-96 h-96 rounded-full bg-[#E9E0F5]/15 blur-3xl" />

            <div className="absolute -left-32 -bottom-40 w-96 h-96 rounded-full bg-[#C9B2E8]/15 blur-3xl" />

            {/* Main content */}
            <div className="relative max-w-[1600px] mx-auto min-h-[340px] sm:min-h-[370px] lg:min-h-[410px] flex items-center px-5 sm:px-10 lg:px-16 xl:px-24">

                {/* Text content */}
                <div
                    key={`content-${activeSlide}`}
                    className="relative z-10 w-full md:w-[52%] py-10 sm:py-12 lg:py-14 animate-slide-up"
                >
                    <span className="inline-flex items-center gap-2 text-[#E9E0F5] font-bold tracking-[2px] text-[10px] sm:text-xs mb-4">
                        <span className="w-7 h-[2px] bg-[#C9B2E8]" />
                        {currentSlide.tag}
                    </span>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.12] max-w-xl">
                        {currentSlide.title}
                        <span className="block text-[#E9E0F5] mt-1">
                            {currentSlide.highlight}
                        </span>
                    </h1>

                    <p className="text-white/75 text-xs sm:text-sm lg:text-base mt-4 max-w-md leading-6 sm:leading-7">
                        {currentSlide.description}
                    </p>

                    <Link
                        to={currentSlide.link}
                        className="group inline-flex items-center gap-3 mt-6 bg-white hover:bg-[#E9E0F5] text-[#5E3F89] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-black/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        {currentSlide.buttonText}
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Slide indicators */}
                    <div className="flex items-center gap-2 mt-7">
                        {slides.map((slide, index) => (
                            <button
                                key={slide.tag}
                                type="button"
                                onClick={() => setActiveSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={activeSlide === index}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    activeSlide === index
                                        ? "w-8 bg-white"
                                        : "w-2 bg-white/40 hover:bg-white/70"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Hero image */}
                <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-[48%] items-center justify-center p-5 lg:p-7">
                    <div className="absolute right-10 w-[320px] h-[320px] lg:w-[380px] lg:h-[380px] rounded-full bg-[#E9E0F5]/20 blur-3xl" />

                    <img
                        key={`image-${activeSlide}`}
                        src={currentSlide.image}
                        alt={currentSlide.imageAlt}
                        className="relative z-10 w-full h-full max-h-[360px] object-cover rounded-2xl lg:rounded-3xl shadow-2xl shadow-black/20 animate-fade-in"
                    />

                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#5E3F89] via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Previous button */}
                <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                    className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white/15 border border-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-[#7652A5] transition-all duration-300"
                >
                    <FiChevronLeft size={21} />
                </button>

                {/* Next button */}
                <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="hidden lg:flex absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center bg-white/15 border border-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-[#7652A5] transition-all duration-300"
                >
                    <FiChevronRight size={21} />
                </button>

                {/* Mobile navigation */}
                <div className="md:hidden absolute bottom-4 right-5 flex items-center gap-2 z-20">
                    <button
                        type="button"
                        onClick={previousSlide}
                        aria-label="Previous slide"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 border border-white/20 text-white"
                    >
                        <FiChevronLeft size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next slide"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 border border-white/20 text-white"
                    >
                        <FiChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
