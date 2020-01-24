const http = require('http');
const url = require('url');
const server = http.createServer();
//--------------------------------------//
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3001);


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
//========================================//

server.listen(3001, () => {
  console.log('The HTTP server is listening at Port 3001');
});

server.on('request', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.write('Beauty Studio Back-End');
  response.end();
})

//----------------------------------------------------------//
app.get('/api/v1/beauty_products', (request, response) => {
  database('beauty_products').select()
    .then((beauty_products) => {
      response.status(200).json(beauty_products);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});
//=========================================================//