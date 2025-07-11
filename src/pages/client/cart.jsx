import React, { useState } from "react";
import { addToCart, getCart, removeFromCart, gettotal } from "../../utils/cart";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-start pt-4 relative px-2 md:px-30">

      {/* Cart items container */}
      <div className="w-full md:w-2/3 flex flex-col items-center">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="w-full max-w-[600px] my-4 p-2 rounded-3xl bg-primary shadow-2xl flex flex-col md:flex-row relative"
          >
            <div className="flex-shrink-0 flex justify-center items-center">
              <img src={item.image} className="w-[100px] h-[100px] object-cover rounded-3xl" />
            </div>

            <div className="flex flex-col justify-center items-start p-2 flex-1">
              <h1 className="text-lg md:text-xl text-secondary font-semibold">{item.name}</h1>
              <h1 className="text-sm text-gray-600 font-semibold">{item.productId}</h1>
              {item.labelledPrice > item.price ? (
                <div>
                  <span className="text-sm md:text-md mx-1 text-gray-500 line-through">
                    ${item.labelledPrice.toFixed(2)}
                  </span>
                  <span className="text-sm md:text-md mx-1 font-bold text-accent">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-sm md:text-md mx-1 font-bold text-accent">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-row justify-center items-center p-2">
              <button
                className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-lg md:text-xl cursor-pointer bg-accent"
                onClick={() => {
                  addToCart(item, -1);
                  setCart(getCart());
                }}
              >
                <BiMinus />
              </button>

              <span className="text-secondary font-semibold text-lg md:text-xl mx-2">{item.qty}</span>

              <button
                className="text-white font-bold rounded-xl hover:bg-secondary p-2 text-lg md:text-xl cursor-pointer bg-accent"
                onClick={() => {
                  addToCart(item, 1);
                  setCart(getCart());
                }}
              >
                <BiPlus />
              </button>
            </div>

            <div className="flex flex-col justify-center items-end p-2">
              <h1 className="text-lg md:text-2xl text-secondary font-semibold">
                Rs. ${item.price * item.qty}
              </h1>
            </div>

            <button
              className="absolute top-2 right-2 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white rounded-full p-2"
              onClick={() => {
                removeFromCart(item.productId);
                setCart(getCart());
              }}
            >
              <BiTrash />
            </button>
          </div>
        ))}
      </div>

      {/* Total and checkout box */}
      <div
        className="
          w-full max-w-[400px] h-auto shadow-2xl
          fixed bottom-4 left-1/2 -translate-x-1/2
          md:static md:translate-x-0 md:bottom-auto md:left-auto md:w-1/3
          flex flex-col justify-center items-center
          bg-white p-4 rounded-xl
        "
      >
        <p className="text-xl md:text-2xl text-secondary font-bold">
          Total:
          <span className="text-accent font-bold mx-2">
            {gettotal().toFixed(2)}
          </span>
        </p>
        <Link
          to="/checkout"
          state={{ cart: cart }}
          className="text-white bg-accent px-4 py-2 mt-2 rounded-lg font-bold hover:bg-secondary transition-all duration-300 w-full text-center"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}



