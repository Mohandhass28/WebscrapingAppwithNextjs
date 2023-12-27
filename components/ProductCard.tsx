import { Product } from "@/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface Props {
  products: Product;
}

const ProductCard = ({ products }: Props) => {
  return (
    <Link href={`/products/${products._id}`} className="product-card">
      <div className="product-card_img-container">
        <Image 
        src={products.image}
        alt={products.title}
        width={200}
        height={200}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="product-title">{products.title}</h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {products.category}
          </p>

          <p className="text-black text-lg font-semibold">
            <span>{products?.currency}</span>
            <span>{products?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
