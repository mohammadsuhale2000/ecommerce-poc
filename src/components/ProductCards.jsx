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
  className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 w-[180px] h-[280px] sm:w-[190px] sm:h-[250px]"
  onClick={() => router.push(`/product/${_id}`)}
>
  {/* Product Image */}
  <div className="w-full h-[120px] sm:h-[100px] flex items-center justify-center overflow-hidden relative">
    <img
      className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
      src={images[0]}
      alt={name}
    />
  </div>

  {/* Product Details */}
  <div className="p-2 text-center">
    <h2 className="text-xs font-semibold text-gray-800 truncate">{name}</h2>
    <p className="text-gray-500 text-xs mt-1">250ml</p>

    <div className="flex items-center justify-center space-x-2 mt-1">
      <p className="text-black font-bold text-sm">₹{price}</p>
      <p className="text-gray-400 text-xs line-through">₹129</p>
    </div>

    {/* Add to Cart */}
    {counter === 0 ? (
      <button
        onClick={addToCart}
        className="mt-2 border border-pink-500 text-pink-500 font-semibold text-xs py-1 px-3 rounded-md hover:bg-pink-500 hover:text-white transition duration-300 ease-in-out w-full"
      >
        Add to Cart
      </button>
    ) : (
      <div className="flex items-center justify-center mt-2 space-x-2">
        <button onClick={removeFromCart} className="px-3 py-1 bg-gray-200 rounded">-</button>
        <span className="text-sm">{counter}</span>
        <button onClick={addToCart} className="px-3 py-1 bg-gray-200 rounded">+</button>
      </div>
    )}
  </div>
</div>

  );

};

export default ProductCard;
