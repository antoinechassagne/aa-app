exports.up = function (knex) {
  return knex.schema.createTable("participations", (table) => {
    table.uuid("id").primary();
    table.timestamp("creationDate").notNullable();
    table.timestamp("updateDate");
    table.integer("statusId").notNullable();
    table.integer("userId").references("id").inTable("users").notNullable();
    table.uuid("gameId").references("id").inTable("games").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("participations");
};
