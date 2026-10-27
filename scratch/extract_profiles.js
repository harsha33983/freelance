const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'app', 'team members');
const outDir = path.join(__dirname, '..', 'public', 'images', 'team');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const profileData = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  
  // Extract image
  const imgMatch = content.match(/<img[^>]+src="(data:image\/([a-zA-Z0-9]+);base64,([^">]+))"/i);
  let imagePath = '';
  if (imgMatch) {
    const ext = imgMatch[2] === 'jpeg' ? 'jpg' : imgMatch[2];
    const baseName = f.replace('_team_profile.html', '');
    const imgFilename = `${baseName}.${ext}`;
    const imgBuffer = Buffer.from(imgMatch[3], 'base64');
    fs.writeFileSync(path.join(outDir, imgFilename), imgBuffer);
    imagePath = `/images/team/${imgFilename}`;
    console.log(`Saved image to ${imgFilename} (${(imgBuffer.length / 1024).toFixed(1)} KB)`);
  }

  // Remove base64 image from content for easier parsing
  const clean = content.replace(/data:image\/[^"]+/g, '[IMAGE]');
  
  const title = (clean.match(/<title>(.*?)<\/title>/i) || [])[1] || '';
  const h1 = ((clean.match(/<h1>(.*?)<\/h1>/is) || [])[1] || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim();
  const kicker = ((clean.match(/<div class="kicker[^"]*">(.*?)<\/div>/is) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  const badge = ((clean.match(/<div class="badge[^"]*">(.*?)<\/div>/is) || [])[1] || '').replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').trim();
  
  // Extract hero paragraph (short intro)
  const heroP = ((clean.match(/<header[^>]*>[\s\S]*?<p[^>]*>(.*?)<\/p>/is) || [])[1] || '').replace(/<[^>]+>/g, '').trim();
  
  profileData.push({
    file: f,
    name: h1,
    title,
    kicker,
    badge,
    heroP,
    imagePath
  });
});

fs.writeFileSync(path.join(__dirname, 'extracted_summary.json'), JSON.stringify(profileData, null, 2));
console.log('Summary saved to scratch/extracted_summary.json');
