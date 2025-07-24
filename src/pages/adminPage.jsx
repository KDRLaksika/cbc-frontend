import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const [status, setStatus] = useState("loading");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("unauthorized");
      toast.error("You are not authorized user");
      window.location.href = "/login";
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.data.role !== "admin") {
            setStatus("unauthorized");
            window.location.href = "/";
          } else {
            setStatus("authorized");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setStatus("unauthorized");
          toast.error("You are not authorized user");
          window.location.href = "/login";
        });
    }
  }, []);

  function getclass(name) {
    return path.includes(name)
      ? "bg-accent text-white p-4 rounded"
      : "text-accent p-4 rounded hover:bg-accent hover:text-white";
  }

  if (status === "loading" || status === "unauthorized") return <Loading />;

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-accent">
      {/* Sidebar */}
      <div className="bg-white md:w-[300px] md:h-full flex flex-col gap-2 p-4 text-xl font-bold shadow md:shadow-none">
        {/* Mobile menu toggle */}
        <div className="flex items-center justify-between md:hidden mb-4">
          <h2 className="text-accent text-2xl">Admin Menu</h2>
          <button
            className="bg-accent text-white px-3 py-1 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Menu Links */}
        <div className={`${menuOpen ? "flex" : "hidden"} flex-col md:flex`}>
          <Link className={getclass("products")} to="/admin/products">Products</Link>
          <Link className={getclass("orders")} to="/admin/orders">Orders</Link>
          <Link className={getclass("users")} to="/admin/users">Users</Link>
          <Link className={getclass("reviews")} to="/admin/reviews">Reviews</Link>
          <Link className={getclass("add-product")} to="/">logout</Link>     
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-auto border-t-4 md:border-t-0 md:border-l-4 border-accent rounded-t-xl md:rounded-l-xl bg-white p-4">
        <Routes>
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/orders" element={<AdminOrdersPage />} />
          <Route path="/reviews" element={<h1>Reviews</h1>} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />
        </Routes>
      </div>
    </div>
  );
}
