import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Static product placeholder data matching the theme
const MOCK_PRODUCT_DETAILS = {
    id: 1,
    name: 'Classic Vintage Hoodie',
    category: "Men's Fashion",
    price: 1399,
    originalPrice: 1999,
    discount: '-30%',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    description:
        'Crafted from ultra-soft heavyweight cotton fleece, this classic hoodie offers ultimate warmth and premium everyday style. Features a relaxed fit, reinforced stitching, and a double-lined hood.',
    features: [
        '100% Premium Heavyweight Cotton',
        'Pre-shrunk fabric for long-lasting fit',
        'Double-stitched ribbed cuffs and hem',
        'Machine washable with easy care'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
        { name: 'Beige', bg: 'bg-[#e5dcd3]' },
        { name: 'Forest Green', bg: 'bg-[#0f382c]' },
        { name: 'Charcoal', bg: 'bg-[#333333]' }
    ],
    images: [
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
    ]
};

export default function ProductDetail() {
    const { id } = useParams();
    const product = MOCK_PRODUCT_DETAILS;

    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

            {/* Breadcrumb Trail */}
            <nav className="text-xs text-gray-500 flex items-center gap-2">
                <Link to="/" className="hover:text-[#f25c05] transition">Home</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-[#f25c05] transition">Products</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>

            {/* Main Product Showcase Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                {/* Left: Product Images Gallery */}
                <div className="space-y-4">
                    <div className="w-full h-[450px] bg-[#f9f5f0] rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Selector */}
                    <div className="flex gap-4">
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(img)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${selectedImage === img ? 'border-[#f25c05]' : 'border-gray-200 opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info & Actions */}
                <div className="space-y-6">
                    <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{product.category}</span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{product.name}</h1>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex text-amber-400 text-sm">★★★★★</div>
                            <span className="text-xs text-gray-500 font-medium">{product.rating} ({product.reviewCount} customer reviews)</span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        <span className="bg-[#f25c05] text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                            {product.discount}
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed border-t border-b border-gray-100 py-4">
                        {product.description}
                    </p>

                    {/* Color Selector */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Color: <span className="font-normal text-gray-500">{selectedColor}</span></label>
                        <div className="flex gap-3">
                            {product.colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => setSelectedColor(c.name)}
                                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${c.bg} ${selectedColor === c.name ? 'ring-2 ring-offset-2 ring-[#f25c05] border-transparent' : 'border-gray-300'
                                        }`}
                                    title={c.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size Selector */}
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Select Size</label>
                        <div className="flex gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-10 rounded-lg text-xs font-bold border transition ${selectedSize === size
                                            ? 'bg-[#0f382c] text-white border-[#0f382c]'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity & CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        {/* Quantity Controller */}
                        <div className="flex items-center border border-gray-200 rounded-xl w-max">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-2 text-gray-600 hover:text-black font-bold"
                            >
                                -
                            </button>
                            <span className="px-4 py-2 text-sm font-semibold text-gray-800">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-2 text-gray-600 hover:text-black font-bold"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart Button */}
                        <button className="flex-1 bg-[#f25c05] hover:bg-[#d95004] text-white font-bold py-3 px-6 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
                            </svg>
                            Add to Cart
                        </button>

                        {/* Wishlist Button */}
                        <button className="p-3 border border-gray-200 rounded-xl text-gray-500 hover:text-red-500 hover:border-red-200 transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Product Highlights */}
                    <div className="bg-[#f9f5f0] p-4 rounded-xl space-y-2 border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-900 uppercase">Highlights & Specifications</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                            {product.features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="text-[#0f382c]">✓</span> {feat}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}