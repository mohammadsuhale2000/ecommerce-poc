"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCards";
import CarouselComponent from "@/components/ui/CarouselComponent";
import Image from "next/image";

// Define the static categories
const categories = [
  "All Categories",
  "Fruits & Vegetables",
  "Daily use Products",
  "Masala & Dry Fruits",
  "Toys",
  "Baby Products",
  "Dairy Bread and Eggs",
];

const Page = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryPromises = categories.map((category) =>
        axios.post("/api/products/fetchdata", { category })
      );
      const categoryResponses = await Promise.all(categoryPromises);
      const categoryData = categoryResponses.map(
        (response) => response.data.data
      );
      setCategoryData(categoryData);
    };

    fetchCategoryData();
  }, []);

  // Filter products based on selected category
  const getProductsByCategory = (categoryName) => {
    const categoryIndex = categories.indexOf(categoryName);
    return categoryData[categoryIndex] || [];
  };

  const selectedProducts = getProductsByCategory(selectedCategory);

  if (categoryData.length <= 0) {
    return (
      <div className="w-[90vw] mx-auto space-y-10">
        <Skeleton className="h-[200px] w-full rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <div className="flex space-x-4">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-[200px] w-[200px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="my-3 w-full">
      {/* Carousel only shows if 'All Categories' is selected */}
      {selectedCategory === "All Categories" && <CarouselComponent />}

      <div className="offers-container">
        <div className="offer-text">Limited Time Offer: 50% Off!</div>
        <div className="offer-text">Buy 1 Get 1 Free on All Items!</div>
        <div className="offer-text">Free Shipping on Orders Over ₹500!</div>
      </div>

      <div className="flex gap-10 my-3">
        {/* Static Category Sidebar */}
        <div className="w-1/5 bg-white border-r border-gray-200 p-4 sticky top-0 h-screen overflow-y-auto no-scrollbar">
          <h2 className="text-base font-semibold mb-4">Categories</h2>
          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer flex items-center gap-3 p-2 rounded-lg border hover:bg-gray-100 ${
                  selectedCategory === category
                    ? "bg-green-100 border-green-400"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={`/logo ${index + 2}.png`}
                  alt={category}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
                <span className="text-sm font-medium">{category}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Listings */}
        <div className="w-3/4">
          <div className="mt-10 mb-24">
            <h1 className="text-base font-semibold text-foreground mb-4">
              Products in {selectedCategory}
            </h1>

            {/* Updated Grid: Now 4 products per row on large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {selectedCategory === "All Categories" ? (
                categoryData
                  .flat()
                  .map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))
              ) : selectedProducts.length > 0 ? (
                selectedProducts.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              ) : (
                <p>No products available in this category</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
