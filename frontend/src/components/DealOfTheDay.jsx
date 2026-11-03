
import { useEffect, useState } from "react";
import {
    FiArrowRight,
    FiClock,
    FiShoppingBag,
    FiZap,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { trendingProducts } from "../data/homeData";

const getTimeRemaining = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const difference = midnight - now;

    return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl w-14 h-14 sm:w-16 sm:h-16 shadow-sm">
        <span className="text-xl sm:text-2xl font-extrabold text-[#7652A5] tabular-nums">
            {String(value).padStart(2, "0")}
        </span>
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#9992A4]">
            {label}
        </span>
    </div>
);

const DealOfTheDay = () => {
    const product = trendingProducts?.[0];

    const [time, setTime] = useState(getTimeRemaining);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!product) return null;

    return (
        <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 md:py-16">
            <div className="flex items-center justify-between gap-3 mb-7">
                <div>
                    <p className="flex items-center gap-2 text-[#7652A5] text-[10px] sm:text-xs font-bold uppercase tracking-[2px]">
                        <FiZap />
                        Don't miss out
                    </p>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#30283B] mt-2">
                        Deal of the Day
                    </h2>

                    <p className="text-[#77717F] text-xs sm:text-sm mt-2">
                        An exciting deal picked just for you.
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-[#7652A5] text-sm font-semibold">
                    <FiClock />
                    Limited-time offer
                </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F8F6FB] via-[#E9E0F5] to-[#D9C8ED] border border-[#EEE8F5]">
                {/* Decorative circles */}
                <div className="absolute -top-28 -right-20 w-80 h-80 rounded-full border-[35px] border-white/30" />
                <div className="absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-white/30 blur-3xl" />

                <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-10 p-5 sm:p-8 lg:p-12">

                    {/* Product image */}
                    <Link
                        to={`/products/${product.id}`}
                        className="relative group order-1 md:order-2"
                    >
                        <div className="relative h-64 sm:h-80 lg:h-[360px] rounded-2xl overflow-hidden bg-white shadow-xl shadow-[#7652A5]/10">
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute top-4 left-4 bg-[#7652A5] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold shadow-lg">
                                {product.discount}% OFF
                            </div>
                        </div>

                        <div className="absolute -bottom-3 -right-2 sm:right-4 bg-white rounded-xl shadow-lg px-4 py-3">
                            <p className="text-[10px] text-[#9992A4] uppercase font-bold tracking-wider">
                                Today's special
                            </p>
                            <p className="text-lg font-extrabold text-[#7652A5]">
                                Special Price
                            </p>
                        </div>
                    </Link>

                    {/* Deal details */}
                    <div className="relative z-10 order-2 md:order-1">
                        <div className="inline-flex items-center gap-2 bg-white/70 text-[#7652A5] px-3 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                            <FiZap />
                            Featured Deal
                        </div>

                        <p className="text-[#77717F] text-xs sm:text-sm font-semibold uppercase tracking-wider mt-6">
                            {product.category}
                        </p>

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#30283B] mt-2 leading-tight">
                            {product.name}
                        </h3>

                        <p className="text-[#77717F] text-sm leading-6 mt-3 max-w-md">
                            Grab this special offer before the day ends.
                            Discover great value on one of our featured products.
                        </p>

                        {/* Price */}
                        <div className="flex items-center flex-wrap gap-3 mt-5">
                            <span className="text-2xl sm:text-3xl font-extrabold text-[#7652A5]">
                                ₹{product.price.toLocaleString("en-IN")}
                            </span>

                            <span className="text-sm text-[#9992A4] line-through">
                                ₹{product.oldPrice.toLocaleString("en-IN")}
                            </span>

                            <span className="bg-[#7652A5]/10 text-[#7652A5] px-3 py-1.5 rounded-full text-xs font-bold">
                                Save {product.discount}%
                            </span>
                        </div>

                        {/* Countdown */}
                        <div className="mt-7">
                            <p className="text-[#30283B] text-xs font-bold uppercase tracking-wider mb-3">
                                <FiClock className="inline mr-1.5 text-[#7652A5]" />
                                Offer ends in
                            </p>

                            <div className="flex items-center gap-2">
                                <TimeBox value={time.hours} label="Hours" />
                                <span className="text-[#7652A5] font-bold text-xl">:</span>
                                <TimeBox value={time.minutes} label="Mins" />
                                <span className="text-[#7652A5] font-bold text-xl">:</span>
                                <TimeBox value={time.seconds} label="Secs" />
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            to={`/products/${product.id}`}
                            className="group inline-flex items-center justify-center gap-3 mt-7 bg-[#7652A5] hover:bg-[#5E3F89] text-white px-7 py-3.5 rounded-full text-sm font-bold shadow-lg shadow-[#7652A5]/20 hover:-translate-y-1 transition-all duration-300"
                        >
                            <FiShoppingBag />
                            Shop This Deal
                            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;
