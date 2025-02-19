"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/store/cartSlice";
import axios from "axios";
import { FaBolt } from "react-icons/fa"; // Example for the TurboPower icon from react-icons
function Page() {
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(0);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/products/fetchproduct", { id: params.id });
        const response = res.data;
        setProduct({
          ...response.data,
          additionalInfo:
            response.data.additionalInfo ||
            "Enriched only with the best",
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
    const newCounter = counter - 1;
    setCounter(newCounter);
    dispatch(removeItem({ ...product, qty: newCounter }));
  };
  useEffect(() => {
    if (items[product._id]) {
      setCounter(items[product._id].qty);
    }
  }, [items, product._id]);
  return (
    <div className="flex md:flex-row flex-col w-full items-start justify-center gap-5 my-5 px-5">
      {/* Product Image */}
      <div className="w-1/2 md:h-[70vh] h-[30vh] border-2 border-black/5 rounded-md flex items-center justify-center">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : ""}
          alt={product.name}
          className="h-56"
        />
      </div>
      {/* Product Details & Additional Information */}
      <div className="w-1/2 my-4">
        <div className="flex flex-col gap-3 justify-start">
          <div className="flex items-center mt-4">
            <FaBolt className="text-yellow-500 mr-2" /> {/* TurboPower icon */}
            <p className="text-sm text-gray-700">Delivery in 7 minutes!</p>
          </div>
          <h1 className="text-2xl font-bold font-sans mt-1">{product.name}</h1>
          <p className="text-[14px] font-light">{product.quantity}</p>
          <h1 className="text-[14px] font-bold font-sans">₹ {product.price}</h1>
          {/* Product Highlights Section */}
          <div className="bg-gray-100 p-4 rounded-md mt-1">
            <h2 className="text-[16px] font-semibold">Product Highlights</h2>
            <ul className="list-disc pl-5">
              {product.highlights?.length > 0 ? (
                product.highlights.map((highlight, index) => (
                  <li key={index} className="text-[14px]">{highlight}</li>
                ))
              ) : (
                <li className="text-[14px]">Bringing you the best of nature and innovation in every product.</li>
              )}
            </ul>
          </div>
          {/* Additional Information Section */}
          <div className="bg-gray-100 p-4 rounded-md mt-1">
            <h2 className="text-[16px] font-semibold">Additional Information</h2>
            <p className="text-[14px]">{product.additionalInfo}</p>
            {/* Customer Care Details */}
            <div className="mt-3">
              <h3 className="text-[16px] font-semibold">Customer Care</h3>
              <p className="text-[14px]">
                In case of any issue, contact us at:{" "}
                <a href="mailto:support@zeptonow.com" className="text-blue-600">
                  support@raagvitech.com
                </a>
              </p>
            </div>
            {/* Seller Details */}
            <div className="mt-3">
              <h3 className="text-[14px] font-semibold">Seller Information</h3>
              <p className="text-[14px]">
                <strong>Seller Name:</strong> Raagvitech Convenience Private Limited
              </p>
              <p className="text-[14px]">
                <strong>Seller Address:</strong> RaagviTech 518, 5th Floor, Manjeera Majestic Commercial, JNTU Rd, Kukatpally Housing Board Colony, Kukatpally, Hyderabad, Telangana 500072
              </p>
              <p className="text-[14px]">
                <strong>Seller License No.:</strong> 11521998000248
              </p>
              <p className="text-[14px]">
                <strong>Country of Origin:</strong> India
              </p>
            </div>
          </div>
          {/* Cart Buttons */}
          {counter === 0 ? (
            <div style={{borderRadius:"10px"}}>
            <button
              onClick={addToCart}
              className="mt-4 bg-primary text-xs text-white py-2 px-4 rounded-md hover:bg-primary-dark z-10"
            >
              Add to Cart
            </button>
            </div>
          ) : (
            <div className="flex items-center mt-4">
              <button
                id="decrease"
                className="bg-primary text-white font-bold py-1 px-2 rounded-l"
                onClick={removeFromCart}
              >
                -
              </button>
              <input
                type="text"
                id="count"
                value={counter}
                className="w-16 py-1 text-center border border-gray-300 rounded-none select-none outline-none cursor-pointer"
                disabled
                readOnly
              />
              <button
                id="increase"
                className="bg-primary text-white font-bold py-1 px-2 rounded-r"
                onClick={addToCart}
              >
                +
              </button>
            </div>
          )}
          {/* Delivery Info Section */}
        </div>
      </div>
    </div>
  );
}
export default Page;



