exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.uuid("id").primary();
    table.date("creationDate").notNullable();
    table.date("updateDate");
    table.integer("userId").references("id").inTable("users").notNullable();
    table.string("type").notNullable();
    table.boolean("read").notNullable();
    table.jsonb("content");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notifications");
};
