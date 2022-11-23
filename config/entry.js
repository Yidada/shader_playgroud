const path = require('path');
const r = p => path.resolve(process.cwd(), p);

const fs = require('fs');

const entries = {};

const dirs = fs.readdirSync(r('examples/')).filter(i => {
  return [
    "common",
    ".DS_Store",
    "typings"
  ].indexOf(i) === -1
});

const medium2underline = dir_name => dir_name.replace('-', '_');

dirs.forEach(dir => {
  Object.assign(entries, {
    [medium2underline(dir)]: r(`examples/${dir}/index.tsx`),
  });
});

module.exports = entries;
