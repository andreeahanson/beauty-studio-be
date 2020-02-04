// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/beauty_products',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/swatchr_test",
    migrations: {
      directory: "./migrations"
    },
    useNullAsDefault: true
  },
};
