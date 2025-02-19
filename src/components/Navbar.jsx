"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { signInSuccess, signOut } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import CartDrawer from "@/components/ui/CartDrawer"; 
const Navbar = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Search");
  const [categoryData, setCategoryData] = useState([]);
  const [categories, setCategories] = useState([
    "All Categories",
    "Fruits & Vegetables",
    "Daily use Products",
    "Masala & Dry Fruits",
    "Toys",
    "Baby Products",
    "Dairy Bread and Eggs",
  ]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { quantity } = useSelector((state) => state.cart);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/getuser");
        dispatch(signInSuccess(res.data));
      } catch (error) {
        dispatch(signOut());
      }
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setItems(quantity);
  }, [quantity]);
  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryPromises = categories.map((category) =>
        axios.post("/api/products/fetchdata", { category })
      );
      const categoryResponses = await Promise.all(categoryPromises);
      setCategoryData(categoryResponses.map((response) => response.data.data));
    };
    fetchCategoryData();
  }, [categories]);
  useEffect(() => {
    const products = ["Apple", "Bananas", "Toy Cars", "Milk", "Laptop", "Shoes"];
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholderText("Search " + products[index]);
      index = (index + 1) % products.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/?query=${search}`);
    setSearch("");
  };
  return (
    <nav className="bg-gradient-to-b from-fuchsia-200 to-white p-3 sticky top-0 left-0 right-0 z-50 shadow-md">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-white">
        <img src="/rapid mart logo.png" alt="Rapid Mart Logo" className="h-[50px] w-[80px]" />
      </Link>
  
      {/* Search Bar - Centered */}
      <div className="w-full md:w-auto flex justify-center mt-2 md:mt-0">
        <form onSubmit={handleSubmit} className="w-full md:w-[40vw] flex items-center">
          <div className="relative w-full">
            <AiOutlineSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder={placeholderText}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 px-4 py-2 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </form>
      </div>
  
      {/* Profile & Cart */}
      <div className="flex gap-3 items-center mt-2 md:mt-0">
        <Link
          href={currentUser ? "/profile" : "/login"}
          className={
            !currentUser
              ? "px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
              : "px-2 py-2 text-white"
          }
        >
          {currentUser ? <CgProfile size={30} color="black" /> : "Login"}
        </Link>
        <div
          onClick={() => setIsCartOpen(true)}
          className="cursor-pointer flex items-center justify-center relative"
        >
          <AiOutlineShoppingCart size={30} />
          {items > 0 && (
            <Badge
              variant="secondary"
              className="w-4 h-4 flex items-center justify-center text-xs absolute top-0 right-0"
            >
              {items}
            </Badge>
          )}
        </div>
      </div>
    </div>
    {/* Cart Drawer */}
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
  </nav>
  
  );
};
export default Navbar;