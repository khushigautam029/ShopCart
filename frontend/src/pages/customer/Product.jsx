
import { useMemo, useState } from "react";
import {
    FiArrowRight,
    FiFilter,
    FiSearch,
    FiShoppingBag,
    FiStar,
    FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { trendingProducts } from "../../data/homeData";

const Products = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [showFilters, setShowFilters] = useState(false);

    const categories = useMemo(() => {
        const names = trendingProducts
            .map((product) =>
                typeof product.category === "string"
                    ? product.category
                    : product.category?.name
            )
            .filter(Boolean);

        return ["All", ...new Set(names)];
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...trendingProducts];

        if (search.trim()) {
            const searchText = search.toLowerCase();

            result = result.filter((product) => {
                const category =
                    typeof product.category === "string"
                        ? product.category
                        : product.category?.name || "";

                return (
                    product.name?.toLowerCase().includes(searchText) ||
                    category.toLowerCase().includes(searchText) ||
                    product.description?.toLowerCase().includes(searchText)
                );
            });
        }

        if (selectedCategory !== "All") {
            result = result.filter((product) => {
                const category =
                    typeof product.category === "string"
                        ? product.category
                        : product.category?.name;

                return category === selectedCategory;
            });
        }

        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => Number(a.price) - Number(b.price));
                break;

            case "price-high":
                result.sort((a, b) => Number(b.price) - Number(a.price));
                break;

            case "rating":
                result.sort((a, b) => Number(b.rating) - Number(a.rating));
                break;

            case "name":
                result.sort((a, b) =>
                    (a.name || "").localeCompare(b.name || "")
                );
                break;

            default:
                break;
        }

        return result;
    }, [search, selectedCategory, sortBy]);

    return (
        <div className="w-full bg-[#FCFAFE] min-h-screen">

            {/* Page heading */}
            <section className="bg-gradient-to-r from-[#F3ECFA] via-[#F8F5FC] to-white px-4 sm:px-6 lg:px-10 xl:px-14 py-10 md:py-14">
                <div className="max-w-7xl mx-auto">
                    <div className="text-sm text-[#8D7B9F] mb-4">
                        <Link to="/" className="hover:text-[#7652A5]">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-[#7652A5] font-semibold">
                            Products
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[2px] text-[#7652A5] mb-2">
                                Discover something wonderful
                            </p>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#30283B]">
                                Explore All Products
                            </h1>

                            <p className="text-sm sm:text-base text-[#77717F] mt-3 max-w-xl">
                                Find your favourites, explore new arrivals,
                                and discover products you'll love.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-[#7652A5]">
                            <FiShoppingBag size={21} />
                            <span className="font-bold">
                                {filteredProducts.length} Products
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main content */}
            <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-8 md:py-12">
                <div className="max-w-7xl mx-auto">

                    {/* Search and sort */}
                    <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-7">

                        <div className="relative flex-1 max-w-xl">
                            <FiSearch
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B91A7]"
                                size={18}
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by product name or category..."
                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E9E1F0] bg-white text-sm outline-none focus:border-[#7652A5] focus:ring-2 focus:ring-[#7652A5]/10 transition-all"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#E9E1F0] bg-white text-[#7652A5] text-sm font-semibold"
                            >
                                <FiFilter />
                                Categories
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 md:flex-none px-4 py-3 rounded-xl border border-[#E9E1F0] bg-white text-sm text-[#51475E] outline-none focus:border-[#7652A5]"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[210px_1fr] gap-7">

                        {/* Category sidebar */}
                        <aside
                            className={`${
                                showFilters ? "block" : "hidden"
                            } md:block bg-white border border-[#EEE8F5] rounded-2xl p-5 h-fit`}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-bold text-[#30283B]">
                                    Categories
                                </h2>

                                <button
                                    onClick={() => setSelectedCategory("All")}
                                    className="text-xs text-[#7652A5] font-semibold"
                                >
                                    Reset
                                </button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setShowFilters(false);
                                        }}
                                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                                            selectedCategory === category
                                                ? "bg-[#F0E8F8] text-[#7652A5] font-bold"
                                                : "text-[#77717F] hover:bg-[#F8F6FB] hover:text-[#7652A5]"
                                        }`}
                                    >
                                        {category}

                                        {selectedCategory === category && (
                                            <FiArrowRight size={15} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </aside>

                        {/* Product listing */}
                        <div>
                            <div className="flex items-center justify-between gap-3 mb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-[#30283B]">
                                        {selectedCategory === "All"
                                            ? "All Products"
                                            : selectedCategory}
                                    </h2>

                                    <p className="text-xs text-[#9992A4] mt-1">
                                        Showing {filteredProducts.length} products
                                    </p>
                                </div>

                                {(search || selectedCategory !== "All") && (
                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setSelectedCategory("All");
                                        }}
                                        className="flex items-center gap-1 text-xs font-semibold text-[#7652A5]"
                                    >
                                        <FiX />
                                        Clear filters
                                    </button>
                                )}
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">

                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="group bg-white border border-[#EEE8F5] rounded-2xl overflow-hidden hover:border-[#C9B2E8] hover:shadow-xl hover:shadow-[#7652A5]/10 hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <Link
                                                to={`/products/${product.id}`}
                                                className="block relative aspect-[4/4.5] bg-[#F8F6FB] overflow-hidden"
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />

                                                {product.discount > 0 && (
                                                    <span className="absolute top-3 left-3 bg-[#7652A5] text-white text-[10px] font-bold px-3 py-1.5 rounded-full">
                                                        {product.discount}% OFF
                                                    </span>
                                                )}
                                            </Link>

                                            <div className="p-3 sm:p-4">
                                                <p className="text-[10px] uppercase tracking-wider font-semibold text-[#9992A4] truncate">
                                                    {typeof product.category === "string"
                                                        ? product.category
                                                        : product.category?.name}
                                                </p>

                                                <Link to={`/products/${product.id}`}>
                                                    <h3 className="font-bold text-sm sm:text-base text-[#30283B] mt-1.5 truncate group-hover:text-[#7652A5]">
                                                        {product.name}
                                                    </h3>
                                                </Link>

                                                <div className="flex items-center gap-1.5 mt-2">
                                                    <FiStar
                                                        size={12}
                                                        className="fill-amber-400 text-amber-400"
                                                    />
                                                    <span className="text-xs font-semibold text-[#51475E]">
                                                        {product.rating || "New"}
                                                    </span>
                                                </div>

                                                <div className="flex items-center flex-wrap gap-2 mt-3">
                                                    <span className="font-extrabold text-sm sm:text-base text-[#30283B]">
                                                        ₹{Number(product.price).toLocaleString("en-IN")}
                                                    </span>

                                                    {product.oldPrice && (
                                                        <span className="text-xs text-[#A49DAD] line-through">
                                                            ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                                                        </span>
                                                    )}
                                                </div>

                                                <Link
                                                    to={`/products/${product.id}`}
                                                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#7652A5] hover:bg-[#5E3F89] text-white text-xs sm:text-sm font-bold transition-colors"
                                                >
                                                    View Product
                                                    <FiArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-[#EEE8F5] rounded-2xl py-16 px-5 text-center">
                                    <div className="w-16 h-16 rounded-full bg-[#F3ECFA] text-[#7652A5] flex items-center justify-center mx-auto mb-4">
                                        <FiSearch size={25} />
                                    </div>

                                    <h3 className="text-lg font-bold text-[#30283B]">
                                        No products found
                                    </h3>

                                    <p className="text-sm text-[#77717F] mt-2">
                                        Try a different search or category.
                                    </p>

                                    <button
                                        onClick={() => {
                                            setSearch("");
                                            setSelectedCategory("All");
                                        }}
                                        className="mt-5 px-5 py-2.5 rounded-lg bg-[#7652A5] text-white text-sm font-semibold hover:bg-[#5E3F89]"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
