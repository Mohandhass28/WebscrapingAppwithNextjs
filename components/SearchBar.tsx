"use client";

import { scrape } from "@/lib/action";
import { Flamenco } from "next/font/google";
import { FormEvent, useState } from "react";

let sitename = ''

const isvalidAmazonLink = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    sitename = hostname
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.includes("amazon") ||
      hostname.includes("flipkart.com") ||
      hostname.includes("flipkart") ||
      hostname.includes("flipkart.")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

const SearchBar = () => {
  const [values, setvalues] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handlesumit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isvalidLink = isvalidAmazonLink(values);
    if (!isvalidLink) return alert("please Provide a Valid Amazon Link");

    try {
      setisLoading(true);
      const produ = await scrape(values, sitename);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handlesumit}>
      <input
        value={values}
        onChange={(e) => setvalues(e.target.value)}
        type="text"
        placeholder="Enter Product Link"
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-btn" disabled={values === ""}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
