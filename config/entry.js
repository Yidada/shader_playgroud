const path = require('path');
const r = p => path.resolve(process.cwd(), p);

const fs = require('fs');

const entries = {};

const dirs = fs.readdirSync(r('examples/')).filter(i => {
  return [
    "common",
    ".DS_Store",
  ].indexOf(i) === -1
});

dirs.forEach(dir => {
  Object.assign(entries, {
    [dir]: r(`examples/${dir}/index.tsx`),
  });
});

module.exports = entries;
