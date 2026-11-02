import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import ProductCard from '../../components/products/ProductCard';

const MOCK_CATEGORIES = ['Electronics', 'Clothing', 'Home & Office', 'Accessories', 'Footwear'];
const MOCK_BRANDS = ['Apple', 'Nike', 'Sony', 'Adidas', 'Logitech'];

const MOCK_PRODUCTS = [
    { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 199.99, oldPrice: 249.99, discount: 20, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { id: 2, name: 'Minimalist Leather Wrist Watch', category: 'Accessories', price: 89.00, rating: 4.6, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
    { id: 3, name: 'Ergonomic Standing Desk Mat', category: 'Home & Office', price: 45.50, oldPrice: 55.00, discount: 17, rating: 4.4, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
    { id: 4, name: 'Smart Fitness Tracker Band', category: 'Electronics', price: 69.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500' },
    { id: 5, name: 'Casual Canvas Sneakers', category: 'Footwear', price: 54.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { id: 6, name: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 129.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500' },
];

export default function ProductListing() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState(300);
    const [sortBy, setSortBy] = useState('featured');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-gray-200 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Shop Catalog</h1>
                    <p className="text-sm text-gray-500 mt-1">Explore our latest items with top ratings and fast shipping.</p>
                </div>

                {/* Sorting & Filter Toggle */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50"
                    >
                        <FiFilter />
                        <span>Filters</span>
                    </button>

                    <div className="relative flex items-center">
                        <span className="text-xs text-gray-500 mr-2 font-medium">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:border-indigo-500"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="pt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden md:block space-y-6">
                    {/* Category Filter */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <button
                                    onClick={() => setSelectedCategory('All')}
                                    className={`w-full text-left font-medium transition ${selectedCategory === 'All' ? 'text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'
                                        }`}
                                >
                                    All Categories
                                </button>
                            </li>
                            {MOCK_CATEGORIES.map((cat) => (
                                <li key={cat}>
                                    <button
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`w-full text-left transition ${selectedCategory === cat ? 'text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Price Range Filter */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Max Price: ${priceRange}</h3>
                        <input
                            type="range"
                            min="10"
                            max="500"
                            step="10"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full accent-indigo-600"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>$10</span>
                            <span>$500</span>
                        </div>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Brand Filter */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Brands</h3>
                        <div className="space-y-2">
                            {MOCK_BRANDS.map((brand) => (
                                <label key={brand} className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
                                    <input type="checkbox" className="rounded-md text-indigo-600 focus:ring-indigo-500" />
                                    <span>{brand}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="md:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_PRODUCTS.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}