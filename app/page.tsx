import React from "react";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import HeroCarousel from "@/components/HeroCarousel";
import { getAllProducts } from "@/lib/action";
import ProductCard from "@/components/ProductCard";

const Home = async () => {
  const allProducts = await getAllProducts()
  return (
    <>
      <section className="px-5 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Hear
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="Right Arrow"
                width={27}
                height={27}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of{" "}
              <span className="text-primary">PriceWise</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <SearchBar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h1 className="section-text">Trending</h1>
        <div className="flex flex-wrap gap-x-8 gap-y-15">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} products={product}/>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
