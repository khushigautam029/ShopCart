import { FiArrowRight, FiTag, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";

const PromotionalBanner = () => {
    return (
        <section className="w-full px-3 sm:px-5 lg:px-6 py-5 md:py-7">
            <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[#30283B] via-[#5E3F89] to-[#7652A5] min-h-[230px] md:min-h-[250px] flex items-center shadow-lg shadow-[#7652A5]/10">

                {/* Background Decorations */}
                <div className="absolute -top-24 -right-12 w-60 h-60 rounded-full border-[30px] border-white/[0.06]" />

                <div className="absolute -bottom-32 left-1/3 w-72 h-72 rounded-full bg-[#C9B2E8]/10 blur-3xl" />

                <div className="absolute top-8 right-[35%] w-2 h-2 rounded-full bg-[#E9E0F5]/40" />

                {/* Content */}
                <div className="relative z-20 w-full md:w-[62%] px-5 py-7 sm:px-8 md:px-9 lg:px-11">

                    {/* Offer Label */}
                    <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-[#E9E0F5] px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-[1.5px]">
                        <FiZap size={12} />
                        Limited Time Offer
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white leading-tight mt-3">
                        Upgrade Your{" "}
                        <span className="text-[#E9E0F5]">
                            Style for Less.
                        </span>
                    </h2>

                    {/* Discount */}
                    <div className="flex items-center gap-2.5 mt-3">
                        <span className="text-4xl sm:text-5xl font-black text-white leading-none">
                            50%
                        </span>

                        <div className="flex flex-col">
                            <span className="text-[#E9E0F5] text-base font-extrabold">
                                OFF
                            </span>
                            <span className="text-white/70 text-[10px] sm:text-xs">
                                Selected products
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/75 text-xs sm:text-sm mt-3 max-w-md leading-5">
                        Discover amazing deals on your favourite fashion,
                        electronics and lifestyle products.
                    </p>

                    {/* CTA */}
                    <Link
                        to="/products?deals=true"
                        className="group inline-flex items-center justify-center gap-2 bg-white text-[#5E3F89] hover:bg-[#E9E0F5] px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm mt-4 transition-all duration-300 hover:shadow-md"
                    >
                        <FiTag size={14} />
                        Shop the Deal
                        <FiArrowRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>

                    <p className="text-white/50 text-[9px] sm:text-[10px] mt-2.5">
                        Don't miss out on these exclusive offers!
                    </p>
                </div>

                {/* Image Section */}
                <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[40%] lg:w-[38%]">

                    <div className="absolute inset-0 bg-gradient-to-r from-[#5E3F89] via-[#5E3F89]/20 to-transparent z-10" />

                    <img
                        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900"
                        alt="Exclusive shopping deals"
                        className="w-full h-full object-cover object-center opacity-85"
                    />

                    {/* Floating Discount Card */}
                    <div className="absolute z-20 right-5 lg:right-8 top-6 bg-white/95 backdrop-blur-md rounded-xl px-3 py-2.5 shadow-lg rotate-2">
                        <p className="text-[#77717F] text-[9px] font-bold uppercase tracking-wider">
                            Special Offer
                        </p>

                        <p className="text-[#7652A5] text-2xl font-black mt-0.5">
                            50% OFF
                        </p>

                        <p className="text-[#30283B] text-[10px] font-medium mt-0.5">
                            Shop more, save more!
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PromotionalBanner;
