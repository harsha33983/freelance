async function run() {
  const adminNews = await fetch('http://localhost:3000/api/admin/news').then(r=>r.json());
  console.log('Admin news:', adminNews);
}
run();
