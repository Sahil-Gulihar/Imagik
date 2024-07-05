'use client'

import React, { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/navbar';

const AspectRatioCanvas = () => {
  const [image, setImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [customWidth, setCustomWidth] = useState(300);
  const [customHeight, setCustomHeight] = useState(300);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (image) {
      drawImage();
    }
  }, [image, aspectRatio, customWidth, customHeight]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const drawImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    switch (aspectRatio) {
      case '1:1':
        width = height = Math.min(image.width, image.height);
        break;
      case '9:16':
        width = image.width;
        height = (image.width * 16) / 9;
        break;
      case '16:9':
        width = image.width;
        height = (image.width * 9) / 16;
        break;
      case 'custom':
        width = customWidth;
        height = customHeight;
        break;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'canvas_image.png';
    link.click();
  };

  return (
    <>
    <Navbar />
    <div className="bg-uff min-h-screen flex flex-col items-center justify-center p-8 space-y-6">
      
      <div className='text-white font-serif text-4xl'>Select Image and Get the Ratio you want</div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sheesh file:text-white hover:file:bg-uff"
      />
      <select
        value={aspectRatio}
        onChange={(e) => setAspectRatio(e.target.value)}
        className="bg-sheesh text-white py-2 px-4 rounded-lg"
      >
        <option value="1:1">1:1</option>
        <option value="9:16">9:16</option>
        <option value="16:9">16:9</option>
        <option value="custom">Custom</option>
      </select>
      {aspectRatio === 'custom' && (
        <div className="flex space-x-4">
          <label className="flex flex-col">
            <span className="text-white mb-1">Width:</span>
            <input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(Number(e.target.value))}
              className="bg-sheesh text-white py-1 px-2 rounded"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white mb-1">Height:</span>
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(Number(e.target.value))}
              className="bg-sheesh text-white py-1 px-2 rounded"
            />
          </label>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="bg-sheesh rounded-lg shadow-lg" 
        style={{ border: '2px solid #ffffff' }} 
      />
      <button 
        onClick={handleDownload} 
        disabled={!image}
        className="bg-sheesh text-white py-2 px-6 rounded-full font-bold hover:bg-uff transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Download Image
      </button>
    </div>
    </>
  );
};

export default AspectRatioCanvas;