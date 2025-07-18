import { Link, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import AdminProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/loading";

export default function AdminPage(){

    const location = useLocation();
    const path = location.pathname;
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setStatus("unauthorized");
            toast.error("You are not authorized user");
            window.location.href = "/login";
        } else {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                if (response.data.role !== "admin") {
                    setStatus("unauthorized");
                    window.location.href = "/";
                } else {
                    setStatus("authorized");
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
                setStatus("unauthorized");
                toast.error("You are not authorized user");
                window.location.href = "/login";
            });
        }
    }, []);

    function getclass(name){
        if(path.includes(name)){
            return "bg-accent text-white p-4";
        }else{
            return "text-accent p-4";
        }
    }
    
    return(
        <div className="w-full h-screen flex bg-accent">

          { status === "loading" || status === "unauthorized" ? <Loading/> : 
          
            <>

                <div className="h-full w-[300px] test-accent font-bold gap-6 text-xl flex flex-col bg-white">
                    <Link className={getclass("products")} to="/admin/products">Products</Link>
                    <Link className={getclass("orders")} to="/admin/orders">Orders</Link>
                    <Link className={getclass("users")} to="/admin/users">Users</Link>
                    <Link className={getclass("reviews")} to="/admin/reviews">Reviews</Link>
                </div>

                <div className="h-full w-[calc(100%-300px)] border-accent border-4 rounded-xl bg-white">

                    <Routes path="/*">
                        <Route path="/products" element={<AdminProductsPage/>} />
                        <Route path="/users" element={<h1>users</h1>} />
                        <Route path="/orders" element={<AdminOrdersPage/>} />
                        <Route path="/reviews" element={<h1>Reviews</h1>} />
                        <Route path="/add-product" element={<AddProductPage/>} />
                        <Route path="/edit-product" element={<EditProductPage/>} />
                    </Routes>

                </div>

            </>

          }

        </div>
    );
} 