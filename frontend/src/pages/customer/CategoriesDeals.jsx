import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CategoriesDeals() {
    const [categories, setCategories] = useState([]);
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch categories and coupons/deals from your backend API
        Promise.all([
            axios.get('https://shop-cart-phi-plum.vercel.app/api/categories'),
            axios.get('https://shop-cart-phi-plum.vercel.app/api/coupons')
        ])
            .then(([catRes, dealRes]) => {
                setCategories(catRes.data.data || catRes.data);
                setDeals(dealRes.data.data || dealRes.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching categories and deals:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-12 text-gray-600">Loading categories and deals...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
            {/* Categories Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Shop by Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition cursor-pointer flex flex-col items-center"
                        >
                            <img
                                src={cat.imageUrl || 'https://via.placeholder.com/100'}
                                alt={cat.name}
                                className="w-16 h-16 object-cover rounded-full mb-3"
                            />
                            <span className="font-medium text-gray-800 text-sm">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Special Deals & What's Included Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Deals & Bundles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deals.map((deal) => (
                        <div key={deal.id} className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-6 shadow-sm">
                            <span className="bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                                {deal.code || 'Special Offer'}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mt-3">{deal.title || 'Exclusive Discount Bundle'}</h3>
                            <p className="text-gray-600 text-sm mt-1 mb-4">{deal.description || 'Save big on selected items with this bundle.'}</p>

                            <div className="bg-white rounded-lg p-3 border border-indigo-50 mb-4">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">What's Included:</p>
                                <ul className="space-y-1 text-sm text-gray-700">
                                    {deal.includedItems ? deal.includedItems.map((item, index) => (
                                        <li key={index} className="flex items-center">
                                            <span className="text-indigo-600 mr-2">✓</span> {item}
                                        </li>
                                    )) : (
                                        <li className="text-gray-500 italic">Applicable across all matching store products</li>
                                    )}
                                </ul>
                            </div>

                            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition">
                                Claim Deal
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}