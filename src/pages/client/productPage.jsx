import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/productCard";


export default function ProductPage() {
   const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {
            if (loading) {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
                        setProducts(res.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching products:", error);
                    });
            }
        },[loading]
    )

    return (
        <div className="w-full h-full flex flex-wrap items-center justify-center">
            {
                products.map((product) => {
                    return(
                        <ProductCard key={product.productId} product={product} />
                    )
                })
            }
        </div>
    )
}