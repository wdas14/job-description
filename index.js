require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const port = 5000;

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
const checkGrammar = (req, res) => {
  const { text } = req.body;
  let host = 'api.cognitive.microsoft.com';
  let path = '/bing/v7.0/spellcheck';
  let key = process.env.GRAMMAR_KEY;
  let mkt = 'en-US';
  let mode = 'proof';
  let query_string = '?mkt=' + mkt + '&mode=' + mode;
  let request_params = {
    method: 'POST',
    hostname: host,
    path: path + query_string,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': text.length + 5,
      'Ocp-Apim-Subscription-Key': key
    }
  };
  let response_handler = function(response) {
    let body = '';
    response.on('data', function(d) {
      body += d;
    });
    response.on('end', function() {
      let body_ = JSON.parse(body);
      const transformBody = list =>
        list.reduce((acc, curr) => {
          acc[curr.token] = curr.suggestions.reduce(
            (_acc, _curr) => [..._acc, _curr.suggestion],
            []
          );
          return acc;
        }, {});
      const result = transformBody(body_.flaggedTokens);
      res.status(200).json({ ...result });
    });
    response.on('error', function(e) {
      console.log('Error: ' + e.message);
    });
  };
  let request = https.request(request_params, response_handler);
  request.write('text=' + text);
  request.end();
};
app.post('/check-grammar', checkGrammar);
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${port}!`)
);
