
import { useMemo, useState } from "react";
import {
    FiArrowRight,
    FiChevronDown,
    FiFilter,
    FiSearch,
    FiShoppingBag,
    FiStar,
    FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { trendingProducts } from "../../data/homeData";

// Extract filter values from different possible product data formats.
const getValues = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
        return value.flatMap((item) => {
            if (typeof item === "string" || typeof item === "number") {
                return [String(item)];
            }

            if (item && typeof item === "object") {
                const name = item.name || item.value || item.label || item.color || item.size;
                return name ? [String(name)] : [];
            }

            return [];
        });
    }

    if (typeof value === "object") {
        const name = value.name || value.value || value.label;
        return name ? [String(name)] : [];
    }

    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
};

const getCategory = (product) => {
    return typeof product.category === "string"
        ? product.category
        : product.category?.name || "Other";
};

const getProductValues = (product, fields) => {
    return fields.flatMap((field) => getValues(product[field]));
};

const availableCategories = [
    "Electronics",
    "Clothing",
    "Footwear",
    "Home & Living",
    "Beauty",
    "Accessories",
    "Sports",
    "Books",
    "Grocery",
];

const Products = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("featured");
    const [showFilters, setShowFilters] = useState(false);

    const [selectedFilters, setSelectedFilters] = useState({
        brands: [],
        genders: [],
        sizes: [],
        colors: [],
        fabrics: [],
        ratings: [],
    });

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    const categories = useMemo(() => {
        const actualCategories = trendingProducts.map(getCategory);

        return [
            "All",
            ...new Set([
                ...availableCategories.filter((category) =>
                    actualCategories.some(
                        (actual) => actual.toLowerCase() === category.toLowerCase()
                    )
                ),
                ...actualCategories,
            ]),
        ];
    }, []);

    const filterOptions = useMemo(() => {
        const getUniqueValues = (fields) => [
            ...new Set(
                trendingProducts.flatMap((product) =>
                    getProductValues(product, fields)
                )
            ),
        ].sort();

        return {
            brands: getUniqueValues(["brand", "brandName"]),
            genders: getUniqueValues(["gender", "targetGender"]),
            sizes: getUniqueValues(["sizes", "availableSizes", "size"]),
            colors: getUniqueValues(["colors", "availableColors", "color"]),
            fabrics: getUniqueValues(["fabric", "material", "materials"]),
        };
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...trendingProducts];

        if (search.trim()) {
            const searchText = search.toLowerCase();

            result = result.filter((product) => {
                const category = getCategory(product);

                return (
                    product.name?.toLowerCase().includes(searchText) ||
                    category.toLowerCase().includes(searchText) ||
                    product.description?.toLowerCase().includes(searchText) ||
                    product.brand?.toLowerCase().includes(searchText)
                );
            });
        }

        if (selectedCategory !== "All") {
            result = result.filter(
                (product) =>
                    getCategory(product).toLowerCase() ===
                    selectedCategory.toLowerCase()
            );
        }

        const filterMatches = (product, fields, selectedValues) => {
            if (!selectedValues.length) return true;

            const productValues = getProductValues(product, fields).map(
                (value) => value.toLowerCase()
            );

            return selectedValues.some((value) =>
                productValues.includes(value.toLowerCase())
            );
        };

        result = result.filter((product) => {
            const price = Number(product.price) || 0;
            const rating = Number(product.rating) || 0;
            const stock = product.stock ?? product.availableStock;
            const isInStock =
                stock === undefined
                    ? product.inStock !== false
                    : Number(stock) > 0;

            if (minPrice !== "" && price < Number(minPrice)) return false;
            if (maxPrice !== "" && price > Number(maxPrice)) return false;
            if (inStockOnly && !isInStock) return false;

            if (
                !filterMatches(product, ["brand", "brandName"], selectedFilters.brands)
            ) return false;

            if (
                !filterMatches(product, ["gender", "targetGender"], selectedFilters.genders)
            ) return false;

            if (
                !filterMatches(
                    product,
                    ["sizes", "availableSizes", "size"],
                    selectedFilters.sizes
                )
            ) return false;

            if (
                !filterMatches(
                    product,
                    ["colors", "availableColors", "color"],
                    selectedFilters.colors
                )
            ) return false;

            if (
                !filterMatches(
                    product,
                    ["fabric", "material", "materials"],
                    selectedFilters.fabrics
                )
            ) return false;

            if (
                selectedFilters.ratings.length &&
                !selectedFilters.ratings.some(
                    (selectedRating) => rating >= Number(selectedRating)
                )
            ) return false;

            return true;
        });

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
    }, [
        search,
        selectedCategory,
        sortBy,
        selectedFilters,
        minPrice,
        maxPrice,
        inStockOnly,
    ]);

    const toggleFilter = (filterName, value) => {
        setSelectedFilters((previous) => ({
            ...previous,
            [filterName]: previous[filterName].includes(value)
                ? previous[filterName].filter((item) => item !== value)
                : [...previous[filterName], value],
        }));
    };

    const clearFilters = () => {
        setSearch("");
        setSelectedCategory("All");
        setMinPrice("");
        setMaxPrice("");
        setInStockOnly(false);
        setSelectedFilters({
            brands: [],
            genders: [],
            sizes: [],
            colors: [],
            fabrics: [],
            ratings: [],
        });
    };

    const activeFilterCount =
        Object.values(selectedFilters).reduce(
            (total, values) => total + values.length,
            0
        ) +
        (minPrice !== "" ? 1 : 0) +
        (maxPrice !== "" ? 1 : 0) +
        (inStockOnly ? 1 : 0);

    const FilterSection = ({ title, filterName, options }) => {
        if (!options.length) return null;

        return (
            <details open className="border-b border-[#F0EBF5] py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-[#30283B]">
                    {title}
                    <FiChevronDown size={16} className="text-[#91869D]" />
                </summary>

                <div className="mt-3 flex flex-col gap-2.5">
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex cursor-pointer items-center gap-2.5 text-[13px] text-[#77717F] hover:text-[#7652A5]"
                        >
                            <input
                                type="checkbox"
                                checked={selectedFilters[filterName].includes(option)}
                                onChange={() => toggleFilter(filterName, option)}
                                className="h-4 w-4 accent-[#7652A5]"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            </details>
        );
    };

    return (
        <div className="min-h-screen w-full bg-[#FCFAFE] text-[#30283B]">

            {/* Compact page header */}
            <section className="w-full border-b border-[#EEE8F5] bg-gradient-to-r from-[#F3ECFA] to-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="mb-1 text-xs text-[#8D7B9F]">
                            <Link to="/" className="hover:text-[#7652A5]">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="font-semibold text-[#7652A5]">
                                Products
                            </span>
                        </div>

                        <h1 className="text-2xl font-extrabold sm:text-3xl">
                            Explore Products
                        </h1>

                        <p className="mt-1 text-sm text-[#77717F]">
                            Discover products you'll love.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#7652A5] shadow-sm">
                        <FiShoppingBag size={18} />
                        {filteredProducts.length} Products
                    </div>
                </div>
            </section>

            {/* Search and sorting */}
            <section className="w-full px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <FiSearch
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9B91A7]"
                            size={17}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products, brands or categories..."
                            className="w-full rounded-lg border border-[#E9E1F0] bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#7652A5] focus:ring-2 focus:ring-[#7652A5]/10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center justify-center gap-2 rounded-lg border border-[#E9E1F0] bg-white px-4 py-3 text-sm font-semibold text-[#7652A5] md:hidden"
                        >
                            <FiFilter size={16} />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="rounded-full bg-[#7652A5] px-1.5 py-0.5 text-[10px] text-white">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="min-w-0 flex-1 rounded-lg border border-[#E9E1F0] bg-white px-3 py-3 text-sm outline-none focus:border-[#7652A5] sm:flex-none"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="name">Name: A to Z</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Main products area */}
            <section className="w-full px-4 pb-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-[230px_minmax(0,1fr)] lg:grid-cols-[245px_minmax(0,1fr)]">

                    {/* Filters sidebar */}
                    <aside
                        className={`${
                            showFilters ? "block" : "hidden"
                        } h-fit rounded-xl border border-[#EEE8F5] bg-white px-4 md:sticky md:top-4 md:block`}
                    >
                        <div className="flex items-center justify-between border-b border-[#F0EBF5] py-4">
                            <div className="flex items-center gap-2">
                                <FiFilter className="text-[#7652A5]" />
                                <h2 className="font-bold">Filters</h2>
                            </div>

                            <button
                                onClick={clearFilters}
                                className="text-xs font-semibold text-[#7652A5] hover:text-[#5E3F89]"
                            >
                                Clear all
                            </button>
                        </div>

                        {/* Categories */}
                        <details open className="border-b border-[#F0EBF5] py-3">
                            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold">
                                Categories
                                <FiChevronDown size={16} className="text-[#91869D]" />
                            </summary>

                            <div className="mt-3 flex max-h-56 flex-col gap-1 overflow-y-auto">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setShowFilters(false);
                                        }}
                                        className={`flex items-center justify-between rounded-md px-2.5 py-2 text-left text-[13px] transition ${
                                            selectedCategory === category
                                                ? "bg-[#F0E8F8] font-bold text-[#7652A5]"
                                                : "text-[#77717F] hover:bg-[#F8F6FB]"
                                        }`}
                                    >
                                        {category}
                                        {selectedCategory === category && (
                                            <FiArrowRight size={14} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </details>

                        {/* Price range */}
                        <details open className="border-b border-[#F0EBF5] py-3">
                            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold">
                                Price Range
                                <FiChevronDown size={16} className="text-[#91869D]" />
                            </summary>

                            <div className="mt-3 grid grid-cols-2 gap-2">
                                <div>
                                    <label className="mb-1 block text-[11px] text-[#9992A4]">
                                        Minimum (₹)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        placeholder="0"
                                        className="w-full rounded-md border border-[#E9E1F0] px-2 py-2 text-xs outline-none focus:border-[#7652A5]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-[11px] text-[#9992A4]">
                                        Maximum (₹)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        placeholder="Any"
                                        className="w-full rounded-md border border-[#E9E1F0] px-2 py-2 text-xs outline-none focus:border-[#7652A5]"
                                    />
                                </div>
                            </div>
                        </details>

                        <FilterSection
                            title="Brand"
                            filterName="brands"
                            options={filterOptions.brands}
                        />

                        <FilterSection
                            title="Gender"
                            filterName="genders"
                            options={filterOptions.genders}
                        />

                        <FilterSection
                            title="Size"
                            filterName="sizes"
                            options={filterOptions.sizes}
                        />

                        <FilterSection
                            title="Color"
                            filterName="colors"
                            options={filterOptions.colors}
                        />

                        <FilterSection
                            title="Fabric / Material"
                            filterName="fabrics"
                            options={filterOptions.fabrics}
                        />

                        {/* Rating */}
                        <details open className="border-b border-[#F0EBF5] py-3">
                            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold">
                                Customer Rating
                                <FiChevronDown size={16} className="text-[#91869D]" />
                            </summary>

                            <div className="mt-3 flex flex-col gap-2.5">
                                {[4, 3, 2, 1].map((rating) => (
                                    <label
                                        key={rating}
                                        className="flex cursor-pointer items-center gap-2 text-[13px] text-[#77717F]"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.ratings.includes(String(rating))}
                                            onChange={() =>
                                                toggleFilter("ratings", String(rating))
                                            }
                                            className="h-4 w-4 accent-[#7652A5]"
                                        />

                                        <span className="flex items-center gap-1">
                                            {rating}+ 
                                            <FiStar className="fill-amber-400 text-amber-400" size={12} />
                                            <span> & above</span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </details>

                        {/* Availability */}
                        <div className="py-3">
                            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-[#51475E]">
                                <input
                                    type="checkbox"
                                    checked={inStockOnly}
                                    onChange={(e) => setInStockOnly(e.target.checked)}
                                    className="h-4 w-4 accent-[#7652A5]"
                                />
                                In Stock Only
                            </label>
                        </div>
                    </aside>

                    {/* Product grid */}
                    <div className="min-w-0">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <div>
                                <h2 className="text-lg font-bold">
                                    {selectedCategory === "All"
                                        ? "All Products"
                                        : selectedCategory}
                                </h2>
                                <p className="mt-0.5 text-xs text-[#9992A4]">
                                    Showing {filteredProducts.length} products
                                </p>
                            </div>

                            {(search || activeFilterCount > 0 || selectedCategory !== "All") && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 text-xs font-semibold text-[#7652A5]"
                                >
                                    <FiX size={14} />
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group min-w-0 overflow-hidden rounded-xl border border-[#EEE8F5] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#C9B2E8] hover:shadow-lg hover:shadow-[#7652A5]/10"
                                    >
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="relative block aspect-square overflow-hidden bg-[#F8F6FB]"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />

                                            {product.discount > 0 && (
                                                <span className="absolute left-2 top-2 rounded-full bg-[#7652A5] px-2 py-1 text-[10px] font-bold text-white">
                                                    {product.discount}% OFF
                                                </span>
                                            )}
                                        </Link>

                                        <div className="p-2.5 sm:p-3">
                                            <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-[#9992A4]">
                                                {getCategory(product)}
                                            </p>

                                            <Link to={`/products/${product.id}`}>
                                                <h3 className="mt-1 truncate text-xs font-bold text-[#30283B] group-hover:text-[#7652A5] sm:text-sm">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <div className="mt-1.5 flex items-center gap-1">
                                                <FiStar
                                                    size={11}
                                                    className="fill-amber-400 text-amber-400"
                                                />
                                                <span className="text-[11px] font-semibold text-[#51475E]">
                                                    {product.rating || "New"}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                                <span className="text-sm font-extrabold text-[#30283B]">
                                                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                                                </span>

                                                {product.oldPrice && (
                                                    <span className="text-[10px] text-[#A49DAD] line-through">
                                                        ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                to={`/products/${product.id}`}
                                                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#7652A5] py-2 text-[11px] font-bold text-white transition hover:bg-[#5E3F89] sm:text-xs"
                                            >
                                                View Product
                                                <FiArrowRight size={13} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-[#EEE8F5] bg-white px-4 py-16 text-center">
                                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3ECFA] text-[#7652A5]">
                                    <FiSearch size={23} />
                                </div>

                                <h3 className="font-bold">No products found</h3>
                                <p className="mt-1 text-sm text-[#77717F]">
                                    Try changing your search or filters.
                                </p>

                                <button
                                    onClick={clearFilters}
                                    className="mt-4 rounded-lg bg-[#7652A5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5E3F89]"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
