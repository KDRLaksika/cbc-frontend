import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {

    const location = useLocation();
    console.log(location.state.cart);
    const [cart, setCart] = useState(location.state?.cart || []);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    function gettotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.qty;
        });
        return total;
    }

    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    }

    function changeQuantity(index, qty) {
        const newQty = cart[index].qty + qty;
        if (newQty <= 0) {
            removeFromCart(index);
            return;
        }else{
        const newCart = [...cart];
        newCart[index].qty = newQty;
        setCart(newCart);
        }
    }

    async function placeOrder() {
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token); // Add this line to check the token
        if (!token) {
            alert("Please login to place an order");
            return;
        }

        const orderinformation = {
            products : [],
            phone : phoneNumber,
            address : address,
        };

        for (let i = 0; i < cart.length; i++) {
            const item = {
                productId: cart[i].productId,
                quantity: cart[i].qty,
            }
            //orderinformation.products[i] = item;
            orderinformation.products.push(item);
        }

        console.log("Order payload:", orderinformation);

        try{
                const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", orderinformation, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            toast.success("Order placed successfully!");
            console.log(response.data);
        }catch(error) {
            console.log("Error placing order:", error);
            alert("Failed to place order. Please try again later.");
            return;
        }

    }

return (
    <div className="w-full h-full flex flex-col items-center pt-4 relative">
        {/* Cart Items First */}
        {
            cart.map((item, index) => (
                <div key={item.productId} className="w-[95%] md:w-[600px] my-4 h-auto md:h-[100px] rounded-3xl bg-primary shadow-2xl flex flex-col md:flex-row relative justify-center items-center p-2">
                    
                    <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" />

                    <div className="w-full md:w-[250px] flex flex-col justify-center items-start pl-4 mt-2 md:mt-0">
                        <h1 className="text-xl text-secondary font-semibold">{item.name}</h1>
                        <h1 className="text-md text-gray-600 font-semibold">{item.productId}</h1>
                        {
                            item.labelledPrice > item.price ? (
                                <div>
                                    <span className='text-md mx-1 text-gray-500 line-through'>${item.labelledPrice.toFixed(2)} </span>
                                    <span className='text-md mx-1 font-bold text-accent'>${item.price.toFixed(2)}</span>
                                </div>
                            ) : (
                                <div>
                                    <span className='text-md mx-1 font-bold text-accent'>${item.price.toFixed(2)}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className="flex flex-row justify-center items-center mt-2 md:mt-0">
                        <button
                            className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent"
                            onClick={() => changeQuantity(index, -1)}
                        >
                            <BiMinus />
                        </button>

                        <span className="text-secondary font-semibold text-xl mx-2">{item.qty}</span>

                        <button
                            className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-xl cursor-pointer aspect-square bg-accent"
                            onClick={() => changeQuantity(index, 1)}
                        >
                            <BiPlus />
                        </button>
                    </div>

                    <div className="w-full md:w-[200px] flex justify-end md:justify-end pr-4 mt-2 md:mt-0">
                        <h1 className="text-2xl text-secondary font-semibold">Rs. ${item.price * item.qty}</h1>
                    </div>

                    <button
                        className="absolute text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2 right-2 top-2 md:right-[-40px]"
                        onClick={() => removeFromCart(index)}
                    >
                        <BiTrash />
                    </button>
                </div>
            ))
        }

        {/* Total Box (After Cart Items to place below on sm) */}
        <div className="w-[95%] sm:static sm:mt-4 md:w-[400px] md:shadow-2xl md:absolute md:top-1 md:right-1 flex flex-col justify-center items-center m-3">
            <p className="text-2xl text-secondary font-bold">Total:
                <span className="text-accent font-bold mx-2">
                    {gettotal().toFixed(2) || 0}
                </span>
            </p>

            <div className="flex flex-col justify-center items-center mt-4 gap-2">
                <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full max-w-[300px] h-[40px] rounded-lg px-2 border border-accent"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Address"
                    className="w-full max-w-[300px] h-[40px] rounded-lg px-2 border border-accent"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            <button
                className="text-white bg-accent px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300 mt-2"
                onClick={placeOrder}
            >
                Place Order
            </button>
        </div>
    </div>
);


}