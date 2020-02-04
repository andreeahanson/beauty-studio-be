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
    connection: "postgres://localhost/beauty_products",
    migrations: {
      directory: "./migrations"
    },
    useNullAsDefault: true
  },
  // production: {
  //   client: "pg",
  //   connection: process.env.DATABASE_URL + `?ssl=true`,
  //   migrations: {
  //     directory: "./migrations"
  //   },
  //   useNullAsDefault: true
  // },
  pool: {
    min: 0,
    max: 10
  },
  acquireConnectionTimeout: 20000
};
