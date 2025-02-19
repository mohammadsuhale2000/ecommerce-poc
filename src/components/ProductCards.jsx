import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/store/cartSlice";

const ProductCard = ({ product }) => {
  const { _id, name, price, quantity, images } = product;
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (items[_id]) {
      setCounter(items[_id].qty);
    } else {
      setCounter(0);
    }
  }, [items, _id]);

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

  return (
    <div
      className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 w-[200px] h-[250px]"
      onClick={() => router.push(`/product/${_id}`)}
    >
      <img
        className="w-[100px] h-[100px] object-cover rounded-md mx-auto transition-transform duration-300 transform hover:scale-105"
        src={images[0]}
        alt={name}
      />
      <div className="p-2 text-center">
        <h2 className="text-sm font-semibold text-gray-800 truncate">{name}</h2>
        <p className="text-gray-500 text-sm mt-1">₹{price}</p>
        <p className="text-gray-400 text-xs">{quantity} left</p>

        {counter === 0 ? (
          <button
            onClick={addToCart}
            className="mt-4 bg-green-400 text-white text-xs py-2 px-4 rounded-md hover:bg-green-500 transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center">
            <button
              id="decrease"
              className="mt-4 bg-green-400 text-white text-xs py-2 px-4 rounded-l-md hover:bg-green-500 transition duration-200 ease-in-out"
              onClick={removeFromCart}
            >
              -
            </button>
            <span
              className="mt-4 bg-green-400 text-white text-xs py-2 px-4 font-semibold"
            >
              {counter}
            </span>
            <button
              id="increase"
              className="mt-4 bg-green-400 text-white text-xs py-2 px-4 rounded-r-md hover:bg-green-500 transition duration-200 ease-in-out"
              onClick={addToCart}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
