import formidable from 'formidable';
import { exiftool } from 'exiftool-vendored';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Formidable error:', err);
      return res.status(500).json({ message: 'Form parsing error', error: err.toString() });
    }

    if (!files.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = files.file;
    const filePath = Array.isArray(file) ? file[0].filepath : file.filepath;

    if (!filePath) {
      console.error('File path is undefined');
      return res.status(500).json({ message: 'File path is undefined' });
    }

    console.log('File received:', filePath);

    try {
      const metadata = await exiftool.read(filePath);
      console.log('Metadata read successfully');
      await fs.unlink(filePath);
      console.log('Temporary file deleted');
      res.status(200).json(metadata);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Server error', error: error.toString() });
    }
  });
}