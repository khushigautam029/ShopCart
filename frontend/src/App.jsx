import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerLayout from './components/layout/customerLayout';
import Login from './pages/auth/Login';
import Cart from './pages/customer/Cart';
import CategoriesDeals from './pages/customer/CategoriesDeals';
import Checkout from './pages/customer/Checkout';
import Home from './pages/customer/home';
import ProductDetail from './pages/customer/ProductDetail';
import ProductListing from './pages/customer/ProductListing';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}