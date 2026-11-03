
import {
    FiHeadphones,
    FiRefreshCw,
    FiShield,
    FiTruck,
} from "react-icons/fi";

const services = [
    {
        icon: FiTruck,
        title: "Free Shipping",
        description: "On orders above ₹999",
    },
    {
        icon: FiShield,
        title: "Secure Payment",
        description: "100% secure checkout",
    },
    {
        icon: FiRefreshCw,
        title: "Easy Returns",
        description: "Within 30 days",
    },
    {
        icon: FiHeadphones,
        title: "24/7 Support",
        description: "We're here to help",
    },
];

const ServiceHighlights = () => {
    return (
        <section className="w-full px-0 py-0">

            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-y-4 bg-[#7652A5] px-4 sm:px-6 py-5 sm:py-6">

                {services.map((service, index) => {
                    const Icon = service.icon;

                    return (
                        <div
                            key={service.title}
                            className={`flex items-center justify-center gap-3 ${index % 2 === 0 ? "lg:border-r border-white/20" : ""
                                }`}
                        >
                            <div className="bg-[#E9E0F5]/20 p-2.5 rounded-lg shrink-0">
                                <Icon className="text-[#E9E0F5] text-xl" />
                            </div>

                            <div>
                                <h3 className="text-white font-semibold text-xs sm:text-sm">
                                    {service.title}
                                </h3>

                                <p className="text-[#E9E0F5] text-[10px] sm:text-xs mt-0.5">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    );
                })}

            </div>

        </section>
    );
};

export default ServiceHighlights;
