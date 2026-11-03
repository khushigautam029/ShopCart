
import { FiArrowRight, FiTag, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

const PromotionalBanner = () => {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#30283B] via-[#5E3F89] to-[#7652A5] min-h-[340px] md:min-h-[390px] flex items-center shadow-xl shadow-[#7652A5]/15">

                {/* Background decorations */}
                <div className="absolute -top-32 -right-20 w-80 h-80 rounded-full border-[45px] border-white/[0.06]" />

                <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#C9B2E8]/15 blur-3xl" />

                <div className="absolute top-10 right-[35%] w-3 h-3 rounded-full bg-[#E9E0F5]/40" />
                <div className="absolute bottom-16 left-[45%] w-2 h-2 rounded-full bg-white/40" />

                {/* Content */}
                <div className="relative z-10 w-full md:w-[58%] px-6 py-12 sm:px-10 md:px-12 lg:px-16">

                    {/* Offer label */}
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm text-[#E9E0F5] px-4 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[2px]">
                        <FiZap className="text-[#E9E0F5] text-sm" />
                        Limited Time Offer
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mt-6">
                        Upgrade Your
                        <span className="block text-[#E9E0F5] mt-1">
                            Style for Less.
                        </span>
                    </h2>

                    {/* Discount */}
                    <div className="flex items-center gap-3 mt-5">
                        <span className="text-5xl sm:text-6xl font-black text-white">
                            50%
                        </span>

                        <div className="flex flex-col">
                            <span className="text-[#E9E0F5] text-xl font-extrabold tracking-wide">
                                OFF
                            </span>
                            <span className="text-white/70 text-xs font-medium">
                                Selected products
                            </span>
                        </div>
                    </div>

                    <p className="text-white/75 text-sm sm:text-base mt-4 max-w-md leading-relaxed">
                        Discover amazing deals on your favourite fashion,
                        electronics and lifestyle products.
                    </p>

                    {/* CTA */}
                    <Link
                        to="/products?deals=true"
                        className="group inline-flex items-center justify-center gap-3 bg-white text-[#5E3F89] hover:bg-[#E9E0F5] px-7 py-3.5 rounded-full font-bold text-sm mt-7 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 hover:-translate-y-1"
                    >
                        <FiTag className="text-base" />
                        Shop the Deal
                        <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <p className="text-white/50 text-[10px] sm:text-xs mt-4">
                        Don't miss out on these exclusive offers!
                    </p>
                </div>

                {/* Image section */}
                <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[42%] lg:w-[40%]">

                    <div className="absolute inset-0 bg-gradient-to-r from-[#5E3F89] via-transparent to-transparent z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
                        alt="Exclusive shopping deals"
                        className="w-full h-full object-cover object-center opacity-90"
                    />

                    {/* Floating discount card */}
                    <div className="absolute z-20 right-6 lg:right-10 top-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl rotate-3">
                        <p className="text-[#77717F] text-[10px] font-bold uppercase tracking-wider">
                            Special Offer
                        </p>
                        <p className="text-[#7652A5] text-3xl font-black mt-1">
                            50% OFF
                        </p>
                        <p className="text-[#30283B] text-xs font-medium mt-1">
                            Shop more, save more!
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PromotionalBanner;