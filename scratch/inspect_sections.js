const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'app', 'team members');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const clean = content.replace(/data:image\/[^"]+/g, '[IMAGE]');
  
  console.log(`\n================== ${f} ==================`);
  
  // Extract all section headers
  const sections = [];
  const regex = /<section[^>]*>([\s\S]*?)<\/section>|<header[^>]*>([\s\S]*?)<\/header>/gi;
  let match;
  while ((match = regex.exec(clean)) !== null) {
    const secContent = match[1] || match[2];
    const h2 = (secContent.match(/<h2[^>]*>(.*?)<\/h2>/i) || [])[1] || '';
    const h3s = [...secContent.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
    sections.push({
      h2: h2.replace(/<[^>]+>/g, '').trim(),
      h3s: h3s.slice(0, 8)
    });
  }
  console.log(JSON.stringify(sections, null, 2));
});
