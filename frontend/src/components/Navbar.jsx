import { useState } from "react";
import {
    FiHeadphones,
    FiHeart,
    FiMenu,
    FiPackage,
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Fashion", href: "/products?category=Fashion" },
        { name: "Electronics", href: "/products?category=Electronics" },
        { name: "Home & Living", href: "/products?category=Home" },
        { name: "Beauty", href: "/products?category=Beauty" },
        { name: "Footwear", href: "/products?category=Footwear" },
        { name: "Deals", href: "/products?deals=true" },
    ];

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) return;

        // Product search page will be implemented next.
        window.location.href = `/products?search=${encodeURIComponent(search.trim())}`;
    };

    return (
        <>
            {/* Top promotional bar */}
            <div className="bg-[#07142b] text-white px-4 py-2">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <FiPackage className="text-blue-400" />
                        <span>Free Shipping on Orders Above ₹999</span>
                        <span className="hidden sm:inline mx-2 text-gray-500">|</span>
                        <span className="hidden sm:inline">30 Days Easy Returns</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-5">
                        <a href="#orders" className="hover:text-blue-400">Track Order</a>
                        <a href="#support" className="flex items-center gap-1 hover:text-blue-400">
                            <FiHeadphones /> Help
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-50 bg-[#0b1730] text-white shadow-lg shadow-blue-950/10">

                <div className="max-w-7xl mx-auto px-4 lg:px-8">

                    <div className="h-[76px] flex items-center justify-between gap-5">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 shrink-0">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <FiShoppingCart className="text-xl text-white" />
                            </div>

                            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                Shop<span className="text-blue-400">Cart.</span>
                            </span>
                        </Link>

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden md:flex flex-1 max-w-xl items-center bg-[#1d2d4d] border border-[#34476b] rounded-full px-5 py-3 focus-within:border-blue-500 transition"
                        >
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for products, brands..."
                                className="bg-transparent outline-none text-sm text-white placeholder-gray-400 w-full"
                            />

                            <button type="submit" aria-label="Search">
                                <FiSearch className="text-xl text-blue-300" />
                            </button>
                        </form>

                        {/* Action icons */}
                        <div className="flex items-center gap-4 md:gap-7">

                            <Link to="/login" className="flex flex-col items-center hover:text-blue-400 transition">
                                <FiUser className="text-xl md:text-2xl" />
                                <span className="hidden lg:block text-[11px] mt-1">Account</span>
                            </Link>

                            <Link to="/wishlist" className="flex flex-col items-center hover:text-blue-400 transition">
                                <FiHeart className="text-xl md:text-2xl" />
                                <span className="hidden lg:block text-[11px] mt-1">Wishlist</span>
                            </Link>

                            <Link to="/cart" className="flex flex-col items-center hover:text-blue-400 transition relative">
                                <FiShoppingCart className="text-xl md:text-2xl" />
                                <span className="hidden lg:block text-[11px] mt-1">Cart</span>
                            </Link>

                            <button
                                className="md:hidden text-2xl"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle navigation"
                            >
                                {menuOpen ? <FiX /> : <FiMenu />}
                            </button>

                        </div>
                    </div>

                    {/* Category navigation */}
                    <nav className="hidden md:flex justify-center items-center gap-8 py-4 border-t border-white/10 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="hover:text-blue-400 transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile navigation */}
                    {menuOpen && (
                        <div className="md:hidden pb-5 border-t border-white/10">
                            <form onSubmit={handleSearch} className="flex items-center bg-[#1d2d4d] rounded-lg px-4 py-3 mt-4">
                                <FiSearch className="text-blue-300" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="bg-transparent outline-none ml-3 w-full text-sm"
                                />
                            </form>

                            <div className="flex flex-col mt-4 gap-4 text-sm">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="hover:text-blue-400"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </header>
        </>
    );
};

export default Navbar;
