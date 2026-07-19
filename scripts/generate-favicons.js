const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'favicon.svg');
const outputDir = path.join(__dirname, '..', 'public');

const sizes = [16, 32, 48, 96, 144, 180, 192, 512];

async function generate() {
  const img = await loadImage(input);
  const imgAspect = img.width / img.height;

  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    const padding = size * 0.08;
    const avail = size - padding * 2;
    let drawW, drawH;

    if (imgAspect >= 1) {
      drawW = avail;
      drawH = avail / imgAspect;
    } else {
      drawH = avail;
      drawW = avail * imgAspect;
    }

    const x = (size - drawW) / 2;
    const y = (size - drawH) / 2;

    ctx.drawImage(img, x, y, drawW, drawH);

    const out = path.join(outputDir, `icon-${size}x${size}.png`);
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(out, buf);
    console.log(`Generated ${out} (${buf.length} bytes)`);
  }

  // Standard favicon / touch icon copies
  fs.copyFileSync(path.join(outputDir, 'icon-16x16.png'), path.join(outputDir, 'favicon-16x16.png'));
  fs.copyFileSync(path.join(outputDir, 'icon-32x32.png'), path.join(outputDir, 'favicon-32x32.png'));
  fs.copyFileSync(path.join(outputDir, 'icon-180x180.png'), path.join(outputDir, 'apple-touch-icon.png'));

  // Multi-resolution .ico using 32px PNG
  function buildIco(pngBuffer) {
    const dir = Buffer.alloc(6);
    dir.writeUInt16LE(0, 0); // Reserved
    dir.writeUInt16LE(1, 2); // Type: icon
    dir.writeUInt16LE(1, 4); // Count

    const entry = Buffer.alloc(16);
    entry.writeUInt8(32, 0); // Width
    entry.writeUInt8(32, 1); // Height
    entry.writeUInt8(0, 2); // Colors
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Planes
    entry.writeUInt16LE(32, 6); // Bit count
    entry.writeUInt32LE(pngBuffer.length, 8); // Size
    entry.writeUInt32LE(22, 12); // Offset

    return Buffer.concat([dir, entry, pngBuffer]);
  }

  const png32 = fs.readFileSync(path.join(outputDir, 'icon-32x32.png'));
  fs.writeFileSync(path.join(outputDir, 'favicon.ico'), buildIco(png32));
  console.log('Generated favicon.ico');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
