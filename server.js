const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);
app.locals.title = "Beauty Products & Notes";
app.set("port", process.env.PORT || 3001);

//========================================//

app.listen(3001, () => {
  console.log("The HTTP server is listening at Port 3001");
});

app.get("/", (request, response) => {
  response.send("Beauty Products & Notes");
});

app.get("/api/v1/beauty_products", (request, response) => {
  database("beauty_products")
    .select()
    .then(beauty_products => {
      response.status(200).json(beauty_products);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/beauty_products", (request, response) => {
  const product = request.body;

  for (let requiredParameter of ["name", "brand"]) {
    if (!product[requiredParameter]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { name: <String>, author: <String> }. You're missing a ${requiredParameter} property.`
        });
    }
  }

  database('beauty_products').insert(product, 'id')
    .then(product => {
      response.status(201).json({ id: product[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});
