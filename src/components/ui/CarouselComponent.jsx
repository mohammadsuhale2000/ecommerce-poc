"use client";
import Image from "next/image";
import './carouselStyles.css';

const CarouselComponent = () => {
  const bannerImage = "/banner.jpg";

  return (
    <div className="banner-wrapper">
      <div className="banner-container">
        <Image
          src={bannerImage}
          alt="Banner"
          width={1920} // Ensures full width on desktop
          height={400} // Maintains aspect ratio
          className="banner-image"
        />
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
