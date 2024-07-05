"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import Navbar from "../../components/navbar";

export default function ImageUploader() {
  const [imgSrc, setImgSrc] = useState("https://i.imgur.com/U7afLiO.png");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: any) => {
    setIsLoading(true);
    const file = await event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgur.com/3/image/", {
        method: "POST",
        headers: {
          Authorization: "Client-ID 6db47bd7029562d",
        },
        body: formData,
      });
      const data = await response.json();
      setImgSrc(data.data.link);
      setImgUrl(data.data.link);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchAlbum = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Client-ID 6db47bd7029562d");
      try {
        const response = await fetch("https://api.imgur.com/3/album/ryQCmre", {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        });
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchAlbum();
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-uff flex flex-col items-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-serif mb-8 pt-4 text-white">Enter Image and Get QR</h1>
        <label className="block mb-6">
          <span className="sr-only">Choose file</span>
          <input 
            type="file" 
            onChange={handleFileChange}
            className="block w-full text-sm text-sheesh
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-sheesh file:text-white
              hover:file:bg-uff
              disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </label>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sheesh"></div>
          </div>
        ) : imgUrl && (
          <div className="mt-8 p-6 border-2 border-sheesh rounded-lg bg-sheesh shadow-xl">
            <h3 className="text-xl font-serif mb-4 text-white">QR Code for Image URL:</h3>
            <div className="flex justify-center">
              <QRCode value={imgUrl} size={256} />
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}