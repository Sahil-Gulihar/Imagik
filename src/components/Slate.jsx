'use client'
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from 'react-dropzone';

export const ImageDropZone = ({ onImageUpload }) => {
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

  export default ImageDropZone