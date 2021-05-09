exports.up = function (knex) {
  return knex.schema.createTable("joinRequests", (table) => {
    table.uuid("id").primary();
    table.integer("userId").references("id").inTable("users").notNull();
    table.integer("gameId").references("id").inTable("games").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("joinRequests");
};
