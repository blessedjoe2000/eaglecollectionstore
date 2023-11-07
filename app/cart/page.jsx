"use client";

import { useContext } from "react";
import Navbar from "../component/Navbar";
import { CartContext } from "../component/CartContext";

export default function page() {
  const { cartProducts } = useContext(CartContext);
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 gap-2 mt-10 mx-5">
        <div className="bg-white rounded-md p-5">
          {!cartProducts.length && <div>Your Cart is empty</div>}
        </div>
        <div className="bg-white flex flex-col p-5 rounded-md">
          {!!cartProducts.length && (
            <div>
              <h2 className="font-bold mb-3">Order information</h2>

              <input type="text" placeholder="Enter Name" />
              <input type="text" placeholder="Enter Address" />
              <button className=" bg-main-purple px-3 py-1 rounded-md text-white text-center">
                Continue to payment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
