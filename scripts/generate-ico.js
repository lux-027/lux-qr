const pngToIco = require('png-to-ico').default || require('png-to-ico');
const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'public', 'icon-16x16.png'),
  path.join(__dirname, '..', 'public', 'icon-32x32.png'),
  path.join(__dirname, '..', 'public', 'icon-48x48.png'),
];

const output = path.join(__dirname, '..', 'public', 'favicon.ico');

pngToIco(files)
  .then(buf => {
    fs.writeFileSync(output, buf);
    console.log(`Generated ${output} (${buf.length} bytes)`);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
