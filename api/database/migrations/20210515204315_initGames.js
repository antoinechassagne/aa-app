exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.uuid("id").primary();
    table.timestamp("creationDate").notNullable();
    table.timestamp("updateDate");
    table.timestamp("plannedDate").notNullable();
    table.integer("creatorId").references("id").inTable("users").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.string("location").notNullable();
    table.string("boardGameName").notNullable();
    table.integer("categoryId").references("id").inTable("gameCategories").notNullable();
    table.string("description").notNullable();
    table.integer("missingPlayers").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("games");
};
