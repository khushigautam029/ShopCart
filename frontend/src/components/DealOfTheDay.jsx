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
    <div className="flex flex-col items-center justify-center bg-white rounded-lg w-11 h-11 sm:w-12 sm:h-12 shadow-sm">
        <span className="text-base sm:text-lg font-extrabold text-[#7652A5] tabular-nums">
            {String(value).padStart(2, "0")}
        </span>
        <span className="text-[8px] font-semibold uppercase tracking-wide text-[#9992A4]">
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
        <section className="w-full bg-white px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-28 py-6 sm:py-7 md:py-8 overflow-hidden">

            {/* Section Heading */}
            <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                    <p className="flex items-center gap-1.5 text-[#7652A5] text-[9px] sm:text-[10px] font-bold uppercase tracking-[2px]">
                        <FiZap size={13} />
                        Don't miss out
                    </p>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#30283B] mt-1">
                        Deal of the Day
                    </h2>

                    <p className="text-[#77717F] text-[11px] sm:text-xs mt-1">
                        An exciting deal picked just for you.
                    </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[#7652A5] text-xs font-semibold">
                    <FiClock size={14} />
                    Limited-time offer
                </div>
            </div>

            {/* Deal Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F8F6FB] via-[#E9E0F5] to-[#D9C8ED] border border-[#EEE8F5]">

                {/* Decorative Background */}
                <div className="absolute -top-24 -right-16 w-64 h-64 rounded-full border-[28px] border-white/30" />
                <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-white/30 blur-3xl" />

                <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-8 p-4 sm:p-6 lg:p-8">

                    {/* Product Image */}
                    <Link
                        to={`/products/${product.id}`}
                        className="relative group order-1 md:order-2"
                    >
                        <div className="relative h-48 sm:h-60 lg:h-[270px] rounded-xl overflow-hidden bg-white shadow-lg shadow-[#7652A5]/10">
                            <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute top-3 left-3 bg-[#7652A5] text-white px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold shadow-md">
                                {product.discount}% OFF
                            </div>
                        </div>

                        {/* Special Price Label */}
                        <div className="absolute -bottom-2 right-3 bg-white rounded-lg shadow-md px-3 py-2">
                            <p className="text-[9px] text-[#9992A4] uppercase font-bold tracking-wider">
                                Today's special
                            </p>
                            <p className="text-sm font-extrabold text-[#7652A5]">
                                Special Price
                            </p>
                        </div>
                    </Link>

                    {/* Deal Details */}
                    <div className="relative z-10 order-2 md:order-1">

                        <div className="inline-flex items-center gap-1.5 bg-white/70 text-[#7652A5] px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                            <FiZap size={12} />
                            Featured Deal
                        </div>

                        <p className="text-[#77717F] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-4">
                            {product.category}
                        </p>

                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#30283B] mt-1.5 leading-tight">
                            {product.name}
                        </h3>

                        <p className="text-[#77717F] text-xs sm:text-sm leading-5 mt-2 max-w-md">
                            Grab this special offer before the day ends.
                            Discover great value on one of our featured products.
                        </p>

                        {/* Price */}
                        <div className="flex items-center flex-wrap gap-2.5 mt-4">
                            <span className="text-xl sm:text-2xl font-extrabold text-[#7652A5]">
                                ₹{Number(product.price).toLocaleString("en-IN")}
                            </span>

                            <span className="text-xs text-[#9992A4] line-through">
                                ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                            </span>

                            <span className="bg-[#7652A5]/10 text-[#7652A5] px-2.5 py-1 rounded-full text-[10px] font-bold">
                                Save {product.discount}%
                            </span>
                        </div>

                        {/* Countdown */}
                        <div className="mt-5">
                            <p className="text-[#30283B] text-[10px] font-bold uppercase tracking-wider mb-2">
                                <FiClock className="inline mr-1 text-[#7652A5]" size={12} />
                                Offer ends in
                            </p>

                            <div className="flex items-center gap-1.5">
                                <TimeBox value={time.hours} label="Hours" />
                                <span className="text-[#7652A5] font-bold text-base">:</span>
                                <TimeBox value={time.minutes} label="Mins" />
                                <span className="text-[#7652A5] font-bold text-base">:</span>
                                <TimeBox value={time.seconds} label="Secs" />
                            </div>
                        </div>

                        {/* Shop Button */}
                        <Link
                            to={`/products/${product.id}`}
                            className="group inline-flex items-center justify-center gap-2 mt-5 bg-[#7652A5] hover:bg-[#5E3F89] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md shadow-[#7652A5]/20 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <FiShoppingBag size={14} />
                            Shop This Deal
                            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DealOfTheDay;