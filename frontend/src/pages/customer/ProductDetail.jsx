import { useState } from 'react';
import { FiCheck, FiHeart, FiMinus, FiPlus, FiRotateCcw, FiShield, FiShoppingCart, FiStar, FiTruck } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

const MOCK_PRODUCT = {
    id: '1',
    name: 'Wireless Noise-Canceling Premium Headphones',
    category: 'Electronics',
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    rating: 4.8,
    reviewsCount: 128,
    inStock: true,
    stockQuantity: 15,
    description: 'Experience studio-grade acoustic performance with active noise cancellation, ambient passthrough mode, and up to 30 hours of battery life on a single charge.',
    specifications: [
        { label: 'Brand', value: 'SoundMax' },
        { label: 'Connectivity', value: 'Bluetooth 5.3, 3.5mm Aux' },
        { label: 'Battery Life', value: 'Up to 30 hours (ANC On)' },
        { label: 'Charging', value: 'USB-C Fast Charge (10 mins = 3 hrs)' },
        { label: 'Weight', value: '250 grams' }
    ],
    images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'
    ],
    colors: [
        { name: 'Matte Black', hex: '#1e1e1e' },
        { name: 'Silver Gray', hex: '#d1d5db' },
        { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    sizes: ['Standard', 'Pro Foam Cushion']
};

const MOCK_REVIEWS = [
    { id: 1, user: 'Alex M.', rating: 5, date: 'Oct 14, 2026', comment: 'The sound quality and active noise cancellation are top notch. Super comfortable for long work hours!' },
    { id: 2, user: 'Sarah K.', rating: 4, date: 'Sep 28, 2026', comment: 'Battery life easily lasts two days of heavy use. Very pleased with the build quality.' }
];

export default function ProductDetail() {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(MOCK_PRODUCT.colors[0].name);
    const [selectedSize, setSelectedSize] = useState(MOCK_PRODUCT.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(1, Math.min(prev + delta, MOCK_PRODUCT.stockQuantity)));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500 mb-6 space-x-2">
                <Link to="/" className="hover:text-indigo-600">Home</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-indigo-600">Shop</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium truncate">{MOCK_PRODUCT.name}</span>
            </nav>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Column: Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                        <img
                            src={MOCK_PRODUCT.images[selectedImage]}
                            alt={MOCK_PRODUCT.name}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="flex space-x-4">
                        {MOCK_PRODUCT.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${selectedImage === idx ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column: Product Details & Purchase Controls */}
                <div className="space-y-6">
                    <div>
                        <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                            {MOCK_PRODUCT.category}
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{MOCK_PRODUCT.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mt-3">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`text-sm ${i < Math.floor(MOCK_PRODUCT.rating) ? 'fill-yellow-400' : ''}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-gray-800">{MOCK_PRODUCT.rating}</span>
                            <span className="text-sm text-gray-400">({MOCK_PRODUCT.reviewsCount} reviews)</span>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline space-x-3">
                        <span className="text-3xl font-extrabold text-gray-900">${MOCK_PRODUCT.price}</span>
                        {MOCK_PRODUCT.oldPrice && (
                            <span className="text-lg text-gray-400 line-through">${MOCK_PRODUCT.oldPrice}</span>
                        )}
                        {MOCK_PRODUCT.discount && (
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2.5 py-1 rounded-md">
                                Save {MOCK_PRODUCT.discount}%
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed">{MOCK_PRODUCT.description}</p>

                    <hr className="border-gray-200" />

                    {/* Color Variants */}
                    <div>
                        <label className="text-sm font-semibold text-gray-900 block mb-2">
                            Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                        </label>
                        <div className="flex space-x-3">
                            {MOCK_PRODUCT.colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color.name)}
                                    style={{ backgroundColor: color.hex }}
                                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-indigo-600 border-white' : 'border-gray-300'
                                        }`}
                                    title={color.name}
                                >
                                    {selectedColor === color.name && (
                                        <FiCheck className={`text-xs ${color.name === 'Silver Gray' ? 'text-gray-900' : 'text-white'}`} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Variants */}
                    <div>
                        <label className="text-sm font-semibold text-gray-900 block mb-2">Variant / Size</label>
                        <div className="flex space-x-3">
                            {MOCK_PRODUCT.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${selectedSize === size
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity Selector & Add to Cart */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <div className="flex items-center border border-gray-300 rounded-xl w-32 justify-between px-3 py-2">
                            <button onClick={() => handleQuantityChange(-1)} className="text-gray-500 hover:text-gray-800">
                                <FiMinus />
                            </button>
                            <span className="font-bold text-gray-800">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className="text-gray-500 hover:text-gray-800">
                                <FiPlus />
                            </button>
                        </div>

                        <button className="flex-1 bg-indigo-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-md">
                            <FiShoppingCart className="text-lg" />
                            <span>Add to Cart</span>
                        </button>

                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`p-3.5 border rounded-xl transition ${isWishlisted ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <FiHeart className={`text-xl ${isWishlisted ? 'fill-red-500' : ''}`} />
                        </button>
                    </div>

                    {/* Value Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200 text-xs text-gray-600">
                        <div className="flex items-center space-x-2">
                            <FiTruck className="text-indigo-600 text-lg" />
                            <span>Free Express Delivery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FiShield className="text-indigo-600 text-lg" />
                            <span>1 Year Warranty</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FiRotateCcw className="text-indigo-600 text-lg" />
                            <span>30-Day Easy Return</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs (Description / Specs / Reviews) */}
            <div className="mt-16 border-t border-gray-200 pt-8">
                <div className="flex space-x-8 border-b border-gray-200">
                    {['description', 'specifications', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-sm font-semibold capitalize border-b-2 transition ${activeTab === tab
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="py-6">
                    {activeTab === 'description' && (
                        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                            {MOCK_PRODUCT.description} Designed with ergonomic memory foam earcups and active acoustic drivers to deliver immersive clarity across all frequency ranges.
                        </p>
                    )}

                    {activeTab === 'specifications' && (
                        <div className="max-w-xl divide-y divide-gray-100">
                            {MOCK_PRODUCT.specifications.map((spec) => (
                                <div key={spec.label} className="py-3 flex justify-between text-sm">
                                    <span className="text-gray-500">{spec.label}</span>
                                    <span className="font-medium text-gray-900">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="space-y-6 max-w-2xl">
                            {MOCK_REVIEWS.map((rev) => (
                                <div key={rev.id} className="p-4 bg-gray-50 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-900 text-sm">{rev.user}</span>
                                        <span className="text-xs text-gray-400">{rev.date}</span>
                                    </div>
                                    <div className="flex text-yellow-400 text-xs">
                                        {[...Array(rev.rating)].map((_, i) => (
                                            <FiStar key={i} className="fill-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-600">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}