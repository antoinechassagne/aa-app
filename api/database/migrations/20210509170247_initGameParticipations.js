exports.up = function (knex) {
  return knex.schema.createTable("gameParticipations", (table) => {
    table.uuid("id").primary();
    table.integer("userId").references("id").inTable("users").notNull();
    table.uuid("gameId").references("id").inTable("games").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("gameParticipations");
};
