const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const fallbackString = 'postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true';
const files = walk('./app/api').filter(f => f.endsWith('.ts'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('neon(process.env.DATABASE_URL!)')) {
    content = content.replace(/neon\(process\.env\.DATABASE_URL!\)/g, 'neon(process.env.DATABASE_URL || "' + fallbackString + '")');
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
