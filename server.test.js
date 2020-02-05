const request = require('supertest');
const app = require('./server');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// describe('API', () => {
//   beforeEach(async () => {
//     await database.seed.run();
//   })
// });

describe('GET / beauty_products', () => {
  describe('happy path', () => {
    it('should return a status code of 200', async () => {
      const res = await request(app).get('/api/v1/beauty_products');
      expect(res.status).toBe(200);
    });

    it('should return all beauty products in the database', async () => {
      const expectedProducts = await database('beauty_products').select();
      const cleanedExpectedProducts = expectedProducts.map(prod => {
        return { name: prod.name, id: prod.id }
      })
      const result = await request(app).get('/api/v1/beauty_products');
      const beautyProducts = result.body;
      const cleanedBeautyProducts = beautyProducts.map(prod => {
        return { name: prod.name, id: prod.id }
      })
      expect(cleanedBeautyProducts).toEqual(cleanedExpectedProducts);
    });

    it('should return a beauty_product with a query name', async () => {
      const expectedProductName = "Blush";
      const res = await request(app).get('/api/v1/beauty_products/?name=Blush');
      const productName = res.body[0].name;

      expect(productName).toEqual(expectedProductName);
    })
  });


})