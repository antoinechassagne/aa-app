exports.up = function (knex) {
  return knex.schema.createTable("participations", (table) => {
    table.uuid("id").primary();
    table.date("creationDate").notNullable();
    table.date("updateDate");
    table.integer("statusId").notNull();
    table.integer("userId").references("id").inTable("users").notNull();
    table.uuid("gameId").references("id").inTable("games").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("participations");
};
