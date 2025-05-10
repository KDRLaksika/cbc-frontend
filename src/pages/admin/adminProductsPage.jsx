import { useEffect, useState } from 'react';
import { sampleProducts } from '../../assets/sampleData.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminProductsPage() {

    const [products, setProducts] = useState(sampleProducts);

    useEffect(() => {

      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

    }, []);

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll relative">

            <Link to="/admin/add-product" className='absolute bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600'>Add Product</Link>

            <table className='w-full text-center'>
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Product ID</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Image</th>
                        <th className="py-3 px-6 text-left">Labelled Price</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => {
                        return (
                            <tr key={index} className="bg-white border-b hover:bg-gray-100 text-gray-600 text-sm leading-normal">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{product.productId}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{product.name}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap"><img src={product.images[0]} alt={product.name} className='w-[50px] h-[50px] object-cover' /></td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{product.labelledPrice}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{product.price}</td>
                                <td className="py-3 px-6 text-left whitespace-nowrap">{product.stock}</td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>

        </div>
    );
}