const express = require('express');
const bodyParser = require('body-parser');

const returnBundleAnalysisJson = require('./returnBundleAnalysisJson');
const persistBundleAnalysisJson = require('./persistBundleAnalysisJson');
const renderBundleAnalysisReport = require('./renderBundleAnalysisReport');

let app = express();
app.use(bodyParser.json());

app.get('/bundle-analysis/:id', returnBundleAnalysisJson)
app.post('/bundle-analysis', persistBundleAnalysisJson);
app.get('/bundle-analysis-report/:id', renderBundleAnalysisReport);

let port = process.env.PORT || '3000';
app.listen(port, () => {
  console.log(`Bundle analysis server running on port ${port}`);
});

