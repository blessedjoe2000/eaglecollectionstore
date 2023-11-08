"use client";

import { useContext, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { CartContext } from "../component/CartContext";
import axios from "axios";

export default function page() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  const increaseQuantity = (id) => {
    addProduct(id);
  };

  const decreaseQuantity = (id) => {
    removeProduct(id);
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price =
      products?.find((product) => product._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-2 gap-2 mt-10 mx-5">
        <div className="bg-white rounded-md p-5">
          <h2 className="font-bold mb-3 text-lg text-main-pink">Cart</h2>
          {!cartProducts?.length && <div>Your Cart is empty</div>}
          {products.length > 0 && (
            <table className="table-auto">
              <thead className="">
                <tr className="">
                  <th className="">Product</th>
                  <th className="">Quantity</th>
                  <th className="">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="">
                    <td className=" ">
                      <img
                        className="w-24 rounded-md"
                        src={product.images[0]}
                        alt={`${product.title} image`}
                      />
                      {product.title}{" "}
                    </td>
                    <td className=" ">
                      <button
                        onClick={() => decreaseQuantity(product._id)}
                        className=" text-xl font-bold px-2 rounded-md mr-1 bg-gray-100"
                      >
                        -
                      </button>
                      {
                        cartProducts?.filter(
                          (productId) => productId === product._id
                        ).length
                      }

                      <button
                        onClick={() => increaseQuantity(product._id)}
                        className=" text-xl font-bold px-2 rounded-md ml-1 bg-gray-100"
                      >
                        {" "}
                        +
                      </button>
                    </td>
                    <td className=" ">
                      $
                      {cartProducts?.filter(
                        (productId) => product._id === productId
                      ).length * product.price}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="font-bold">Total</td>
                  <td></td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="bg-white flex flex-col p-5 rounded-md">
          {!!cartProducts?.length && (
            <div>
              <h2 className="font-bold mb-3 text-lg text-main-pink">
                Order information
              </h2>

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => e.target.value}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => e.target.value}
              />
              <input
                type="text"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => e.target.value}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => e.target.value}
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Zip code"
                  value={zipCode}
                  onChange={(e) => e.target.value}
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => e.target.value}
                />
              </div>
              <button className=" bg-main-pink px-3 py-1 rounded-md text-white text-center">
                Continue to payment
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
