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

app.listen(app.get("port"), () => {
  console.log(`Beauty Studio BE is running on http://localhost:${app.get("port")}.`);
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

app.get("/api/v1/notes", (request, response) => {
  database("notes")
    .select()
    .then(notes => {
      response.status(200).json(notes);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/beauty_products/:id", (request, response) => {
  database("beauty_products")
    .where("id", request.params.id)
    .select()
    .then(beauty_products => {
      if (beauty_products.length) {
        response.status(200).json(beauty_products);
      } else {
        response.status(404).json({
          error: `Could not find beauty product with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/beauty_products/:id/notes", async (request, response) => {
  try {
    const id = request.params.id;
    const validProduct = await database("beauty_products").where("id", id);
    if (validProduct.length) {
      const notes = await database("notes")
        .where("beauty_product_id", id)
        .select();
      response.status(200).json(notes);
    } else {
      response
        .status(404)
        .json(`The beauty product with the id of ${id} doesn't exist`);
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.post("/api/v1/beauty_products", (request, response) => {
  const product = request.body;

  for (let requiredParameter of ["name", "brand"]) {
    if (!product[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <String>, author: <String> }. You're missing a ${requiredParameter} property.`
      });
    }
  }

  database("beauty_products")
    .insert(product, "id")
    .then(product => {
      response.status(201).json({ id: product[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post("/api/v1/beauty_products/:id/notes", (request, response) => {
  const note = request.body;

  for (let requiredParameter of ["note", "beauty_product_id"]) {
    if (!note[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { note: <String>, beauty_product_id: <Number> }. You are missing the ${requiredParameter} property.`
      });
    }
  }

  database("notes")
    .insert(note, "id")
    .then(note => {
      response.status(201).json({ id: note[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete("/api/v1/notes/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const note = await database("notes")
      .where("id", id)
      .select();
    if (note.length) {
      await database("notes")
        .select()
        .where("id", id)
        .del();
      response.sendStatus(204).json({
        success: `You have successfully deleted beauty product with the id of ${id}`
      });
    } else {
      response.status(404).json({
        error: `Could not find note with the id of ${id}.`
      });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.patch("/api/v1/notes/:id", async (request, response) => {
  const id = request.params.id;
  const note = request.body.note;
  try {
    const notes = await database("notes")
      .select()
      .where("id", id);
    if (notes.length) {
      await database("notes")
        .select()
        .where("id", id)
        .update({ note });
      response.status(200).json({ id, note });
    } else {
      response.status(404).json({
        error: `Could not find a note with id of ${id}`
      });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

module.exports = app;