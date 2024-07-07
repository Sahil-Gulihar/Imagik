'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../../components/navbar';

const ImageDropZone = ({ onImageUpload }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    handleFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const handleFile = (file) => {
    if (file) {
      onImageUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePaste = useCallback((event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        handleFile(file);
        break;
      }
    }
  }, [handleFile]);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [handlePaste]);

  return (
    <div 
      {...getRootProps()} 
      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer
                  ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" className="mx-auto max-h-48 mb-4" />
      ) : (
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )}
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, click to select, or paste from clipboard'}
      </p>
    </div>
  );
}

const BG = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading]=useState(false);
  async function bgRemove(file) {
    const image = new FormData();
    image.append("image", file);
    const url = "https://api-bgrm.hsingh.site/remove_background";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: image,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      imageGet(data.id);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function imageGet(data) {
    setLoading(true);
    const realShit = await fetch(
      "https://api-bgrm.hsingh.site/get_result?id=" + data
    );
    const ress = await realShit.json();
    if (ress[0].status != "completed") {
      setTimeout(function() {
        imageGet(data);
      }, 2000);
    } else {
      setResult(ress[0].image_url);
      setLoading(false);
      return;
    }
  }

  function ImageHandle(file) {
    if (file) {
      setImage(URL.createObjectURL(file));
      bgRemove(file);
    }
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-uff flex flex-col items-center pb-24 justify- p-4">
    
      <div className='text-white text-4xl pb-12 font-serif'>Drop your Image</div>
      <div className="w-full max-w-md">
        <ImageDropZone onImageUpload={ImageHandle} />
        {loading && (
          <div className='text-center text-gray-200 pt-4'>Loading Result...</div>
        )}
        {result && (
          <div className="mt-6 bg-gray-800 flex justify-center rounded-lg w-50 h-100 overflow-hidden shadow-xl">
            <img
              src={result}
              alt="Result Image"
              className="object-cover w-50 h-80"
            />
          </div>
        )}
      </div>
    
    </div>
    </>
  );
};

export default BG;