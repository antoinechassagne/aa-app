exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.uuid("id").primary();
    table.date("creationDate").notNullable();
    table.date("updateDate");
    table.date("plannedDate").notNullable();
    table.integer("creatorId").references("id").inTable("users").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.string("boardGameName").notNullable();
    table.string("description").notNullable();
    table.integer("missingPlayers").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("games");
};
