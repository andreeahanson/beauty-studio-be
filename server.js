const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3001, () => {
  console.log('The HTTP server is listening at Port 3001');
});

server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Hello World');
  response.end();
})