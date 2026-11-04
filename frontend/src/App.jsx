import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import CustomerLayout from "./layout/CustomerLayout";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Home from "./pages/customer/Home";
import Login from "./pages/customer/Login";
import Products from "./pages/customer/Product";
import ProductDetail from "./pages/customer/ProductDetail";
import Wishlist from "./pages/customer/Wishlist";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="w-full min-h-screen flex flex-col bg-white text-[#30283B]">
                    <Toaster position="top-right" />
                    <Routes>
                        <Route element={<CustomerLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />}/>
                            <Route path="/products/:id" element={<ProductDetail />}/>
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Route>
                    <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;