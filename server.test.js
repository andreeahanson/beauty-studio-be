const request = require('supertest');
const app = require('./server');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('API', () => {
  beforeEach(async() => {
    await database.seed.run();
  })
});

describe('GET / beauty_products', () => {
  describe('happy path', () => {
    it('should return a status code of 200', () => {

    })
  })
})