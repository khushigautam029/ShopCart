import {
    FiArrowRight,
    FiFacebook,
    FiInstagram,
    FiTwitter
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#07142b] text-white pt-14 pb-6">

            <div className="max-w-7xl mx-auto px-5 lg:px-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="text-3xl font-extrabold">
                            Shop<span className="text-blue-400">Cart.</span>
                        </Link>

                        <p className="text-gray-400 text-sm leading-7 mt-5 max-w-xs">
                            Your favourite shopping destination. Discover
                            quality products and enjoy a seamless shopping
                            experience.
                        </p>

                        <div className="flex gap-4 mt-6">
                            {[FiFacebook, FiInstagram, FiTwitter].map((Icon, index) => (
                                <a
                                    href="#social"
                                    key={index}
                                    aria-label="Social media"
                                    className="bg-[#1d2d4d] p-2.5 rounded-full hover:bg-blue-600 transition"
                                >
                                    <Icon size={17} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-base mb-6">Quick Links</h3>

                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
                            <li><Link to="/products" className="hover:text-blue-400">Shop Products</Link></li>
                            <li><a href="#about" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="#contact" className="hover:text-blue-400">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Customer support */}
                    <div>
                        <h3 className="font-bold text-base mb-6">Customer Support</h3>

                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link to="/profile" className="hover:text-blue-400">My Account</Link></li>
                            <li><Link to="/orders" className="hover:text-blue-400">My Orders</Link></li>
                            <li><a href="#returns" className="hover:text-blue-400">Return Policy</a></li>
                            <li><a href="#privacy" className="hover:text-blue-400">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-base mb-5">
                            Subscribe to our Newsletter
                        </h3>

                        <p className="text-gray-400 text-sm leading-6 mb-5">
                            Get the latest deals, updates and exclusive offers.
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex bg-white rounded-xl overflow-hidden p-1"
                        >
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full min-w-0 px-3 py-3 text-gray-800 outline-none text-xs"
                            />

                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="bg-blue-600 hover:bg-blue-500 px-4 rounded-lg text-white transition"
                            >
                                <FiArrowRight size={19} />
                            </button>
                        </form>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">

                    <p>
                        © {new Date().getFullYear()} ShopCart. All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <a href="#terms" className="hover:text-blue-400">Terms & Conditions</a>
                        <a href="#privacy" className="hover:text-blue-400">Privacy Policy</a>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
