const fs = require('fs');
let text = fs.readFileSync('app/qr/[id]/page.tsx', 'utf8');
// Remove template literal contents roughly
let inTemplate = false;
let cleaned = '';
for (let i = 0; i < text.length; i++) {
  if (text[i] === '`' && (i === 0 || text[i-1] !== '\\')) {
    inTemplate = !inTemplate;
    cleaned += '`';
    continue;
  }
  if (inTemplate) {
    cleaned += ' ';
  } else {
    cleaned += text[i];
  }
}
const lines = cleaned.split('\n');
let stack = [];
lines.forEach((line, idx) => {
  const open = [...line.matchAll(/<(div|motion\.div)([\s>\/])/g)];
  const close = [...line.matchAll(/<\/(div|motion\.div)>/g)];
  if (open.length) {
    open.forEach(() => stack.push(`L${idx+1}: ${line.trim().slice(0,50)}`));
  }
  if (close.length) {
    close.forEach(() => {
      if (stack.length === 0) {
        console.log(`line ${idx+1}: EXTRA CLOSING ${line.trim().slice(0,60)}`);
      } else {
        stack.pop();
      }
    });
  }
});
console.log('remaining opens:', stack.length);
stack.slice(0,5).forEach(s=>console.log(s));
