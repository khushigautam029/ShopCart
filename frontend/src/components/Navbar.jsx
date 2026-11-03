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

        window.location.href = `/products?search=${encodeURIComponent(search.trim())}`;
    };

    return (
        <>
            {/* Top promotional bar */}
            <div className="bg-[#7652A5] text-white px-4 py-2">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                        <FiPackage className="text-[#E9E0F5]" />
                        <span>Free Shipping on Orders Above ₹999</span>
                        <span className="hidden sm:inline mx-2 text-white/40">|</span>
                        <span className="hidden sm:inline">30 Days Easy Returns</span>
                    </div>

                    <div className="hidden sm:flex items-center gap-5">
                        <a href="#orders" className="hover:text-[#E9E0F5] transition">
                            Track Order
                        </a>
                        <a href="#support" className="flex items-center gap-1 hover:text-[#E9E0F5] transition">
                            <FiHeadphones /> Help
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-50 bg-white text-[#30283B] shadow-md shadow-[#7652A5]/10">

                <div className="max-w-7xl mx-auto px-4 lg:px-8">

                    <div className="h-[76px] flex items-center justify-between gap-5">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 shrink-0">
                            <div className="bg-[#7652A5] p-2 rounded-lg">
                                <FiShoppingCart className="text-xl text-white" />
                            </div>

                            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#30283B]">
                                Shop<span className="text-[#7652A5]">Cart.</span>
                            </span>
                        </Link>

                        {/* Search */}
                        <form
                            onSubmit={handleSearch}
                            className="hidden md:flex flex-1 max-w-xl items-center bg-[#F8F6FB] border border-[#E9E0F5] rounded-full px-5 py-3 focus-within:border-[#7652A5] transition"
                        >
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for products, brands..."
                                className="bg-transparent outline-none text-sm text-[#30283B] placeholder-[#9992A4] w-full"
                            />

                            <button type="submit" aria-label="Search">
                                <FiSearch className="text-xl text-[#7652A5]" />
                            </button>
                        </form>

                        {/* Action icons */}
                        <div className="flex items-center gap-4 md:gap-7">

                            <Link to="/login" className="flex flex-col items-center hover:text-[#7652A5] transition">
                                <FiUser className="text-xl md:text-2xl" />
                                <span className="hidden lg:block text-[11px] mt-1">Account</span>
                            </Link>

                            <Link to="/wishlist" className="flex flex-col items-center hover:text-[#7652A5] transition">
                                <FiHeart className="text-xl md:text-2xl" />
                                <span className="hidden lg:block text-[11px] mt-1">Wishlist</span>
                            </Link>

                            <Link to="/cart" className="flex flex-col items-center hover:text-[#7652A5] transition relative">
                                <FiShoppingCart className="text-xl md:text-2xl" />
                                <span className="hidden lg:block text-[11px] mt-1">Cart</span>
                            </Link>

                            <button
                                className="md:hidden text-2xl text-[#7652A5]"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle navigation"
                            >
                                {menuOpen ? <FiX /> : <FiMenu />}
                            </button>

                        </div>
                    </div>

                    {/* Category navigation */}
                    <nav className="hidden md:flex justify-center items-center gap-8 py-4 border-t border-[#EEE8F5] text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="hover:text-[#7652A5] transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile navigation */}
                    {menuOpen && (
                        <div className="md:hidden pb-5 border-t border-[#EEE8F5]">

                            <form
                                onSubmit={handleSearch}
                                className="flex items-center bg-[#F8F6FB] border border-[#E9E0F5] rounded-lg px-4 py-3 mt-4"
                            >
                                <FiSearch className="text-[#7652A5]" />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="bg-transparent outline-none ml-3 w-full text-sm text-[#30283B] placeholder-[#9992A4]"
                                />
                            </form>

                            <div className="flex flex-col mt-4 gap-4 text-sm">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="hover:text-[#7652A5] transition"
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
