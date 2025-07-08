import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          toast.error("Failed to load products");
          setLoading(false);
        });
    }
  }, [loading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to delete a product");
      return;
    }

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setLoading(true);
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-auto relative p-4">
      <Link
        to="/admin/add-product"
        className="fixed bottom-6 right-6 bg-accent text-white px-5 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all"
      >
        Add Product
      </Link>

      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full bg-white text-gray-700">
            <thead>
              <tr className="bg-accent text-white uppercase text-sm">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Label Price</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.productId}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="py-3 px-4">{product.productId}</td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{product.labelledPrice}</td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => deleteProduct(product.productId)}
                        className="text-red-500 hover:text-red-700 transition-all"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                      <button
                        onClick={() =>
                          navigate("/admin/edit-product", {
                            state: product,
                          })
                        }
                        className="text-blue-500 hover:text-blue-700 transition-all"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
