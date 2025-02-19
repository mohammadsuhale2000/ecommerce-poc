"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, addItem, clearCart } from "@/store/cartSlice";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.price);
  const { currentUser } = useSelector((state) => state.user); 
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState("");

  // Increment item
  const handleAddItem = (item, key) => {
    dispatch(addItem({ ...item, _id: key }));
  };

  // Decrement or remove item
  const handleRemoveItem = (item, key) => {
    if (item.qty === 1) {
      dispatch(removeItem({ ...item, qty: 0, _id: key }));
    } else {
      dispatch(removeItem({ ...item, _id: key }));
    }
  };

  // Tip selection and clear
  const handleTipSelect = (amount) => {
    setSelectedTip(amount);
    if (amount !== "custom") {
      setCustomTip("");
    }
  };

  const handleClearTip = () => {
    setSelectedTip(null);
    setCustomTip("");
  };

  // Delivery charge & handling charge
  const deliveryCharge = 30;
  const handlingCharge = 4;
  const smallCartCharge = 20;
  const isCartEmpty = Object.keys(items).length === 0;

  // Calculate grand total with tip included
  const grandTotal = isCartEmpty
    ? totalPrice
    : totalPrice +
      deliveryCharge +
      handlingCharge +
      smallCartCharge +
      (selectedTip === "custom" ? parseFloat(customTip || 0) : selectedTip || 0);

  // Handle Checkout button click
  const handleCheckout = () => {
    if (currentUser) {
      router.push(`/payment/?amount=${grandTotal}`);
    } else {
      router.push("/login");
    }
    onClose();
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full md:w-[400px] h-full bg-white shadow-lg p-4 overflow-y-auto z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Toaster />
      {/* Header with Checkout button */}
      <div className="flex items-center justify-between border-b pb-2">
        <h2 className="text-gray-500 font-bold text-center text-lg">
          Shopping Cart
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 font-medium"
        >
          <AiOutlineClose size={24} />
        </button>
      </div>

      {/* Cart Items */}
      <div
        className="mt-4 flex-1 overflow-y-auto no-scrollbar"
        style={{ maxHeight: "calc(100vh - 250px)" }}
      >
       
       <div>
       <h3 className="text-lg font-bold mb-2">Cart Items</h3>
       
       </div>
        {isCartEmpty ? (
          <div>
            <p className="text-gray-500 font-bold text-lg">
              Your cart is empty! 🛒😞
            </p>
            <p className="text-sm text-gray-400">
              Start adding delicious food to your cart.
            </p>
            {/* Home button */}
            <Button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Go to Home
            </Button>
          </div>
        ) : (
          Object.keys(items).map((key) => {
            const item = items[key];
            return (
              <div
                key={key}
                className="flex items-center justify-between py-3 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded mr-3"
                  />
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-600">Price: ₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 text-sm font-semibold rounded hover:bg-gray-300"
                    onClick={() => handleRemoveItem(item, key)}
                  >
                    -
                  </button>
                  <p className="w-6 text-center bg-gray-200 rounded">
                    {item.qty}
                  </p>
                  <button
                    className="px-2 py-1 bg-gray-200 text-sm font-semibold rounded hover:bg-gray-300"
                    onClick={() => handleAddItem(item, key)}
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Tip your Delivery Partner (Only when the cart is not empty) */}
      {!isCartEmpty && (
        <div className="bg-gray-100 p-4 rounded-lg mt-4 w-full">
          <h3 className="text-md font-bold">Tip your delivery partner</h3>
          {selectedTip && (
            <div className="text-sm font-semibold">
              ₹
              {selectedTip === "custom" && customTip ? customTip : selectedTip !== "custom" ? selectedTip : "0"}
              <button className="ml-2 text-blue-500 underline" onClick={handleClearTip}>
                Clear
              </button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">Your kindness means a lot! 100% of your tip will go directly to your delivery partner.</p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => handleTipSelect(20)} className={`px-4 py-2 bg-white border rounded-lg ${selectedTip === 20 ? "border-green-500" : ""}`}>
              ₹20
            </button>
            <button onClick={() => handleTipSelect(30)} className={`px-4 py-2 bg-white border rounded-lg ${selectedTip === 30 ? "border-green-500" : ""}`}>
              ₹30
            </button>
            <button onClick={() => handleTipSelect(50)} className={`px-4 py-2 bg-white border rounded-lg ${selectedTip === 50 ? "border-green-500" : ""}`}>
              ₹50
            </button>
            <button onClick={() => handleTipSelect("custom")} className={`px-4 py-2 bg-white border rounded-lg ${selectedTip === "custom" ? "border-green-500" : ""}`}>
              Custom
            </button>
          </div>
          {selectedTip === "custom" && (
            <div className="mt-2">
              <input
                type="number"
                value={customTip}
                onChange={(e) => setCustomTip(e.target.value)}
                placeholder="Enter custom tip"
                className="px-4 py-2 border rounded w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* Bill Details */}
      {!isCartEmpty && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-bold mb-2">Bill details</h3>
          <div className="flex justify-between text-sm">
            <p>Sub total</p>
            <p>₹{totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Delivery charge</p>
            <p>₹{deliveryCharge}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Handling charge</p>
            <p>₹{handlingCharge}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Small cart charge</p>
            <p>₹{smallCartCharge}</p>
          </div>
          <div className="flex justify-between text-sm font-bold border-t mt-2 pt-2">
            <p>Grand total</p>
            <p>₹{grandTotal.toFixed(2)}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      {!isCartEmpty && (
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">₹{grandTotal.toFixed(2)}</p>

            <Button onClick={handleCheckout} className="px-4 py-2">
              Proceed
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};



export default CartDrawer;
