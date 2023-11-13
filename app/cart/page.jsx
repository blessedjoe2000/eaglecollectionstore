"use client";

import { useContext, useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { CartContext } from "../component/CartContext";
import axios from "axios";

export default function page() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window?.location.href.includes("success")
    ) {
      setIsSuccess(true);
      clearCart();
      console.log("cartProducts", cartProducts);
    }
  }, []);

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

  const handleToPayment = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phone,
      address,
      zipCode,
      country,
      cartProducts,
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="bg-white mx-5 text-center py-10 ">
          <h1 className="font-bold py-2 text-lg">
            Payment Successful! Thank you for shopping with us.
          </h1>
          <p>We will email you when your order is sent.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 gap-2 mt-10 mx-5 sm:grid-cols-2">
        <div className="bg-white rounded-md p-5 ">
          <h2 className="font-bold mb-3 text-lg text-main-pink">Cart</h2>
          <div>{!cartProducts?.length && <div>Your Cart is empty</div>}</div>
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
                      <div className="text-main-purple">{product.title}</div>
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
              <form onSubmit={handleToPayment}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className=" bg-main-pink px-3 py-1 rounded-md text-white text-center"
                >
                  Continue to payment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
