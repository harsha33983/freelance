const fs = require('fs');
const file = 'C:\\Users\\Harsha\\Music\\bgvm2027\\app\\experience\\venue\\page.tsx';
let content = fs.readFileSync(file, 'utf8');

const targetBlock = `          {/* 4-quadrant visual */}
          <div className="mb-16 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-2 relative">
              {/* Central badge */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-28 h-28 rounded-full bg-gold border-4 border-white shadow-gold-lg flex flex-col items-center justify-center text-center">
                  <span className="text-ink font-serif text-xs font-bold leading-tight">Sri Krishna</span>
                  <span className="text-ink font-serif text-[9px] leading-tight">Bhagavad Gita</span>
                </div>
              </div>
              {entrances.map((e, i) => (
                <div key={e.name} className={\`\${e.color} border rounded-sm p-8 text-center\`}>
                  <h3 className={\`font-serif text-lg font-semibold \${e.accent} mb-1\`}>{e.name}</h3>
                  <p className="text-xs font-sans text-gray-500 tracking-wider uppercase">{e.subtitle}</p>
                </div>
              ))}
            </div>
          </div>`;

const replacement = `          {/* Venue Gates visual */}
          <div className="mb-16 max-w-5xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-amber-500/20 to-gold/20 blur-xl opacity-50 group-hover:opacity-75 transition duration-500 rounded-xl" />
            <div className="relative rounded-xl overflow-hidden border border-gold/20 shadow-2xl bg-black">
              <img 
                src="/venue-gates.jpg" 
                alt="Bhagavad Gita Vishwa Mahotsav - Four Entrances" 
                className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700" 
              />
            </div>
          </div>`;

if (content.includes(targetBlock)) {
    content = content.replace(targetBlock, replacement);
    fs.writeFileSync(file, content);
    console.log("Success");
} else {
    console.log("Could not find the target block to replace.");
}
