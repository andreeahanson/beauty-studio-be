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
};
