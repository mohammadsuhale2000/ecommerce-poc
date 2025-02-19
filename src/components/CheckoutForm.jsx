"use client"; // Only needed if you're using Next.js App Router

import React, { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "./ui/button";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; // Correct Next.js router import

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter(); // Using Next.js router for redirection

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!elements) {
      toast.error("Some error occurred internally. Please try again later.");
      setIsLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast.error("An error occurred while submitting the form. Please try again later");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Failed to create payment intent");

      const data = await res.json();
      if (!data.clientSecret) throw new Error("No clientSecret returned from server");

      const { clientSecret } = data;
      console.log(clientSecret);

      const { error: confirmError } = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-status`, 
        },
      });

      if (confirmError) {
        toast.error(confirmError.message);
        setIsLoading(false);
        return;
      }

      toast.success("Payment processed successfully!");
      router.push("/orders/order-status"); // Navigate to order status page
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Button variant="default" type="submit" className="mt-6 w-full py-2 px-4 rounded transition duration-200">
            {isLoading ? "Processing your payment..." : "Proceed To Pay"}
          </Button>
        </form>
      </div>
    </div>
  );
}
