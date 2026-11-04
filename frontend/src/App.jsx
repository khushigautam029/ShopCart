import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CustomerLayout from "./layout/CustomerLayout";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Home from "./pages/customer/Home";
import Login from "./pages/customer/Login";
import OrderSuccess from "./pages/customer/OrderSuccess";
import Products from "./pages/customer/Product";
import ProductDetail from "./pages/customer/ProductDetail";
import Profile from "./pages/customer/Profile";
import Wishlist from "./pages/customer/Wishlist";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <div className="w-full min-h-screen flex flex-col bg-white text-[#30283B]">
                        <Toaster position="top-right" />
                        <Routes>
                            <Route element={<CustomerLayout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/products/:id" element={<ProductDetail />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/wishlist" element={<Wishlist />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/order-success" element={<OrderSuccess />}/>
                            </Route>
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;