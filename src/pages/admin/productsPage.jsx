import { useEffect, useState } from 'react';
import { sampleProducts } from '../../assets/sampleData.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {

    const [products, setProducts] = useState(sampleProducts);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

     if(loading == true){

         axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });

     }

    }, [loading]);

    function deleteProduct(productId) {
        const token = localStorage.getItem("token");
        if (token === null) {
            toast.error("Please login to delete a product");
            return;
        }

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
            headers: {
                "Authorization": 'Bearer ' + token
            }
        }).then((res) => {
            toast.success("Product deleted successfully");
            setLoading(true); // Refresh the product list
        }).catch((error) => {
            toast.error("Failed to delete product");
        });
    }

    return (
        <div className="w-full h-full max-h-full overflow-y-scroll relative">

            <Link to="/admin/add-product" className='absolute bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600'>Add Product</Link>

          { loading ?  <div className='w-full h-full flex justify-center items-center'>
            <div className="w-[60px] h-[60px] border-[5px] border-gray-300 border-t-blue-900 rounded-full animate-spin"></div>
            </div> :
 
            <table className='w-full text-center'>
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Product ID</th>
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Image</th>
                        <th className="py-3 px-6 text-left">Labelled Price</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Stock</th>
                        <th className="py-3 px-6 text-left">Actions</th>
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
                                <td className="py-3 px-6 text-left whitespace-nowrap"><div className='flex justify-center items-center gap-2 w-full'>
                                                                                            <FaTrash onClick={() => {

                                                                                                deleteProduct(product.productId);

                                                                                            }} className='text-xl text-red-500 cursor-pointer' />

                                                                                            <FaEdit onClick={() => {

                                                                                                navigate("/admin/edit-product" , {
                                                                                                    state: product
                                                                                                });


                                                                                            }} className='text-xl text-blue-500 cursor-pointer' />
                                                                                       </div>
                                </td>
                            </tr>
                        )

                    })}
                </tbody>
            </table> 

         }


       </div>
    );
}