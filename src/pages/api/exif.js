import { exiftool } from 'exiftool-vendored';
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);

    if (!files.file || !files.file[0]) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = files.file[0];
    console.log('File received:', file.filepath);

    const metadata = await exiftool.read(file.filepath);
    console.log('Metadata read successfully');

    await fs.unlink(file.filepath);
    console.log('Temporary file deleted');

    res.status(200).json(metadata);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
}