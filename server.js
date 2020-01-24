const http = require('http');
const url = require('url');
const server = http.createServer();
//
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3001);
//

server.listen(3001, () => {
  console.log('The HTTP server is listening at Port 3001');
});

server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Beauty Studio Back-End');
  response.end();
})