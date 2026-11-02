import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch wishlist items from your backend API
    axios.get('https://shop-cart-phi-plum.vercel.app/api/wishlist', { withCredentials: true })
      .then((res) => {
        setWishlistItems(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching wishlist:', err);
        setLoading(false);
      });
  }, []);

  const removeFromWishlist = (id) => {
    axios.delete(`https://shop-cart-phi-plum.vercel.app/api/wishlist/${id}`, { withCredentials: true })
      .then(() => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
      })
      .catch(err => console.error('Error removing item:', err));
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading your wishlist...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-white border rounded-xl">
          <p className="text-gray-500 mb-4">Your wishlist is currently empty.</p>
          <a href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Explore Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between">
              <div>
                <img 
                  src={item.imageUrl || 'https://via.placeholder.com/200'} 
                  alt={item.name} 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 font-bold mt-1">${item.price}</p>
              </div>
              <div className="mt-4 space-y-2">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm transition">
                  Move to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}