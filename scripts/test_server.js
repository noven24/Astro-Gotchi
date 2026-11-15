const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.jsx': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(__dirname, '..', reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('404');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(3333, async () => {
  console.log('Test server listening on port 3333');

  function checkUrl(urlPath) {
    return new Promise((resolve, reject) => {
      http.get(`http://localhost:3333${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`URL: ${urlPath} -> Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}, Length: ${data.length} bytes`);
          resolve(res.statusCode);
        });
      }).on('error', reject);
    });
  }

  try {
    const s1 = await checkUrl('/');
    const s2 = await checkUrl('/app.jsx');
    const s3 = await checkUrl('/donki_api-1.json');
    if (s1 === 200 && s2 === 200 && s3 === 200) {
      console.log('ALL TESTS PASSED! Server and files are perfectly accessible.');
    } else {
      console.error('Some requests failed!');
    }
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    server.close(() => {
      console.log('Test server shut down successfully.');
      process.exit(0);
    });
  }
});

