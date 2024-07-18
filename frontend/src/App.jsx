import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import clothingbanner from './assets/clothingbanner.png'
import cosmeticsbanner from './assets/cosmeticsbanner.png'
import electronicsbanner from './assets/electronicsbanner.png'
import Cart from './pages/Cart';
import Login from './pages/Login';

export default function App() {
  return (
    <main className="text-tertiary">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clothing" element={<Category Category={"clothing"} banner={clothingbanner}/>} />
          <Route path="/cosmetics" element={<Category Category={"cosmetics"} banner={cosmeticsbanner}/>} />
          <Route path="/electronics" element={<Category Category={"electronics"} banner={electronicsbanner} />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
           <Route path="/cart-page" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
