import Image from "next/image";
import React from "react";
import logo from "../public/assets/icons/logo.svg";
import Link from "next/link";

const navicons = [
  { src: "/assets/icons/user.svg", alt: "user" },
  { src: "/assets/icons/black-heart.svg", alt: "search" },
  { src: "/assets/icons/search.svg", alt: "heart" },
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image src={logo} width={27} height={27} alt="logo" />
          <p className="nav-logo">
            Price<span className="text-primary">Wise</span>
          </p>
        </Link>

        <div className="flex items-center gap-4">
          {navicons.map((icon) => (
            <Image src={icon.src} alt={icon.alt} width={27} height={27}/>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
