const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}
const files = walk('.');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Remove Global Parayana & Sankalpa
  content = content.replace(/\s*\{\s*label:\s*\"Global Parayana\",\s*href:\s*\"\/global-journey\/global-parayana\"\s*\},/g, '');
  content = content.replace(/\s*\{\s*label:\s*\"Global Sankalpa\",\s*href:\s*\"\/global-journey\/global-sankalpa\"\s*\},/g, '');

  const parayanaRegex = /\s*\"global-parayana\":\s*\{[\s\S]*?\},/;
  const sankalpaRegex = /\s*\"global-sankalpa\":\s*\{[\s\S]*?\},/;
  content = content.replace(parayanaRegex, '');
  content = content.replace(sankalpaRegex, '');

  content = content.replace(/\s*\{\s*title:\s*\"Vishwa Parayana\"[^\}]+\},/g, '');
  content = content.replace(/\s*\{\s*title:\s*\"Global Sankalpa\"[^\}]+\},/g, '');
  
  content = content.replace(/,\s*and a youth-led Global Sankalpa session/, '');
  content = content.replace(/,\s*a youth-led Global Sankalpa session/, '');
  content = content.replace(/\s*\"Register their participation in the Global Sankalpa \(collective vow\)\",/g, '');

  // 2. Change Country -> Countries
  content = content.replace(/\bNations\b/g, 'Countries');
  content = content.replace(/\bnations\b/g, 'countries');
  content = content.replace(/\bNation\b/g, 'Country');
  content = content.replace(/\bnation\b/g, 'country');

  // 3. Standalone Mahotsav replacements
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (/Gita Mahotsav|Mega Mahotsav|Mega Mahtsav|\bMahotsav\b/i.test(line)) {
      const stripped = line.replace(/<[^>]+>/g, '')
                           .replace(/[{}[\]():;,.\"\']/g, '')
                           .replace(/badge=|title=|label=|href=|name=|subtitle=/gi, '')
                           .replace(/className=[^\s]+/g, '')
                           .replace(/export const metadata = /g, '')
                           .trim()
                           .toLowerCase();
                           
      if (stripped === 'gita mahotsav' || 
          stripped === 'mega mahotsav' || 
          stripped === 'mega mahtsav' || 
          stripped === 'mahotsav' ||
          stripped === 'bhagavad gita vishwa mahotsav') {
          
          lines[i] = line.replace(/Gita Mahotsav|Mega Mahotsav|Mega Mahtsav|Bhagavad Gita Vishwa Mahotsav|\bMahotsav\b/i, 'Bhagavadgita Vishwa Mahotsav');
      }
    }
  }
  content = lines.join('\n');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
