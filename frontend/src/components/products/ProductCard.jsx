import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';

export default function ProductCard({ product }) {
    return (
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
                />
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-xs text-gray-600 hover:text-red-500 hover:bg-white shadow-xs transition">
                    <FiHeart className="text-lg" />
                </button>
                {product.discount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                        -{product.discount}%
                    </span>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-sm font-medium text-gray-900 mt-1 line-clamp-2 hover:text-indigo-600 transition">
                        {product.name}
                    </h3>
                    <div className="flex items-center space-x-1 mt-2">
                        <FiStar className="text-yellow-400 fill-yellow-400 text-xs" />
                        <span className="text-xs font-semibold text-gray-700">{product.rating || '4.5'}</span>
                        <span className="text-xs text-gray-400">({product.reviewsCount || 12})</span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        {product.oldPrice && (
                            <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>
                        )}
                    </div>
                    <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition">
                        <FiShoppingCart className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
}