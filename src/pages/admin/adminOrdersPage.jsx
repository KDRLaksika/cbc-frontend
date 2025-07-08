import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Make sure to set the root element for accessibility

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first to view orders");
        return;
      }

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          setOrders(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          toast.error("Failed to load orders");
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function openModal(order) {
    setActiveOrder(order);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setActiveOrder(null);
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-auto p-4">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Order Details"
            className="max-w-2xl w-full mx-auto mt-20 bg-white rounded-lg shadow-lg p-6 outline-none"
            overlayClassName="fixed inset-0 bg-[#00000040] flex justify-center items-start z-50"
          >
            {activeOrder && (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-accent">Order Details</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Order ID:</span>
                    <span>{activeOrder.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Name:</span>
                    <span>{activeOrder.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Email:</span>
                    <span>{activeOrder.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Phone:</span>
                    <span>{activeOrder.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Address:</span>
                    <span>{activeOrder.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Status:</span>
                    <span className="capitalize">{activeOrder.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Labelled Total:</span>
                    <span>${activeOrder.labelledTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span>${activeOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Date:</span>
                    <span>{new Date(activeOrder.date).toLocaleString()}</span>
                  </div>
                </div>

                {/* Product list section (if products are included) */}
                {activeOrder.products && activeOrder.products.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg mb-2">Products:</h3>
                    <ul className="space-y-1 list-disc list-inside">
                      {activeOrder.products.map((prod, idx) => (
                        <li key={idx}>
                          {prod.name} — Qty: {prod.quantity} — Price: ${prod.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button
                    onClick={closeModal}
                    className="mt-6 w-full bg-accent text-white py-2 rounded hover:bg-opacity-90 transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="mt-6 w-full bg-accent text-white py-2 rounded hover:bg-opacity-90 transition-all"
                  >
                    Print
                  </button>
                </div>
                
              </div>
            )}
          </Modal>

          <table className="w-full bg-white text-gray-700">
            <thead>
              <tr className="bg-accent text-white uppercase text-sm">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Total ($)</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => openModal(order)}
                  className="border-b hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <td className="py-3 px-4">{order.orderId}</td>
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4">{order.email}</td>
                  <td className="py-3 px-4">{order.address}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
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

