"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/store/cartSlice";
import axios from "axios";
import { FaBolt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

function Page() {
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(0);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/products/fetchproduct", { id: params.id });
        const response = res.data;
        setProduct({
          ...response.data,
          additionalInfo: response.data.additionalInfo || "Enriched only with the best",
        });
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };
    fetchData();
  }, [params]);

  const addToCart = (event) => {
    event.stopPropagation();
    const newCounter = counter + 1;
    setCounter(newCounter);
    dispatch(addItem({ ...product, qty: newCounter }));
  };

  const removeFromCart = (event) => {
    event.stopPropagation();
    if (counter > 0) {
      const newCounter = counter - 1;
      setCounter(newCounter);
      dispatch(removeItem({ ...product, qty: newCounter }));
    }
  };

  useEffect(() => {
    if (items[product._id]) {
      setCounter(items[product._id].qty);
    }
  }, [items, product._id]);

  return (
    <div className="relative flex flex-col md:flex-row w-full items-center md:items-start justify-center gap-5 my-5 px-3 sm:px-5">
      <div className="absolute top-2 left-2 z-10">
        <button
          className="bg-white shadow-md rounded-full p-2 mb-7 hover:bg-gray-100 transition"
          onClick={() => router.push("/")}
        >
          <IoArrowBack className="text-lg text-gray-600" />
        </button>
      </div>
      {/* Product Image Container */}
      <div className="relative w-full md:w-1/3 mt-16 h-[30vh] md:h-[60vh] border-2 border-black/5 rounded-md flex items-center justify-center shadow-lg transition-transform hover:scale-105 overflow-hidden">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : ""}
          alt={product.name}
          className="h-full w-auto max-w-full object-contain"
        />
      </div>
      {/* Product Details & Additional Information */}
      <div className="w-full md:w-2/3 my-4 px-2 sm:px-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center">
            <FaBolt className="text-yellow-500 mr-2 animate-pulse" />
            <p className="text-sm sm:text-base text-gray-700">Delivery in 7 minutes!</p>
          </div>
          <h1 className="text-lg sm:text-2xl font-bold">{product.name}</h1>
          <p className="text-sm sm:text-base font-light">{product.quantity}</p>
          {/* Price & Add to Cart Button */}
          <div className="flex items-center justify-between pr-6">
            <h1 className="text-sm sm:text-base font-bold text-green-600">₹ {product.price}</h1>
            {counter === 0 ? (
              <button
                onClick={addToCart}
                className="bg-white border border-pink-600 text-black-600 text-xs sm:text-sm py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center gap-3 border border-pink-600 px-6 py-2 rounded-md shadow-md">
                <button onClick={removeFromCart} className="text-red-600 font-bold text-lg">-</button>
                <span className="text-sm sm:text-base font-bold">{counter}</span>
                <button onClick={addToCart} className="text-green-600 font-bold text-lg">+</button>
              </div>
            )}
          </div>
          {/* Product Highlights Section */}
          <div className="bg-white p-3 sm:p-4 rounded-md mt-2 shadow-md">
            <h2 className="text-base font-semibold">Product Highlights</h2>
            <ul className="list-disc pl-4">
              {product.highlights?.length > 0 ? (
                product.highlights.map((highlight, index) => (
                  <li key={index} className="text-sm">{highlight}</li>
                ))
              ) : (
                <li className="text-sm">Bringing you the best of nature and innovation in every product.</li>
              )}
            </ul>
          </div>
          {/* Additional Information Section */}
          <div className="bg-white p-3 sm:p-4 rounded-md mt-2 shadow-md">
            <h2 className="text-base font-semibold">Additional Information</h2>
            <p className="text-sm">{product.additionalInfo}</p>
          </div>
          {/* Seller & Customer Care Details */}
          <div className="bg-white p-3 sm:p-4 rounded-md mt-2 shadow-md">
            <h3 className="text-base font-semibold">Customer Care</h3>
            <p className="text-sm">
              In case of any issue, contact us at: <a href="mailto:support@raagvitech.com" className="text-blue-600">support@raagvitech.com</a>
            </p>
            <h3 className="text-base font-semibold mt-2">Seller Information</h3>
            <p className="text-sm"><strong>Seller Name:</strong> Raagvitech Convenience Private Limited</p>
            <p className="text-sm"><strong>Seller Address:</strong> RaagviTech 518, 5th Floor, Manjeera Majestic Commercial, JNTU Rd, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072</p>
            <p className="text-sm"><strong>Seller License No.:</strong> 11521998000248</p>
            <p className="text-sm"><strong>Country of Origin:</strong> India</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
