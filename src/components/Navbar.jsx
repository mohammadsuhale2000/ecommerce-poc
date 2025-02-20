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
import styles from './Navbar.module.css';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Search");

  const { currentUser } = useSelector((state) => state.user);
  const { quantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch User Data
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

  // Update Cart Items
  useEffect(() => {
    setItems(quantity);
  }, [quantity]);

  // Rotating Placeholder Text
  useEffect(() => {
    const products = ["Apple", "Bananas", "Toy Cars", "Milk", "Laptop", "Shoes"];
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholderText("Search " + products[index]);
      index = (index + 1) % products.length;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle Search Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/?query=${search}`);
    setSearch("");
  };

  return (
    <nav className={`${styles.navbar} sticky top-0 left-0 right-0 z-50 shadow-md`}>
      <div className={`${styles.container} max-w-7xl mx-auto`}>
        
        {/* Logo */}
        <Link href="/">
          <h2 className={styles.logo}>KARTIT</h2>
        </Link>

        {/* Search Bar */}
        <div className={`${styles["search-bar"]} mt-2 md:mt-0 px-2`}>
          <form onSubmit={handleSubmit} className="w-full max-w-xs md:max-w-md flex items-center">
            <div className="relative w-full">
              <AiOutlineSearch size={20} className={styles.icon} />
              <input
                type="search"
                placeholder={placeholderText}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`${styles["search-bar"]} pl-10 px-4 py-2 w-full rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
            </div>
          </form>
        </div>

        {/* Profile & Cart */}
        <div className="flex items-center space-x-3 mt-2 md:mt-0">
          {/* Profile/Login */}
          <button
            onClick={() => router.push(currentUser ? "/profile" : "/login")}
            className={`${styles["login-button"]}`}
          >
            {currentUser ? <CgProfile size={30} color="black" /> : "Login"}
          </button>

          {/* Cart Icon */}
          <div onClick={() => setIsCartOpen(true)} className={`cursor-pointer flex items-center justify-center relative ${styles["cart-icon"]}`}>
            <AiOutlineShoppingCart size={30} />
            {items > 0 && (
              <Badge variant="secondary" className="w-4 h-4 flex items-center justify-center text-xs absolute top-[-5px] right-[-5px]">
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
