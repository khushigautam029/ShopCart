import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CustomerLayout from './components/layout/customerLayout';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import Home from './pages/customer/home';
import ProductDetail from './pages/customer/ProductDetail';
import ProductListing from './pages/customer/ProductListing';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="products/:id" element={<ProductDetail/>}/>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}