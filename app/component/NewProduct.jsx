"use client";
import Link from "next/link";
import { useState } from "react";

export default function NewProduct({ newProducts }) {
  const [addFavorite, setAddFavorite] = useState("");

  const toggleFavorite = () => {
    setAddFavorite(!addFavorite);
  };
  return (
    <div className="mx-5 ">
      <h1 className=" my-5 text-center text-3xl font-bold text-main-purple">
        New Products
      </h1>
      <div className="flex gap-2 flex-wrap">
        {newProducts?.map((product) => (
          <div
            key={product?._id}
            className="flex flex-col rounded-sm shadow-lg p-2 bg-white xl:w-1/5 lg:w-1/4  md:w-1/3 sm:w-full"
          >
            <div>
              <Link href={"/product/" + product._id} className="">
                <img
                  className="rounded-md "
                  src={product?.images[0]}
                  alt="product"
                />
              </Link>
            </div>

            <div>
              <Link href={"/product/" + product._id}>
                <h2 className=" font-bold text-2xl text-main-purple">
                  {product?.title}
                </h2>
              </Link>

              <p className="text-sm my-2">{product?.description}</p>
            </div>
            <div className="flex gap-2 justify-between items-center mt-2">
              <p className=" px-2 py-1 bg-main-pink text-white rounded-lg font-bold">
                ${product?.price}
              </p>
              <button onClick={toggleFavorite}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={
                    addFavorite ? "fill-main-purple w-6 h-6 " : "w-6 h-6"
                  }
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
              <button className="bg-main-purple border-2 border-main-purple text-white px-2 py-1 rounded-md text-sm flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
