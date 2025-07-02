import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverviewPage";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
     
     <div className="w-full h-[calc(100%-80px)] flex items-center justify-center">
          <Routes path="/*">
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/overview/:Id" element={<ProductOverviewPage/>} />
            <Route path="/*" element={<h1>404 Not Found</h1>} />
          </Routes>
     </div>


    </div>
  );
}
