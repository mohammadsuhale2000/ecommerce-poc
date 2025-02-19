"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import './carouselStyles.css'; 

const CarouselComponent = () => {
  const images = [
    "/10117508.jpg",
    "/10135204.jpg",
    "/10137826.jpg",
  ];

  return (
    <div className="my-3 w-[90vw] mx-auto h-[300px] overflow-hidden relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-full"
      >
        {images.map((imgSrc, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center h-full">
            <Image
              src={imgSrc}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev">
        &lt;
      </div>
      <div className="swiper-button-next">
        &gt;
      </div>
      {/* Continuous Scrolling Offers Section */}
      <div className="offers-container">
        <div className="offer-text">Limited Time Offer: 50% Off!</div>
        <div className="offer-text">Buy 1 Get 1 Free on All Items!</div>
        <div className="offer-text">Free Shipping on Orders Over ₹500!</div>
        <div className="offer-text">Limited Time Offer: 50% Off!</div>
        <div className="offer-text">Buy 1 Get 1 Free on All Items!</div>
        <div className="offer-text">Free Shipping on Orders Over ₹500!</div>
      </div>
    </div>
  );
};

export default CarouselComponent;


