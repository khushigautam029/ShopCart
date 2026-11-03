
import {
    FiArrowRight,
    FiFacebook,
    FiInstagram,
    FiTwitter,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
    const socialLinks = [
        { Icon: FiFacebook, label: "Facebook" },
        { Icon: FiInstagram, label: "Instagram" },
        { Icon: FiTwitter, label: "Twitter" },
    ];

    return (
        <footer className="w-full bg-[#30283B] text-white">

            <div className="w-full px-4 sm:px-6 lg:px-10 pt-9 pb-5">

                {/* Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 pb-7">

                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">

                        <Link to="/" className="text-2xl font-extrabold tracking-tight">
                            Shop<span className="text-[#C9B2E8]">Cart.</span>
                        </Link>

                        <p className="text-[#E0D9E9] text-xs leading-6 mt-3 max-w-xs">
                            Your favourite shopping destination. Discover
                            quality products and enjoy a seamless shopping
                            experience.
                        </p>

                        <div className="flex gap-3 mt-4">
                            {socialLinks.map(({ Icon, label }) => (
                                <a
                                    href="#social"
                                    key={label}
                                    aria-label={label}
                                    className="w-8 h-8 flex items-center justify-center bg-[#7652A5] rounded-full hover:bg-[#C9B2E8] hover:text-[#30283B] transition"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-sm mb-3">
                            Quick Links
                        </h3>

                        <ul className="space-y-2.5 text-xs text-[#E0D9E9]">
                            <li>
                                <Link to="/" className="hover:text-[#C9B2E8] transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-[#C9B2E8] transition">
                                    Shop Products
                                </Link>
                            </li>
                            <li>
                                <a href="#about" className="hover:text-[#C9B2E8] transition">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-[#C9B2E8] transition">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h3 className="font-semibold text-sm mb-3">
                            Customer Support
                        </h3>

                        <ul className="space-y-2.5 text-xs text-[#E0D9E9]">
                            <li>
                                <Link to="/profile" className="hover:text-[#C9B2E8] transition">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="hover:text-[#C9B2E8] transition">
                                    My Orders
                                </Link>
                            </li>
                            <li>
                                <a href="#returns" className="hover:text-[#C9B2E8] transition">
                                    Return Policy
                                </a>
                            </li>
                            <li>
                                <a href="#privacy" className="hover:text-[#C9B2E8] transition">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-span-2 md:col-span-1">

                        <h3 className="font-semibold text-sm mb-3">
                            Subscribe to our Newsletter
                        </h3>

                        <p className="text-[#E0D9E9] text-xs leading-5 mb-3">
                            Get the latest deals, updates and exclusive offers.
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex bg-white rounded-lg overflow-hidden p-1 max-w-sm"
                        >
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full min-w-0 px-2.5 py-2 text-[#30283B] outline-none text-xs"
                            />

                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="bg-[#7652A5] hover:bg-[#5E3F89] px-3 rounded-md text-white transition shrink-0"
                            >
                                <FiArrowRight size={17} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-white/15 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-[#E0D9E9]">

                    <p>
                        © {new Date().getFullYear()} ShopCart. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a href="#terms" className="hover:text-[#C9B2E8] transition">
                            Terms & Conditions
                        </a>

                        <a href="#privacy" className="hover:text-[#C9B2E8] transition">
                            Privacy Policy
                        </a>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
