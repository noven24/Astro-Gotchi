const fs = require('fs');
const spec = JSON.parse(fs.readFileSync('donki_api-1.json', 'utf8'));

console.log('--- DONKI API Endpoints & Examples ---');
for (const [path, methods] of Object.entries(spec.paths)) {
  const getOp = methods.get;
  if (!getOp) continue;
  const resp200 = getOp.responses && getOp.responses['200'];
  const appJson = resp200 && resp200.content && resp200.content['application/json'];
  if (appJson && appJson.example) {
    const ex = appJson.example;
    console.log('Path:', path, 'Example is Array:', Array.isArray(ex), 'Count:', Array.isArray(ex) ? ex.length : 1);
  }
}

