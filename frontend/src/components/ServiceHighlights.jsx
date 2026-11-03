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
        <section className="max-w-7xl mx-auto px-5 lg:px-8 pb-16">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-[#365D52] rounded-2xl px-5 py-8">

                {services.map((service, index) => {
                    const Icon = service.icon;

                    return (
                        <div
                            key={service.title}
                            className={`flex items-center gap-4 justify-center ${
                                index !== 3 ? "lg:border-r border-white/15" : ""
                            }`}
                        >

                            <div className="bg-[#D98968]/20 p-3 rounded-xl">
                                <Icon className="text-[#F2B49A] text-2xl" />
                            </div>

                            <div>
                                <h3 className="text-white font-bold text-xs md:text-sm">
                                    {service.title}
                                </h3>

                                <p className="text-[#D5DED8] text-[10px] md:text-xs mt-1">
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
