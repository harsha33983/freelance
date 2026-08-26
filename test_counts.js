async function run() {
  const news = await fetch('http://localhost:3000/api/news').then(r=>r.json());
  console.log('News length:', news.length);
  const press = await fetch('http://localhost:3000/api/press-kit').then(r=>r.json());
  console.log('Press kit length:', press.length);
}
run();
