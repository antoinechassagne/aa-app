exports.up = function (knex) {
  return knex.schema.createTable("gameCategories", (table) => {
    table.increments("id").primary();
    table.timestamp("creationDate").notNullable();
    table.timestamp("updateDate");
    table.string("label").notNullable();
    table.string("imageName").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("gameCategories");
};
