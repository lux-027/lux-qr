const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'luxqrlogo1.png');
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
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
