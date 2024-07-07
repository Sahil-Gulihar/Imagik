'use client'
import { useState } from 'react';
import {Inspector} from 'react-inspector';
import Navbar from '../../components/navbar';

export default function ExifToolFrontend() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      handleSubmit(selectedFile);
    }
  };

  const handleSubmit = async (file) => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setMetadata(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://exif-server-2.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      try {
        const data = JSON.parse(responseText);
        setMetadata(data);
      } catch (parseError) {
        throw new Error(`Failed to parse response: ${parseError.message}`);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="font-sans bg-uff pt-28 min-h-screen flex flex-col items-center justify-items-start">
  <h1 className="md:text-4xl text-2xl font-bold mb-8 text-white">ExifTool Metadata Viewer</h1>
  <div className="w-full max-w-2xl">
    <label className="block mb-6">
      <span className="sr-only">Choose file</span>
      <input 
        type="file" 
        onChange={handleFileChange} 
        disabled={loading}
        className="block w-full text-sm text-sheesh
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-sheesh file:text-white
          hover:file:bg-uff
          disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </label>
    {loading && (
      <p className="text-sheesh text-center animate-pulse">Loading...</p>
    )}
    {error && (
      <p className="text-red-500 bg-red-100 border border-red-400 rounded p-3 mb-4">
        {error}
      </p>
    )}
    {metadata && (
      <div className="mt-8 p-6 border-2 border-sheesh rounded-lg bg-uff shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Metadata:</h2>
        <div className="bg-sheesh rounded-lg p-4 overflow-auto max-h-100">
          <Inspector 
            data={metadata} 
            theme="chromeDark"
            expandLevel={2}
            className="text-sm"
          />
        </div>
      </div>
    )}
  </div>
</div>
</>
  );
  
}
