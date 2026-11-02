import { useState } from 'react';
import { FiHeart, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { Link, Outlet } from 'react-router-dom';

export default function CustomerLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* Logo */}
                        <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
                            ShopCart
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
                            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                            <Link to="/products" className="hover:text-indigo-600 transition-colors">Shop</Link>
                            <Link to="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
                            <Link to="/deals" className="hover:text-indigo-600 transition-colors">Deals</Link>
                        </nav>

                        {/* Search Bar */}
                        <div className="hidden lg:flex items-center flex-1 max-w-xs mx-8 relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full bg-gray-100 text-sm rounded-full pl-10 pr-4 py-2 border border-transparent focus:outline-none focus:bg-white focus:border-indigo-500 transition"
                            />
                            <FiSearch className="absolute left-3 text-gray-400 text-lg" />
                        </div>

                        {/* Icons / Actions */}
                        <div className="flex items-center space-x-5">
                            <Link to="/wishlist" className="relative p-2 text-gray-600 hover:text-indigo-600 transition">
                                <FiHeart className="text-xl" />
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
                            </Link>

                            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-indigo-600 transition">
                                <FiShoppingCart className="text-xl" />
                                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
                            </Link>

                            <Link to="/login" className="p-2 text-gray-600 hover:text-indigo-600 transition">
                                <FiUser className="text-xl" />
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
                            >
                                {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-2">
                        <Link to="/" className="block py-2 text-gray-700 font-medium">Home</Link>
                        <Link to="/products" className="block py-2 text-gray-700 font-medium">Shop All</Link>
                        <Link to="/categories" className="block py-2 text-gray-700 font-medium">Categories</Link>
                        <Link to="/orders" className="block py-2 text-gray-700 font-medium">My Orders</Link>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 mt-16 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">ShopCart</h3>
                        <p className="leading-relaxed">Your one-stop destination for seamless online shopping and premium products.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="hover:text-white">Shop Catalog</Link></li>
                            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
                            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Customer Service</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Track Order</a></li>
                            <li><a href="#" className="hover:text-white">Returns Policy</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-3">Stay Connected</h4>
                        <p className="mb-3">Subscribe to get special offers and discounts.</p>
                        <div className="flex">
                            <input type="email" placeholder="Enter your email" className="px-3 py-2 bg-gray-800 text-white rounded-l-md w-full focus:outline-none" />
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md font-medium hover:bg-indigo-700">Join</button>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-800 text-xs text-center">
                    © {new Date().getFullYear()} ShopCart Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
}