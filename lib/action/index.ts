"use server";

import Product from "@/modle/product.modle";
import { connectToDB } from "../mongoose";
import { scraqperanazondata } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { revalidatePath } from "next/cache";
import { User } from "@/types";
// import { generateEmailBody, sendEmail } from "../nodemailer";


export async function scrape(Url: string, site: string) {
  if (!Url) return;

  try {
    connectToDB();
    const scrapeproduct = await scraqperanazondata(Url);

    if (!scrapeproduct) {
      return;
    }

    let product = scrapeproduct;

    const existingProduct = await Product.findOne({
      url: scrapeproduct.productUrl,
    });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapeproduct.currentPrice },
      ];

      product = {
        ...scrapeproduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapeproduct.productUrl },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Provide valid Url ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if(!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

