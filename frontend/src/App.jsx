import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerLayout from './components/layout/customerLayout';
import Login from './pages/auth/Login';
import Cart from './pages/customer/Cart';
import CategoriesDeals from './pages/customer/CategoriesDeals';
import Checkout from './pages/customer/Checkout';
import Home from './pages/customer/Home';
import ProductDetail from './pages/customer/ProductDetail';
import ProductListing from './pages/customer/ProductListing';
import Wishlist from './pages/customer/Wishlist';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route path="login" element={<Login/>} />
          <Route index element={<Home />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="products/:id" element={<ProductDetail/>}/>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="categories" element={<CategoriesDeals/>} />
          <Route path="wishlist" element={<Wishlist/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}