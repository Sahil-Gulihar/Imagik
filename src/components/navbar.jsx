'use client'
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="flex bg-uff border border-gray-100 border-t-0 border-l-0 border-r-0 border-b-1 justify-between  sm:px-8 md:px-14">
      <div className="text-white py-4 flex-start flex gap-2">
        <Link href='/'>
        <Image
          src="https://i.imgur.com/wxtPvEO.png"
          alt="um"
          height={20}
          width={40}
          
        />
        </Link>
        <div className="py-2 font-sans">Imagik By S-Gulihar</div>
        
      </div>
      <div className="flex-end flex gap-2 py-4 text-white">
      {/* Dropdown here */}
      <div className="relative inline-block text-left px-4 bg-uff">
      <button
        onClick={toggleDropdown}
        className="bg-uff text-white px-4 py-2 rounded-md flex items-center"
      >
        Tools
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-sheesh ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/" className="block px-4 py-2 text-sm text-white hover:bg-gray-700" role="menuitem">All tools</a>
            <a href="/meta" className="block px-4 py-2 text-sm text-white hover:bg-gray-700" role="menuitem">Exif Tool</a>
            <a href="/t2i" className="block px-4 py-2 text-sm text-white hover:bg-gray-700" role="menuitem">Image Generation</a>
            <a href="/ocr" className="block px-4 py-2 text-sm text-white hover:bg-gray-700" role="menuitem">OCR Tool</a>
            <a href="/rm-bg" className="block px-4 py-2 text-sm text-white hover:bg-gray-700" role="menuitem">Remove background</a>
            {/* Add more menu items as needed */}
          </div>
        </div>
      )}
    </div>
        <Link href="https://www.linkedin.com/in/sahil-gulihar-130573249/">
          <Image
            src="https://i.imgur.com/rTmhUoK.png"
            alt="github"
            height={20}
            width={40}
            className="hidden md:block"
          />{" "}
        </Link>{" "}
        <Link href="https://github.com/sahil-gulihar">
          <img
            src="https://joshuapenalba.com/wp-content/uploads/2014/12/github-icon.png?w=640"
            alt="github"
            height={20}
            width={40}
          />{" "}
        </Link>{" "}
      </div>
      
    </div>
  );
};
export default Navbar;
