"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroimage = [
  { src: "/assets/images/hero-1.svg", alt: "SmartWatch" },
  { src: "/assets/images/hero-2.svg", alt: "bag" },
  { src: "/assets/images/hero-3.svg", alt: "lamp" },
  { src: "/assets/images/hero-4.svg", alt: "air fryer" },
  { src: "/assets/images/hero-5.svg", alt: "chair" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroimage.map((item) => (
          <Image
            src={item.src}
            alt={item.alt}
            width={484}
            height={484}
            className="object-contain"
            key={item.alt}
          />
        ))}
      </Carousel>

      <Image 
      src="/assets/icons/hand-drawn-arrow.svg"
      alt="Arrow"
      width={175}
      height={176}
      className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
