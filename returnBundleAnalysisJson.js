const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);

async function returnBundleAnalysisJson(req, res) {
  let { id } = req.params;
  
  let filename;
  if (id === 'latest') {
    const files = await readdir('.data');
    files.sort();
    filename = files[files.length - 1];
  } else {
    filename = id + '.json';
  }

  let analysis = JSON.parse(fs.readFileSync(`.data/${filename}`, 'utf8'));

  res.send(analysis);
}

module.exports = returnBundleAnalysisJson;
