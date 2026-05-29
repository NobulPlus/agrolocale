const fs = require('fs');
const path = require('path');

// A simple utility to parse JPEG dimensions without external dependencies
function getJpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  let i = 0;
  if (buffer[i] !== 0xFF || buffer[i + 1] !== 0xD8) {
    throw new Error('Not a valid JPEG');
  }
  i += 2;
  while (i < buffer.length) {
    while (buffer[i] !== 0xFF) {
      i++;
      if (i >= buffer.length) return null;
    }
    while (buffer[i] === 0xFF) {
      i++;
    }
    const marker = buffer[i];
    i++;
    // SOF0 (Start of Frame 0) marker or SOF2
    if (marker === 0xC0 || marker === 0xC2) {
      i += 2; // skip length
      const precision = buffer[i];
      const height = (buffer[i + 1] << 8) + buffer[i + 2];
      const width = (buffer[i + 3] << 8) + buffer[i + 4];
      return { width, height };
    } else {
      const length = (buffer[i] << 8) + buffer[i + 1];
      i += length;
    }
  }
  return null;
}

try {
  console.log('cottages.jpeg:', getJpegDimensions(path.join(__dirname, 'public/products/cottages.jpeg')));
  console.log('elysian.jpeg:', getJpegDimensions(path.join(__dirname, 'public/products/elysian.jpeg')));
  console.log('aduke flyer 1:', getJpegDimensions(path.join(__dirname, 'public/images/aduke_flier/WhatsApp Image 2026-05-27 at 8.52.49 AM.jpeg')));
} catch (e) {
  console.error(e);
}
