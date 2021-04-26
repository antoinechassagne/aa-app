exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.uuid("id").primary();
    table.date("creationDate").notNullable();
    table.date("updateDate");
    table.integer("creatorId").references("id").inTable("users").notNull();
    table.decimal("latitude").notNull();
    table.decimal("longitude").notNull();
    table.string("boardGameName").notNull();
    table.string("description").notNull();
    table.integer("missingPlayers").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("games");
};
