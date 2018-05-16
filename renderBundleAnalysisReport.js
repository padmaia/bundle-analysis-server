const React = require('react');
const { renderToString } = require('react-dom/server');
// TODO: use atlaskit table?
const ReactTable = require('react-table').default;
const fs = require('fs');
const prettyBytes = require('pretty-bytes');

function BundleAnalysisReport({ results }) {
  let data = results.map(result => ({
    name: result.entry.name,
    outputBytes: result.sizes.outputBytes ? prettyBytes(result.sizes.outputBytes) : 'err',
    outputBytesGz: result.sizes.outputBytesGz ? prettyBytes(result.sizes.outputBytesGz) : 'err',
  }));
  
  let columns = [{
    Header: 'Name',
    accessor: 'name',
  }, {
    Header: 'min',
    accessor: 'outputBytes',
  }, {
    Header: 'min+gz',
    accessor: 'outputBytesGz',
  }];

  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/purecss@1.0.0/build/pure-min.css"
          integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w"
          crossOrigin="anonymous"
          />
      </head>
      <body>
        <div id="report">
          <table className="pure-table pure-table-bordered">
             <thead> 
              <tr>
                <th>Name</th>
                <th>min</th>
                <th>min+gz</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.entry.name}>
                  <td>{result.entry.name}</td>
                  <td>{result.sizes.outputBytes ? prettyBytes(result.sizes.outputBytes) : 'err'}</td>
                  <td>{result.sizes.outputBytesGz ? prettyBytes(result.sizes.outputBytesGz) : 'err'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
}

function renderBundleAnalysisReport(req, res) {
  let { id } = req.params;
  let results = JSON.parse(fs.readFileSync(`.data/${id}.json`, 'utf8'));
  let html = renderToString(<BundleAnalysisReport results={results} />);
  res.send(html);
}

module.exports = renderBundleAnalysisReport;
