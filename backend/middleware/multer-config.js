const multer = require('multer');
const Sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Mimetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Temporary storage (before processing)
const storage = multer.memoryStorage(); // Store in memory for processing

const upload = multer({ storage: storage }).single('image');

// Image processing middleware
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const extension = 'webp'; // Convert to WebP
  const outputFilename = `${req.file.originalname.split(' ').join('_')}_${Date.now()}.${extension}`;
  const outputPath = path.join('images', outputFilename); // Output path

  try {
    // Resize and convert image using Sharp
    await Sharp(req.file.buffer) // Using in-memory buffer
      .resize({ width: 800 }) // Resize the image (800px width)
      .toFormat('webp') // Convert to WebP
      .toFile(outputPath); // Save to disk

    // Update the file object to reference the processed image
    req.file.filename = outputFilename;
    req.file.path = outputPath;

    next();
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
};

module.exports = { upload, processImage };