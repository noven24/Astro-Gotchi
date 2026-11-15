const fs = require('fs');
const spec = JSON.parse(fs.readFileSync('donki_api-1.json', 'utf8'));

const endpoints = ['/get/FLR', '/get/CME', '/get/SEP', '/get/GST', '/get/HSS', '/get/IPS'];
endpoints.forEach(ep => {
  const ex = spec.paths[ep].get.responses['200'].content['application/json'].example;
  console.log(`\n=== Endpoint: ${ep} ===`);
  console.log(JSON.stringify(ex, null, 2));
});

