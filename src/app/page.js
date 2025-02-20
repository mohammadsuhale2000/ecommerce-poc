"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCards";
import CarouselComponent from "@/components/ui/CarouselComponent";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";

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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [priceRange, setPriceRange] = useState(1000);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const getProductsByCategory = (categoryName) => {
    const categoryIndex = categories.indexOf(categoryName);
    return categoryData[categoryIndex] || [];
  };

  const selectedProducts = getProductsByCategory(selectedCategory).filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  return (
    <div className="my-3 w-full relative">
      {/* Carousel only for "All Categories" */}
      {selectedCategory === "All Categories" && <CarouselComponent />}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/5 bg-white border-r border-gray-200 p-4 md:sticky top-0 h-auto md:h-screen overflow-y-auto">
          {/* Category Toggle Header - Arrow visible only in mobile */}
          <div
            className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-gray-100 md:block"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <h2 className="text-sm font-semibold">
              {isCategoryOpen || isDesktop ? "Categories" : selectedCategory}
            </h2>
            <div className="block md:hidden">
              {isCategoryOpen ? (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              )}
            </div>
          </div>

          {/* Categories List - Always open in desktop, toggle in mobile */}
          {(isCategoryOpen || isDesktop) && (
            <ul className="space-y-1 mt-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 p-2 rounded-lg border hover:bg-gray-100 ${
                    selectedCategory === category ? "bg-gray-200" : ""
                  }`}
                >
                  <Image
                    src={`/logo ${index + 2}.png`}
                    alt={category}
                    width={40}
                    height={40}
                    className="rounded-md object-cover"
                  />
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsCategoryOpen(false); // Close dropdown on mobile
                    }}
                    className={`text-xs font-medium ${
                      selectedCategory === category
                        ? "text-green-600"
                        : "text-gray-800"
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Listings */}
        <div className="w-full md:w-4/5">
          <div className="mt-2 mb-15">
            {/* Category Title & Price Filter */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2">
              {/* Breadcrumb Navigation - Always visible, stacked on mobile */}
              <div className="w-full pt-2 mt-[-35px] sm:mt-[-20px] pl-4">
                <div className="flex items-center text-sm text-gray-600">
                  <a
                    href="/"
                    className="text-blue-600 hover:underline text-xs sm:text-sm"
                  >
                    Home
                  </a>
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
                  <span className="font-medium text-gray-800 text-xs sm:text-sm">
                    {selectedCategory}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg flex items-center gap-3 w-full md:w-auto whitespace-nowrap">
                <h2 className="text-sm font-semibold">Price Range:</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs">₹{minPrice}</span>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => {
                      setPriceRange(e.target.value);
                      setMaxPrice(e.target.value);
                    }}
                    className="w-32 appearance-none h-[2px] bg-blue-300 rounded outline-none"
                  />
                  <span className="text-xs">₹{priceRange}</span>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {selectedCategory === "All Categories" ? (
                categoryData
                  .flat()
                  .filter(
                    (product) =>
                      product.price >= minPrice && product.price <= maxPrice
                  )
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
