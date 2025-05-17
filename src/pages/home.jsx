import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./client/productPage";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header />
     
     <div className="w-full h-[calc(100%-80px)] flex items-center justify-center">
          <Routes path="/*">
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/Contact" element={<h1>Contact</h1>} />
            <Route path="/*" element={<h1>404 NOt Found</h1>} />
          </Routes>
     </div>


    </div>
  );
}
