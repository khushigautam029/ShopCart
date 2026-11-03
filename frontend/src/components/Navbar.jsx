
import { useState } from "react";
import {
    FiHeart,
    FiMenu,
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiX,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

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

        const searchValue = search.trim();

        if (!searchValue) return;

        navigate(`/products?search=${encodeURIComponent(searchValue)}`);
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white text-[#30283B] shadow-sm shadow-[#7652A5]/10">

            {/* Main Navbar */}
            <div className="w-full px-4 sm:px-6 lg:px-10">

                <div className="min-h-[64px] flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="bg-[#7652A5] p-2 rounded-lg">
                            <FiShoppingCart className="text-lg text-white" />
                        </div>

                        <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#30283B]">
                            Shop<span className="text-[#7652A5]">Cart.</span>
                        </span>
                    </Link>

                    {/* Desktop Search */}
                    <form
                        onSubmit={handleSearch}
                        className="hidden md:flex flex-1 max-w-2xl mx-5 items-center bg-[#F8F6FB] border border-[#E9E0F5] rounded-full px-4 py-2 focus-within:border-[#7652A5] focus-within:ring-2 focus-within:ring-[#7652A5]/10 transition"
                    >
                        <FiSearch className="text-lg text-[#7652A5] shrink-0" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for products, brands..."
                            className="bg-transparent outline-none text-sm text-[#30283B] placeholder-[#9992A4] w-full px-3"
                        />

                        <button
                            type="submit"
                            aria-label="Search"
                            className="text-[#7652A5] hover:text-[#5E3F89] transition"
                        >
                            <FiSearch className="text-lg" />
                        </button>
                    </form>

                    {/* Action Icons */}
                    <div className="flex items-center gap-4 sm:gap-5 shrink-0">

                        <Link
                            to={isAuthenticated ? "/profile" : "/login"}
                            className="flex items-center gap-2 hover:text-[#7652A5] transition"
                            title="Account"
                        >
                            <FiUser className="text-xl" />
                            <span className="hidden lg:block text-sm font-medium max-w-[100px] truncate">
                                {isAuthenticated
                                    ? user?.name || user?.phone || "Account"
                                    : "Account"}
                            </span>
                        </Link>

                        <Link
                            to="/wishlist"
                            className="flex items-center gap-2 hover:text-[#7652A5] transition"
                            title="Wishlist"
                        >
                            <FiHeart className="text-xl" />
                            <span className="hidden lg:block text-sm font-medium">
                                Wishlist
                            </span>
                        </Link>

                        <Link
                            to="/cart"
                            className="flex items-center gap-2 hover:text-[#7652A5] transition"
                            title="Cart"
                        >
                            <FiShoppingCart className="text-xl" />
                            <span className="hidden lg:block text-sm font-medium">
                                Cart
                            </span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-xl text-[#7652A5] hover:text-[#5E3F89] transition"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle navigation"
                        >
                            {menuOpen ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>

                {/* Category Navigation */}
                <nav className="hidden md:flex items-center justify-center gap-7 border-t border-[#F0EBF5] py-2.5 text-[13px] font-medium text-[#5B5364]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className="relative py-1 hover:text-[#7652A5] transition-colors after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px] after:bg-[#7652A5] after:rounded-full hover:after:w-full after:transition-all"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden border-t border-[#EEE8F5] py-4">

                        {/* Mobile Search */}
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center bg-[#F8F6FB] border border-[#E9E0F5] rounded-lg px-3 py-2.5 mb-4 focus-within:border-[#7652A5]"
                        >
                            <FiSearch className="text-[#7652A5] shrink-0" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="bg-transparent outline-none ml-3 w-full text-sm text-[#30283B] placeholder-[#9992A4]"
                            />
                        </form>

                        {/* Mobile Links */}
                        <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="py-1.5 hover:text-[#7652A5] transition"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Account */}
                        <Link
                            to={isAuthenticated ? "/profile" : "/login"}
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 mt-4 pt-4 border-t border-[#EEE8F5] text-sm font-semibold text-[#7652A5]"
                        >
                            <FiUser />
                            {isAuthenticated
                                ? user?.name || user?.phone || "My Account"
                                : "Login / My Account"}
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
