import ProductCard from '../../components/products/ProductCard';

const MOCK_PRODUCTS = [
    { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'Electronics', price: 199.99, oldPrice: 249.99, discount: 20, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
    { id: 2, name: 'Minimalist Leather Wrist Watch', category: 'Accessories', price: 89.00, rating: 4.6, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
    { id: 3, name: 'Ergonomic Standing Desk Mat', category: 'Home & Office', price: 45.50, oldPrice: 55.00, discount: 17, rating: 4.4, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
    { id: 4, name: 'Smart Fitness Tracker Band', category: 'Electronics', price: 69.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500' },
];

export default function Home() {
    return (
        <div className="space-y-12">
            {/* Hero Banner */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <span className="bg-indigo-500/30 text-indigo-100 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
                            Summer Sale Live
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            Upgrade Your Lifestyle with Exclusive Tech & Wearables
                        </h1>
                        <p className="text-indigo-100 text-base">
                            Explore premium arrivals, verified ratings, and swift doorstep delivery.
                        </p>
                        <div className="pt-2">
                            <button className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition shadow-lg">
                                Shop Collection Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                        <p className="text-sm text-gray-500">Top-rated items selected by our customers</p>
                    </div>
                    <a href="/products" className="text-indigo-600 text-sm font-semibold hover:underline">View All &rarr;</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MOCK_PRODUCTS.map((prod) => (
                        <ProductCard key={prod.id} product={prod} />
                    ))}
                </div>
            </section>
        </div>
    );
}