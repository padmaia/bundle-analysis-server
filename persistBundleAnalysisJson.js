const fs = require('fs');

function persistBundleAnalysis(req, res) {
  let id = Date.now();
  fs.writeFileSync(`.data/${id}.json`, JSON.stringify(req.body), 'utf8');
  res.send({ id })
}

module.exports = persistBundleAnalysis;
