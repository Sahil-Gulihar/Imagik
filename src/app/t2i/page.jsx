"use client";
import { useState } from "react";
import Navbar from "../../components/navbar";

export default function Text2Image() {
  const [inputText, setInputText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false); 

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await fetch(
        `https://text2image.sahilgullihar-cloudflare.workers.dev/?id=${inputText}`
      );
      const imageData = await res.blob();
      const newImageURL = URL.createObjectURL(imageData);
      setImageURL(newImageURL);
    } catch (error) {
      console.error("Error fetching image:", error);
    } finally {
      setLoading(false); 
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <>
      <Navbar />
      <div className="bg-uff min-h-screen flex flex-col items-center p-8">

        <div className="text-white font-serif sm:text-2xl md:text-4xl md:p-12 p-4">Text to Image AI</div>
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-md mb-8"
        >
          <div className="flex items-center border-b-2 border-sheesh py-2">
            <input
              className="appearance-none bg-transparent text-white border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text here"
            />
            <button 
              className="flex-shrink-0 bg-sheesh hover:bg-uff border-sheesh hover:border-uff text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
        {imageURL && (
          <div className="w-full max-w-md">
            {loading ? (
              <p className="text-white">Loading image...</p>
            ) : (
              <img 
                src={imageURL} 
                className="w-full h-80 object-cover rounded-lg shadow-lg" 
                alt="Generated Image" 
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
