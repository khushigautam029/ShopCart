import { FiArrowRight, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

const PromotionalBanner = () => {
    return (
        <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-16">

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#243F37] via-[#477568] to-[#71988A] min-h-[300px] flex items-center">

                {/* Background decoration */}
                <div className="absolute -right-10 -top-32 w-96 h-96 rounded-full border-[50px] border-white/5" />

                <div className="absolute right-20 bottom-[-100px] w-72 h-72 rounded-full bg-[#F2B49A]/20 blur-3xl" />

                <div className="relative z-10 px-7 py-12 md:px-14 md:py-16 max-w-2xl">

                    <div className="flex items-center gap-2 text-[#F2B49A] text-xs font-bold uppercase tracking-[3px]">
                        <FiZap />
                        Limited Time Offer
                    </div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-5">
                        Flat <span className="text-[#F2B49A]">50% OFF</span>
                    </h2>

                    <p className="text-[#E5EAE5] text-sm md:text-base mt-4">
                        On your favourite fashion and lifestyle products.
                    </p>

                    <Link
                        to="/products?deals=true"
                        className="inline-flex items-center gap-3 bg-[#F6F3EC] text-[#365D52] hover:bg-[#D98968] hover:text-white px-7 py-3.5 rounded-full font-bold text-sm mt-7 transition"
                    >
                        Shop the Deal
                        <FiArrowRight />
                    </Link>

                </div>

                <div className="hidden md:block absolute right-10 lg:right-24 bottom-0 top-0 w-[38%]">

                    <img
                        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
                        alt="Special shopping offer"
                        className="w-full h-full object-cover rounded-l-[100px] opacity-90"
                    />

                </div>

            </div>

        </section>
    );
};

export default PromotionalBanner;
