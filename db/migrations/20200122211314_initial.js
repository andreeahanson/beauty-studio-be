
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('beauty_products', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('brand');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('notes', function(table) {
      table.increments('id').primary();
      table.string('note');
      table.integer('beauty_product_id').unsigned()
      table.foreign('beauty_product_id')
        .references('beauty_products.id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('notes'),
    knex.schema.dropTable('beauty_products')
  ]);
};
