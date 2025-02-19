"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCards";
import { Suspense } from "react";
import axios from "axios";
function Page() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const router = useRouter(); // Use useRouter for navigation
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`/api/products/searchproduct?query=${search}`);
        const response = res.data;
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
        setLoading(false);
      }
    };
    fetchResults();
  }, [search]);
  const handleClearSearch = () => {
    router.push("/"); 
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="md:mx-20 md:my-6">
      <div className="flex justify-between items-center">
        <span>{searchResults.length} results found</span>
        <button
          onClick={handleClearSearch}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 my-5 mb-14 md:mb-5">
        {searchResults.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
export default function SuspendedPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}