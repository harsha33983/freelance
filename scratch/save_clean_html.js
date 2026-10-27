const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'app', 'team members');

function getCleanContent(filename) {
  const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
  return raw.replace(/data:image\/[^"]+/g, '[IMAGE]');
}

const files = [
  { key: 'sasidhar', file: 'godawarthy_sasidhar_team_profile.html' },
  { key: 'susheel', file: 'daitha_susheel_kumar_team_profile.html' },
  { key: 'shravani', file: 'vemuri_shravani_team_profile.html' },
  { key: 'krishna', file: 'pyreddy_krishna_reddy_team_profile.html' },
  { key: 'anand', file: 'malladi_anand_team_profile.html' },
  { key: 'surya', file: 'k_satya_prasad_team_profile.html' },
];

files.forEach(({ key, file }) => {
  const content = getCleanContent(file);
  fs.writeFileSync(path.join(__dirname, `parsed_${key}.html`), content);
  console.log(`Saved parsed_${key}.html (length: ${content.length})`);
});
