'use client'
import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import ImageDropZone from '../../components/Slate';
import Navbar from '../../components/navbar';
const OCR = () => {
    const [ocrResult, setOcrResult] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleImageUpload = async (file) => {
        if (!file) return;

        setIsProcessing(true);

        const worker = await createWorker();
        
        try {
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(file);
            setOcrResult(text);
        } catch (error) {
            console.error('OCR Error:', error);
            setOcrResult('An error occurred during OCR processing.');
        } finally {
            await worker.terminate();
            setIsProcessing(false);
        }
    };

    return (
        <>
        <Navbar />
        <div className='bg-uff h-screen w-screen'>
        <div className="max-w-lg  mx-auto pt-8">
            <div className='text-white text-4xl pb-4 font-serif'>Image Text Extraction:</div>
            <ImageDropZone onImageUpload={handleImageUpload} />
            {isProcessing && <p className="pt-4 text-center">Processing image...</p>}
            {ocrResult && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-white mb-2">Result:</h2>
                    <pre className="bg-gray-600 p-4 rounded-lg whitespace-pre-wrap">{ocrResult}</pre>
                </div>
            )}
        </div>
        </div>
        
        </>
    );
};

export default OCR;