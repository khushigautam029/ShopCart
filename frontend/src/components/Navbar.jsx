import { useState } from "react";
import {
    FiChevronDown,
    FiHeart,
    FiLogOut,
    FiMapPin,
    FiMenu,
    FiSearch,
    FiShoppingCart,
    FiTrash2,
    FiUser,
    FiX
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

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

    const handleLogout = () => {
        logout();
        setProfileOpen(false);
        setMenuOpen(false);
        navigate("/login");
    };

    const handleDeleteAccount = () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );

        if (!confirmed) return;

        // Demo only: connect your delete-account API here later.
        alert("Account deletion is not connected yet.");
        setProfileOpen(false);
    };

    const closeMenus = () => {
        setProfileOpen(false);
        setMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white text-[#30283B] shadow-sm shadow-[#7652A5]/10">
            <div className="w-full px-4 sm:px-6 lg:px-10">

                {/* Main Navbar */}
                <div className="min-h-[64px] flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenus}
                        className="flex items-center gap-2 shrink-0"
                    >
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

                        {/* Profile Dropdown */}
                        <div className="relative">
                            {isAuthenticated ? (
                                <button
                                    type="button"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-2 hover:text-[#7652A5] transition"
                                    title="My Account"
                                    aria-expanded={profileOpen}
                                >
                                    <FiUser className="text-xl" />

                                    <span className="hidden lg:block text-sm font-medium max-w-[100px] truncate">
                                        {user?.name || user?.phone || "Account"}
                                    </span>

                                    <FiChevronDown className="hidden lg:block text-sm" />
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 hover:text-[#7652A5] transition"
                                    title="Login"
                                >
                                    <FiUser className="text-xl" />
                                    <span className="hidden lg:block text-sm font-medium">
                                        Login
                                    </span>
                                </Link>
                            )}

                            {/* Dropdown Menu */}
                            {isAuthenticated && profileOpen && (
                                <div className="absolute right-0 top-12 w-60 bg-white border border-[#EEE8F5] rounded-xl shadow-xl shadow-[#7652A5]/10 overflow-hidden z-50">

                                    {/* User Information */}
                                    <div className="px-4 py-3 bg-[#F8F6FB] border-b border-[#EEE8F5]">
                                        <p className="text-sm font-semibold text-[#30283B] truncate">
                                            {user?.name || "Welcome"}
                                        </p>

                                        <p className="text-xs text-[#88818F] mt-1 truncate">
                                            {user?.email || user?.phone || "My ShopCart Account"}
                                        </p>
                                    </div>

                                    <div className="p-2">

                                        <Link
                                            to="/profile"
                                            onClick={closeMenus}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#51495D] hover:bg-[#F8F6FB] hover:text-[#7652A5] transition"
                                        >
                                            <FiUser className="text-base" />
                                            My Profile
                                        </Link>

                                        <Link
                                            to="/profile?tab=addresses"
                                            onClick={closeMenus}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#51495D] hover:bg-[#F8F6FB] hover:text-[#7652A5] transition"
                                        >
                                            <FiMapPin className="text-base" />
                                            My Addresses
                                        </Link>

                                        <div className="my-2 border-t border-[#EEE8F5]" />

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#51495D] hover:bg-[#F8F6FB] hover:text-[#7652A5] transition"
                                        >
                                            <FiLogOut className="text-base" />
                                            Logout
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleDeleteAccount}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition"
                                        >
                                            <FiTrash2 className="text-base" />
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Wishlist */}
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

                        {/* Cart */}
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

                            <button type="submit" aria-label="Search">
                                <FiSearch className="text-[#7652A5]" />
                            </button>
                        </form>

                        {/* Mobile Links */}
                        <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={closeMenus}
                                    className="py-1.5 hover:text-[#7652A5] transition"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Account Options */}
                        <div className="mt-4 pt-4 border-t border-[#EEE8F5]">

                            {isAuthenticated ? (
                                <>
                                    <div className="mb-3">
                                        <p className="text-sm font-semibold">
                                            {user?.name || "My Account"}
                                        </p>
                                        <p className="text-xs text-[#88818F] mt-1">
                                            {user?.email || user?.phone || ""}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Link
                                            to="/profile"
                                            onClick={closeMenus}
                                            className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8F6FB] text-sm text-[#7652A5]"
                                        >
                                            <FiUser />
                                            Profile
                                        </Link>

                                        <Link
                                            to="/profile?tab=addresses"
                                            onClick={closeMenus}
                                            className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8F6FB] text-sm text-[#7652A5]"
                                        >
                                            <FiMapPin />
                                            Addresses
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 p-2.5 rounded-lg bg-[#F8F6FB] text-sm text-[#7652A5]"
                                        >
                                            <FiLogOut />
                                            Logout
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleDeleteAccount}
                                            className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 text-sm text-red-500"
                                        >
                                            <FiTrash2 />
                                            Delete Account
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={closeMenus}
                                    className="flex items-center gap-2 text-sm font-semibold text-[#7652A5]"
                                >
                                    <FiUser />
                                    Login / My Account
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;