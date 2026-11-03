import { Link } from 'react-router-dom';

// Static Data matching the screenshot layout
const CATEGORIES = [
    {
        id: 'fashion',
        name: 'Fashion',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80',
        icon: (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        )
    },
    {
        id: 'footwear',
        name: 'Footwear',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop&q=80',
        icon: (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    },
    {
        id: 'beauty',
        name: 'Beauty',
        image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=600&auto=format&fit=crop&q=80',
        icon: (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.12a2 2 0 00-1.022.547l-1.08 1.08a2 2 0 00.707 3.398l3.14.785a6 6 0 003.86-.517l.318-.158a6 6 0 013.86-.517l3.14.785a2 2 0 002.414-2.414l-1.08-1.08z" />
            </svg>
        )
    },
    {
        id: 'home-living',
        name: 'Home & Living',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
        icon: (
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )
    }
];

const TRENDING_PRODUCTS = [
    {
        id: 1,
        name: 'Classic Hoodie',
        category: "Men's Hoodie",
        price: 1399,
        originalPrice: 1999,
        discount: '-30%',
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 2,
        name: 'Running Sneakers',
        category: "Men's Shoes",
        price: 1799,
        originalPrice: 2999,
        discount: '-40%',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 3,
        name: 'Vitamin C Serum',
        category: 'Skincare',
        price: 749,
        originalPrice: 999,
        discount: '-25%',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80'
    },
    {
        id: 4,
        name: 'Premium Watch',
        category: 'Accessories',
        price: 3249,
        originalPrice: 4999,
        discount: '-35%',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&auto=format&fit=crop&q=80'
    }
];

export default function Home() {
    // const [activeCategory, setActiveCategory] = useState('Home');

    return (
        <div className="font-sans text-gray-800 bg-white min-h-screen">

            {/* 1. Top Notice Bar */}
            <div className="bg-[#0f382c] text-white text-xs py-2 px-4 flex justify-between items-center">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <p className="flex items-center gap-1 font-medium">
                        <span>🚚</span> Free Shipping on Orders Above ₹999 <span className="mx-1">|</span> Easy Returns
                    </p>
                    <div className="flex items-center gap-4 text-gray-300">
                        <Link to="/orders" className="hover:text-white transition">Track Order</Link>
                        <Link to="/help" className="hover:text-white transition">Help</Link>
                    </div>
                </div>
            </div>

            {/* 2. Main Navigation Bar */}
            <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-0.5">
                        <span className="text-[#0f382c]">Shop</span>
                        <span className="text-[#f25c05]">Cart.</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl mx-4 relative hidden sm:block">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#f25c05]/20"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#f25c05]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-5">
                        <Link to="/profile" className="text-gray-700 hover:text-[#f25c05]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                        <Link to="/wishlist" className="text-gray-700 hover:text-[#f25c05] relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="absolute -top-1.5 -right-2 bg-[#f25c05] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
                        </Link>
                        <Link to="/cart" className="text-gray-700 hover:text-[#f25c05] relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <span className="absolute -top-1.5 -right-2 bg-[#f25c05] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
                        </Link>
                    </div>
                </div>

                {/* Sub-Category Nav Links */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 text-sm font-medium border-t border-gray-100 py-2.5 overflow-x-auto">
                    <button className="bg-[#f25c05] text-white px-4 py-1.5 rounded-md flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        All Categories
                    </button>

                    <nav className="flex items-center gap-6 text-gray-600 whitespace-nowrap">
                        <Link to="/" className="text-[#f25c05] font-semibold border-b-2 border-[#f25c05] pb-0.5">Home</Link>
                        <Link to="/categories?type=fashion" className="hover:text-[#f25c05] transition flex items-center gap-1">Fashion <span>▾</span></Link>
                        <Link to="/categories?type=beauty" className="hover:text-[#f25c05] transition flex items-center gap-1">Beauty <span>▾</span></Link>
                        <Link to="/categories?type=footwear" className="hover:text-[#f25c05] transition flex items-center gap-1">Footwear <span>▾</span></Link>
                        <Link to="/categories?type=home" className="hover:text-[#f25c05] transition flex items-center gap-1">Home & Living <span>▾</span></Link>
                        <Link to="/deals" className="hover:text-[#f25c05] transition">Deals</Link>
                        <Link to="/contact" className="hover:text-[#f25c05] transition">Contact</Link>
                    </nav>
                </div>
            </header>

            {/* 3. Hero Banner Slider */}
            <section className="relative bg-gradient-to-r from-[#fef5ed] via-[#fceae0] to-[#e4f0ec] overflow-hidden py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">

                    {/* Hero Left Content */}
                    <div className="space-y-4 max-w-xl text-center lg:text-left">
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Discover Your Style</p>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                            Shop Smarter, <br />
                            <span className="text-[#f25c05]">Live Better.</span>
                        </h1>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                            Explore the latest trends, premium quality and amazing deals – all in one place.
                        </p>
                        <div className="pt-2">
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-[#f25c05] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#d95004] transition shadow-md hover:shadow-lg"
                            >
                                Shop Now <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Right Banner Image */}
                    <div className="w-full lg:w-1/2 flex justify-center relative">
                        <img
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80"
                            alt="Fashion Model Shopping"
                            className="max-h-[420px] object-contain drop-shadow-xl rounded-2xl"
                        />
                    </div>
                </div>

                {/* Carousel Navigation Buttons */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 transition">
                    ‹
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-gray-800 transition">
                    ›
                </button>

                {/* Slider Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f25c05]"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
                </div>
            </section>

            {/* 4. Shop By Category */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-1 bg-[#f25c05] rounded-full"></span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Shop By Category</h2>
                    </div>
                    <Link to="/categories" className="text-xs font-bold text-gray-600 hover:text-[#f25c05] flex items-center gap-1">
                        View All <span>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/categories?type=${cat.id}`}
                            className="group bg-[#f9f5f0] rounded-2xl overflow-hidden p-4 flex flex-col items-center hover:shadow-md transition text-center"
                        >
                            <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#0f382c] p-2.5 rounded-full shadow-md">
                                    {cat.icon}
                                </div>
                            </div>
                            <span className="font-bold text-gray-800 text-sm group-hover:text-[#f25c05] transition">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 5. Trending Products Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-1 bg-[#f25c05] rounded-full"></span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Trending Products</h2>
                    </div>
                    <Link to="/products" className="text-xs font-bold text-gray-600 hover:text-[#f25c05] flex items-center gap-1">
                        View All <span>→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TRENDING_PRODUCTS.map((product) => (
                        <div
                            key={product.id}
                            className="bg-[#f9f5f0] border border-gray-100 rounded-2xl p-4 relative group flex flex-col justify-between hover:shadow-md transition"
                        >
                            {/* Discount Badge */}
                            <span className="absolute top-6 left-6 bg-[#f25c05] text-white text-[11px] font-bold px-2 py-0.5 rounded-md z-10">
                                {product.discount}
                            </span>

                            {/* Wishlist Button */}
                            <button className="absolute top-6 right-6 bg-white p-1.5 rounded-full text-gray-400 hover:text-red-500 shadow-sm z-10">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>

                            <div>
                                {/* Product Image */}
                                <div className="w-full h-48 rounded-xl overflow-hidden mb-3 bg-white">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>

                                <p className="text-xs text-gray-400 mb-0.5">{product.category}</p>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">{product.name}</h3>

                                {/* Price Display */}
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-base font-extrabold text-gray-900">₹{product.price.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Add to Cart CTA */}
                            <button className="w-full bg-[#f25c05] hover:bg-[#d95004] text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. Limited Time Offer Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-gradient-to-r from-[#0f382c] to-[#175241] rounded-3xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 sm:p-12 relative">

                    <div className="space-y-3 text-white max-w-md z-10">
                        <span className="text-xs uppercase font-bold tracking-widest text-[#f25c05]">Limited Time Offer</span>
                        <h2 className="text-3xl sm:text-5xl font-black leading-tight">
                            Flat <span className="text-[#f25c05]">50% OFF</span>
                        </h2>
                        <p className="text-gray-300 text-sm">On Your Favourite Products</p>
                        <div className="pt-2">
                            <Link
                                to="/deals"
                                className="inline-block bg-[#f25c05] text-white font-bold px-6 py-2.5 rounded-full text-xs hover:bg-[#d95004] transition shadow-md"
                            >
                                Shop the Sale →
                            </Link>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-end">
                        <img
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80"
                            alt="Promo Couch Offer"
                            className="w-full max-w-md h-56 object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* 7. Trust Feature Bar */}
            <section className="border-t border-b border-gray-100 bg-gray-50/50 py-6 my-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">

                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-[#0f382c]">
                            🚚
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-gray-900">Free Shipping</h4>
                            <p className="text-[11px] text-gray-500">On orders above ₹999</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-[#0f382c]">
                            🛡️
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-gray-900">Secure Payment</h4>
                            <p className="text-[11px] text-gray-500">100% secure payment</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-[#0f382c]">
                            🔄
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-gray-900">Easy Returns</h4>
                            <p className="text-[11px] text-gray-500">Within 7 days</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center md:justify-start">
                        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-[#0f382c]">
                            🎧
                        </div>
                        <div>
                            <h4 className="font-bold text-xs text-gray-900">24/7 Support</h4>
                            <p className="text-[11px] text-gray-500">Always here to help</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* 8. Dark Green Footer */}
            <footer className="bg-[#0b2b22] text-white pt-12 pb-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">

                    {/* Brand Info */}
                    <div className="space-y-3">
                        <h3 className="text-2xl font-black tracking-tight">
                            Shop<span className="text-[#f25c05]">Cart.</span>
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed">Your favourite shopping destination.</p>
                        <div className="flex gap-3 pt-2">
                            <a href="#" className="w-7 h-7 rounded-full bg-[#17473a] flex items-center justify-center text-xs hover:bg-[#f25c05] transition">f</a>
                            <a href="#" className="w-7 h-7 rounded-full bg-[#17473a] flex items-center justify-center text-xs hover:bg-[#f25c05] transition">i</a>
                            <a href="#" className="w-7 h-7 rounded-full bg-[#17473a] flex items-center justify-center text-xs hover:bg-[#f25c05] transition">y</a>
                            <a href="#" className="w-7 h-7 rounded-full bg-[#17473a] flex items-center justify-center text-xs hover:bg-[#f25c05] transition">t</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-sm mb-3">Quick Links</h4>
                        <ul className="space-y-2 text-xs text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/products" className="hover:text-white transition">Shop Products</Link></li>
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h4 className="font-bold text-sm mb-3">Customer Support</h4>
                        <ul className="space-y-2 text-xs text-gray-400">
                            <li><Link to="/profile" className="hover:text-white transition">My Account</Link></li>
                            <li><Link to="/orders" className="hover:text-white transition">My Orders</Link></li>
                            <li><Link to="/returns" className="hover:text-white transition">Return Policy</Link></li>
                            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-bold text-sm mb-2">Subscribe to our Newsletter</h4>
                        <p className="text-xs text-gray-400 mb-3">Get the latest deals and updates.</p>
                        <div className="flex gap-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white text-gray-800 text-xs px-3 py-2 rounded-l-md w-full focus:outline-none"
                            />
                            <button className="bg-[#f25c05] text-white px-4 py-2 rounded-r-md text-xs font-bold hover:bg-[#d95004] transition">
                                →
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#17473a] pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-400 gap-2">
                    <p>© 2025 ShopCart. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link>
                        <span>|</span>
                        <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
                    </div>
                </div>
            </footer>

        </div>
    );
}