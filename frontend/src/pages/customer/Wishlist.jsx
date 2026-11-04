
import { useState } from "react";
import toast from "react-hot-toast";
import {
    FiArrowLeft,
    FiHeart,
    FiShoppingCart,
    FiTrash2
} from "react-icons/fi";
import { Link } from "react-router-dom";

const initialWishlist = [
    {
        id: 1,
        name: "Premium Casual Sneakers",
        category: "Footwear",
        price: 2499,
        oldPrice: 3299,
        rating: 4.8,
        discount: 24,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    },
    {
        id: 2,
        name: "Classic Women's Handbag",
        category: "Accessories",
        price: 1899,
        oldPrice: 2499,
        rating: 4.6,
        discount: 24,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    },
    {
        id: 3,
        name: "Minimal Analog Watch",
        category: "Watches",
        price: 1599,
        oldPrice: 2199,
        rating: 4.7,
        discount: 27,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
    {
        id: 4,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2999,
        oldPrice: 3999,
        rating: 4.5,
        discount: 25,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
];

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(initialWishlist);
    const [cart, setCart] = useState([]);

    const removeItem = (id) => {
        setWishlist((items) =>
            items.filter((item) => item.id !== id)
        );
        toast.success("Removed from wishlist");
    };

    const addToCart = (product) => {
        setCart((items) => {
            const exists = items.some(
                (item) => item.id === product.id
            );

            if (exists) {
                toast.success("Product is already in your demo cart");
                return items;
            }

            toast.success("Added to demo cart");
            return [...items, product];
        });
    };

    const formatPrice = (price) =>
        `₹${price.toLocaleString("en-IN")}`;

    return (
        <div className="min-h-screen bg-[#F8F6FB] py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-[#7652A5] hover:text-[#5E3F89] mb-6"
                >
                    <FiArrowLeft />
                    Continue Shopping
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#30283B]">
                            My Wishlist
                        </h1>
                        <p className="text-[#77717F] mt-2">
                            Your favorite products, all in one place.
                        </p>
                    </div>

                    {wishlist.length > 0 && (
                        <span className="bg-[#E9E0F5] text-[#5E3F89] px-4 py-2 rounded-full text-sm font-semibold w-fit">
                            {wishlist.length} Saved Products
                        </span>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-[#E9E0F5] min-h-[400px] flex flex-col items-center justify-center text-center px-5">
                        <div className="w-24 h-24 rounded-full bg-[#F1EAF8] flex items-center justify-center mb-6">
                            <FiHeart className="text-4xl text-[#7652A5]" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#30283B]">
                            Your wishlist is empty
                        </h2>

                        <p className="text-[#77717F] mt-2 mb-6 max-w-md">
                            Save products you love and come back to them whenever you want.
                        </p>

                        <Link
                            to="/products"
                            className="bg-[#7652A5] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#5E3F89] transition"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl border border-[#E9E0F5] overflow-hidden group hover:shadow-lg transition duration-300"
                            >
                                <div className="relative bg-[#F8F6FB] overflow-hidden">
                                    <Link to={`/products/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </Link>

                                    <span className="absolute top-3 left-3 bg-[#7652A5] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                                        {product.discount}% OFF
                                    </span>

                                    <button
                                        onClick={() => removeItem(product.id)}
                                        className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center text-red-500 shadow hover:bg-red-50 transition"
                                        title="Remove from wishlist"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>

                                <div className="p-4">
                                    <p className="text-xs text-[#7652A5] font-medium mb-1">
                                        {product.category}
                                    </p>

                                    <Link to={`/products/${product.id}`}>
                                        <h3 className="font-semibold text-[#30283B] hover:text-[#7652A5] transition line-clamp-1">
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center gap-1 mt-2 text-sm">
                                        <span className="text-yellow-500">★</span>
                                        <span className="text-[#30283B] font-medium">
                                            {product.rating}
                                        </span>
                                        <span className="text-[#A09AA8]">
                                            Customer rating
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="font-bold text-lg text-[#30283B]">
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className="text-sm text-[#A09AA8] line-through">
                                            {formatPrice(product.oldPrice)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        className="mt-4 w-full flex items-center justify-center gap-2 bg-[#7652A5] text-white py-3 rounded-xl font-medium hover:bg-[#5E3F89] transition"
                                    >
                                        <FiShoppingCart />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {wishlist.length > 0 && (
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-sm text-[#77717F]">
                            Keep exploring and discover more products.
                        </p>

                        <button
                            onClick={() => {
                                setWishlist([]);
                                toast.success("Wishlist cleared");
                            }}
                            className="text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                            Clear Wishlist
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
